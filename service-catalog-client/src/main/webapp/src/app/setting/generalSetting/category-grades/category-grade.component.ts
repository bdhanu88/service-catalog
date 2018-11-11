import { Component, OnInit, Directive, ElementRef, ViewEncapsulation, ViewChild, Injectable } from '@angular/core';


import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { CategoryGradeService } from './category-grade.service';
import { MdDialog, MdDialogRef, MdButton, MdDialogModule } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ConfirmationDialog } from '../../../shared/Dialog/confirmation-dialog';
import {TreeComponent, TreeNode} from 'angular-tree-component'
import {CustomValidationService} from "../../../shared/common/validation/custom-validation.service";
declare var $:any;
declare var InitJsTree: any;

@Injectable()
@Component({
    selector: 'category-cmp',
    moduleId: module.id,
    templateUrl: 'category-grade.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        '../../../../assets/css/jsTree/default/style.min.css',
        '../../../../assets/css/jsTree/default-dark/style.min.css'
    ]
})

export class CategoryComponent implements OnInit {

   public categoryArray:any
   location: Location;
   selectedOption: string;
   isCategorySelected :boolean = false;
   selectedId :number = 0;
   parentId : number = 0;
   isLeaf:boolean = false;
   categories: any[] = [];
   options = {
        allowDrag: true,
        allowDrop: (element, { parent, index })=> {
    // return true / false based on element, to.parent, to.index. e.g.
           if(element.parent.id == parent.id){
                return true;
           }else{
               return false;
           }
        },
        nodeClass: (node:TreeNode) => {

            if(node.data.icon){
                return 'tree-' + node.data.icon;
            }

    return 'tree-node-default';
  }
   };
   nodes = [{
            name: '',
            children: [
            ]
        }];

    @ViewChild(TreeComponent)
    private tree: TreeComponent;


    constructor(location: Location, private el: ElementRef, private categoryGradeService:CategoryGradeService,
                       public dialog: MdDialog,private customValid:CustomValidationService) {
        this.location = location;
    }
    addCategory(){
        this.openCategoryDialogDialog("add", null);
    }

    editCategory(){
        this.categoryGradeService.getCategoryFromId(this.selectedId).subscribe(
            data => {
                        if(data.success){
                            this.openCategoryDialogDialog("edit", data.category);
                        }
                    }
        );
    }
    removeCategory(){
        let dialogRef = this.dialog.open(ConfirmationDialog);
        dialogRef.disableClose = true;
        if(!this.isLeaf){
            dialogRef.componentInstance.title ="Remove Category";
             dialogRef.componentInstance.message = "Cannot remove a parent category please remove grades first";
        }else{
            dialogRef.componentInstance.title ="Remove Category";
            dialogRef.componentInstance.message = "Are you sure you want to remove category?";
        dialogRef.afterClosed().subscribe(result=>{
            if(result == true){
                this.categoryGradeService.removeCategory(this.selectedId).subscribe(
                    data => {
                                if(data.success){
                                    this.nodes = data.categoryTree;
                                    this.selectedId = -1;
                                }
                            }
                );
            }
        });
        }

    }
    openCategoryDialogDialog(action:string, category):void {
         let dialogRef = this.dialog.open(DialogResultExampleDialog);
         dialogRef.disableClose = true;
         this.setCategoryActionButtonAndHeader(dialogRef, action);
         if(category != null){
            dialogRef.componentInstance.setDialogDetails(category);
         }
         dialogRef.afterClosed().subscribe(result => {
            if(result){

                    let category = {};
                    var comapny :Company = {
                      id : 1,
                      name:'sdsdsd'
                    }
                    result['company'] = comapny;

                    this.categoryGradeService.addCategory(result).subscribe(
                        data => {
                                    if(data.success){
                                        this.nodes = data.categoryTree;
                                        this.categories = data.categories;
                                    }
                                }
                      );
            }
         });
    }
    setCategoryActionButtonAndHeader(dialogRef:MdDialogRef<DialogResultExampleDialog>, action:string):void{
        if(action == "add"){
            dialogRef.componentInstance.setTitle("Add Category");
            dialogRef.componentInstance.setActionButtonString("Add");
            dialogRef.componentInstance.setIsEdit(false);
        }else if(action == "edit"){
            dialogRef.componentInstance.setTitle("Edit Category");
            dialogRef.componentInstance.setActionButtonString("Edit");
            dialogRef.componentInstance.setIsEdit(true);
        }else{
            dialogRef.componentInstance.setTitle("Remove Category");
            dialogRef.componentInstance.setActionButtonString("Remove");
        }
    }

    /////// functions related to grade /////

    addGrade(){
      this.openGradeDialog("add", null, this.categories);
    }
    //TODO put this to ngOnInit
    editGrade(){
         this.categoryGradeService.getGradeFromId(this.selectedId).subscribe(
            data => {
                        if(data.success){
                            this.openGradeDialog("edit", data.grade, this.categories);
                        }
                    }
        );
    }

     removeGrade(){
        let dialogRef = this.dialog.open(ConfirmationDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.title ="Remove Grade";
        dialogRef.componentInstance.message = "Are you sure you want to remove Grade";
        dialogRef.afterClosed().subscribe(result=>{
            if(result == true){
                this.categoryGradeService.removeGrade(this.selectedId).subscribe(
                    data => {
                                if(data.success){
                                    this.nodes = data.categoryTree;
                                    this.selectedId = -1;
                                    let  parentNode = this.tree.treeModel.getNodeById(this.parentId);
                                    let children:any[] = parentNode.children;
                                    /// colapse if deleted node is the last child
                                    if(children.length == 1){
                                         parentNode.collapse();
                                    }
                                }
                            }
                );
            }
        });
    }
    getCategories(){
        this.categoryGradeService.getCategories().subscribe(
            data => {
                        if(data.success){
                            this.categories = data.categories;
                        }
                    }
        );
    }
     openGradeDialog(action:string, grade, categories):void {
         let dialogRef = this.dialog.open(GradeDialog);
         dialogRef.disableClose = true;
         this.setGradeActionButtonAndHeader(dialogRef, action);
         if(grade != null){
            dialogRef.componentInstance.setDialogDetails(grade);
             dialogRef.componentInstance.setCategoryId(this.parentId);
         }else{
              dialogRef.componentInstance.setCategoryId(this.selectedId);
         }

         dialogRef.componentInstance.setCategories(categories);

         dialogRef.afterClosed().subscribe(result => {
            if(result){

                  var comapny :Company = {
                      id : 1,
                      name:'sdsdsd'
                  }

                   var cat:Category = {
                       id: result.category,
                       name: '',
                       abbreviation: '',
                       orderId:0,
                       company:comapny,
                   };
                   cat.id =  result.category;
                   result.category = cat;
                    this.categoryGradeService.addGrade(result).subscribe(
                        data => {
                                    if(data.success){
                                        this.nodes = data.categoryTree;
                                    }
                                }
                      );
            }
         });
    }

     setGradeActionButtonAndHeader(dialogRef:MdDialogRef<GradeDialog>, action:string):void{
        if(action == "add"){
            dialogRef.componentInstance.setTitle("Add Grade");
            dialogRef.componentInstance.setActionButtonString("Add");
            dialogRef.componentInstance.setIsEdit(false);
        }else if(action == "edit"){
            dialogRef.componentInstance.setTitle("Edit Grade");
            dialogRef.componentInstance.setActionButtonString("Edit");
            dialogRef.componentInstance.setIsEdit(true);
        }else{
            dialogRef.componentInstance.setTitle("Remove Grade");
            dialogRef.componentInstance.setActionButtonString("Remove");
        }
    }

    ngOnInit() {

      // $.getScript('/assets/js/custom/category-grade/category-grade.js');
       //$('.tree').jstree();

      var companyId=1;
       this.categoryArray = this.categoryGradeService.getCategoryGradeArray(companyId).subscribe(
         data => this.createTree(data)
       );
       this.getCategories();
      // this.createTree();

    }// load script file here with base href

    createTree(data): void {

      // InitJsTree(data);
       this.nodes = data;
    }

    /*
    * Category Grade tree click event
    **/
    treeclickEvent(event) {
        //debugger;
        this.selectedId = event.node.id;
        this.parentId = event.node.parent.id;
        this.isLeaf = event.node.isLeaf;
        if (this.parentId == 0) {
            var r = event.node.data.id;
            this.isCategorySelected = true;
        }else{

            this.isCategorySelected = false;
        }
    }

    moveNode($event) {
        let orgNodes = this.tree.treeModel.nodes;
        let categoryArray:number[] = [];
        let gradeArray:number[] = [];
        for(let orgNode of orgNodes){
            let categoryNodes = orgNode.children;
            for(let catNode of categoryNodes){
                categoryArray.push(catNode.id);
                let gradeNodes = catNode.children;
                if(gradeNodes != null){
                    for(let grdNode of gradeNodes ){
                        gradeArray.push(grdNode.id);
                    }
                }
            }
        }

        this.categoryGradeService.orderCategoryAndGrades(gradeArray, categoryArray).subscribe(
                data => {}
        );

    }
}

@Component({
  selector: 'category-cmp',
  templateUrl: 'category-grade-dialog.html',
  providers:[CategoryComponent]
})

export class DialogResultExampleDialog implements OnInit{
  public category:Category;
  public categoryGradeService:CategoryGradeService;

  public categoryForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  private selectedId:number;
  private categoryName:string;
  private abbreviation:string;
  private title:string;
  private actionButton:string = "Add Category";
  private isEdit:boolean = false;
  private orderId:number;
  public companyId : number = 1;


  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>, categoryGradeService:CategoryGradeService,
              private _fb: FormBuilder) {
      this.categoryGradeService = categoryGradeService;
  }

   ngOnInit() {
       this.categoryForm = this._fb.group({
            id: [this.selectedId],
            name: [this.categoryName, [<any>Validators.required], this.categoryValidator.bind(this)],
            abbreviation: [this.abbreviation, [], this.abbreviationValidator.bind(this)],
            orderId:[this.orderId],
            companyId:[this.companyId],
        });
   }
   public setActionButtonString(actionButtionValue:string){
      this.actionButton = actionButtionValue;
   }

   public setTitle(title:string){
        this.title = title;
   }

   public setIsEdit(isEdit:boolean){
       this.isEdit = isEdit;
   }
   public setDialogDetails(category){
        this.selectedId =  category.id;
        this.categoryName = category.name;
        this.abbreviation = category.abbreviation;
        this.orderId = category.orderId;
        this.companyId=category.company.id;
   }

   categorySave(model: Category, isValid: boolean) {
        // check if model is valid
        // if valid, call API to save customer
        if(isValid){

        }
    }

    categoryAddSuccess(data):void{


    }

    abbreviationValidator(control:FormControl):{[key:string]: any}{
         return new Observable(observer => {
             this.categoryGradeService.checkAbbreviationExistence(control.value, true, this.selectedId, this.isEdit).subscribe(
                     data => {
                                if(data.success){
                                    observer.next({abbreviationAvailable:true});
                                }else{
                                    observer.next(null);
                                }
                                observer.complete();
                             },
                 );
         });
    }
    categoryValidator(control: FormControl):{[key: string]: any} {
        return this.categoryValidator2(control.value).first();
    }
    categoryValidator2(value :string):{[key: string]: any}{

     /*    return new Promise((resolve, reject) => {
                 this.categoryGradeService.checkCategoryExistence(value).subscribe(

                     data => resolve({uniqueCategory:true}),
                     error => resolve({uniqueCategory:true})
                 );
         }) */

          return new Observable(observer => {
             this.categoryGradeService.checkCategoryExistence(value, this.selectedId, this.isEdit,this.companyId).subscribe(
                     data => {
                                if(data.success){
                                    observer.next({categoryAvailable:true});
                                }else{
                                    observer.next(null);
                                }
                             },
                 );
         });
    }

}

@Component({
  selector: 'category-cmp',
  templateUrl: 'grade-dialog.html',
  providers:[CategoryComponent]
})

export class GradeDialog implements OnInit{

  public categoryGradeService:CategoryGradeService;

  public gradeForm: FormGroup; // our model driven form
  public events: any[] = []; // use later to display form changes
  private selectedId:number;
  private categoryId:number;
  private gradeName:string;
  private abbreviation:string;
  private title:string;
  private actionButton:string = "Add Grade";
  private isEdit:boolean = false;
  private orderId:number;
  private categories : any[];



  constructor(public dialogRef: MdDialogRef<GradeDialog>, categoryGradeService:CategoryGradeService,
              private _fb: FormBuilder) {
      this.categoryGradeService = categoryGradeService;
  }

   ngOnInit() {
       this.gradeForm = this._fb.group({
            id: [this.selectedId],
            name: [this.gradeName, [<any>Validators.required], this.gradeNameValidator1.bind(this)],
            abbreviation: [this.abbreviation, [], this.abbreviationValidator.bind(this)],
            category:[this.categories],
            orderId:[this.orderId]
        });
   }
   public setActionButtonString(actionButtionValue:string){
      this.actionButton = actionButtionValue;
   }

   public setTitle(title:string){
        this.title = title;
   }

   public setIsEdit(isEdit:boolean){
       this.isEdit = isEdit;
   }
   public setDialogDetails(grade){
        this.selectedId =  grade.id;
        this.gradeName = grade.name;
        this.abbreviation = grade.abbreviation;
        this.orderId = grade.orderId;
        this.categoryId = grade.category.id;
   }

   public setCategories(categories){
       this.categories = categories;
   }

   public setCategoryId(categoryId){
       this.categoryId = categoryId;
   }

   categorySave(model: Category, isValid: boolean) {
        // check if model is valid
        // if valid, call API to save customer
        if(isValid){

        }
    }

    categoryAddSuccess(data):void{


    }

    abbreviationValidator(control:FormControl):{[key:string]: any}{
         return new Observable(observer => {
             this.categoryGradeService.checkAbbreviationExistence(control.value, false, this.selectedId, this.isEdit).subscribe(
                     data => {
                                if(data.success){
                                    observer.next({abbreviationAvailable:true});
                                }else{
                                    observer.next(null);
                                }
                                observer.complete();
                             },
                 );
         });
    }
    gradeNameValidator1(control: FormControl):{[key: string]: any} {
        return this.gradeNameValidator2(control.value).first();
    }
    gradeNameValidator2(value :string):{[key: string]: any}{

     /*    return new Promise((resolve, reject) => {
                 this.categoryGradeService.checkCategoryExistence(value).subscribe(

                     data => resolve({uniqueCategory:true}),
                     error => resolve({uniqueCategory:true})
                 );
         }) */

          return new Observable(observer => {
             this.categoryGradeService.checkGradeExistence(value, this.selectedId, this.isEdit).subscribe(
                     data => {
                                if(data.success){
                                    observer.next({gradeAvailable:true});
                                }else{
                                    observer.next(null);
                                }
                             },
                 );
         });
    }

}
export interface Category {
    id: number;
    name: string;
    abbreviation: string;
    orderId:number;
    company:Company;
}

export interface Company {
  id: number;
  name :string;
}

export interface Grade{
  id:number;
  name: string;
  abbreviation: string;
  category: number;
  orderId:number;
}

