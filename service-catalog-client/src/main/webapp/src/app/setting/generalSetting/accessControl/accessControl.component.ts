import { Component, OnInit, ViewChild, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { AccessControlService } from './accessControl.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { TreeComponent, TreeNode } from 'angular-tree-component';
import { MdDialog, MdDialogRef, MdButton, MdDialogModule } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ConfirmationDialog } from '../../../shared/Dialog/confirmation-dialog';
import { HttpCustomService, HttpType, ReturnType } from '../../../shared/common';
import {CustomValidationService} from "../../../shared/common/validation/custom-validation.service";


@Component({
    selector: 'app-basictree',
    templateUrl: './accessControl.component.html',
    //styleUrls: ['book.component.css'],
    styles: [],
    providers: [AccessControlService]
})
export class AccessControlComponent implements OnInit, AfterViewInit {
    roleTreeClicked = false;
    roleNodes = [];
    savePermStatus = false;
    selectedRoleId = 0;
    // selectedRoleObject = null;
    enableButton = true;
    items: TreeviewItem[];
    treeItems: TreeviewItem[];
    showAddRoleButton = false;
    showEditButton = false;
    showDeleteButton = false;
    allParentRoles: any[];
    public checkedPermSize: number = 0;

    @ViewChild(TreeComponent)
    private tree: TreeComponent;
    //role tree opotions
    options = {
        nodeClass: (node: TreeNode) => {
            if (node.data.icon) {
                return 'tree-' + node.data.icon;
            }
            return 'tree-node-folder';
        }

    };

    config: TreeviewConfig = {
      hasAllCheckBox: true,
      hasFilter: true,
      hasCollapseExpand: true,
      maxHeight: 500,
      decoupleChildFromParent:false,
      hasDivider:true
    };
    constructor(private accessService: AccessControlService, public dialog: MdDialog,
        private httpCustomService: HttpCustomService, private elRef: ElementRef, private renderer: Renderer
      ,private customValidationService:CustomValidationService) {
    }
    //here get all the roles and Parent r
    ngOnInit() {
        this.accessService.getAllRolesForLoginUser().subscribe(
            roles => {
                this.roleNodes = roles.relatedRoles;// for the tree
                this.allParentRoles = roles.parentRoles;// for the drop down
            })
    }

    treeclickEvent(event): void {
        debugger;
        //console.log(this.allParentRoles);
        if (event.node.isRoot == undefined) {
            this.showAddRoleButton = true;
            this.showEditButton = true;
            this.showDeleteButton = true;
        }
        else if (event.node.position == 0) {
            this.showAddRoleButton = true;
            this.showEditButton = false;
            this.showDeleteButton = false;
        }
        else {
            this.showAddRoleButton = true;
            this.showEditButton = true;
            this.showDeleteButton = false;
        }

        this.roleTreeClicked = true;
        this.selectedRoleId = event.node.data.id;
        this.items = [];
        let parentId = 0;

        //clicked on the root
        if (event.node.realParent == null) {
            parentId = event.node.data.id;
        }
        else {
            parentId = this.tree.treeModel.getActiveNode().parent.data.id;
        }

        this.accessService.getPermissionForRole(event.node.data.id, parentId)
            .subscribe(

            items => {
                this.checkedPermSize = items.treeSize;
                this.treeItems = items.tree;
                this.items = [];
                for (let entry of this.treeItems) {
                    const tree = new TreeviewItem({
                        text: entry.text, value: entry.value, children: entry.children,
                        disabled: entry.disabled
                    })
                    debugger;
                    // this.items = [];
                    this.items.push(tree);
                    debugger;
                }

            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            })
        // }
    }


    selectedChange(event): void {
        // if(this.checkedPermSize > 0){
        //     debugger;
        //    this.checkedPermSize -= 1;
        //    return;
        // }

        if (!this.roleTreeClicked) {
            var stauus = false;
            console.log(this.selectedRoleId);
            debugger;
            console.log(event);
            this.accessService.savePermissionsForRole(event, this.selectedRoleId).subscribe(
                outPut => {
                    this.savePermStatus = outPut
                }
            );
        }
        this.roleTreeClicked = false;
    }

    addRole() {
        //  console.log(  this.allParentRoles);
        this.openRoleDialog("add", null);
    }

    roleMoveNode(event) {
        let movingNode = event.node.id;
        let toParent = event.to.parent.id;

        this.accessService.moveChildRole(movingNode, toParent).subscribe(
            data => {
                console.log(data.success);
            }
        );
    }

    editRole() {
        //remove the editing elemet from the array
        let parentArrayCopy = this.allParentRoles.filter(item => item.id !== this.tree.treeModel.getActiveNode().data.id);

        this.openRoleDialog("edit", parentArrayCopy);
    }

    deleteRole() {

        if (this.tree.treeModel.getActiveNode().hasChildren) {
            let dialogRef = this.dialog.open(ConfirmationDialog);
            dialogRef.disableClose = true;
            dialogRef.componentInstance.title = "Unable to Delete";
            dialogRef.componentInstance.message = "Role Contains Children";
            dialogRef.componentInstance.isCancelButtonVisible = false;
        }

        else {
            let dialogRef = this.dialog.open(ConfirmationDialog);
            dialogRef.disableClose = true;
            dialogRef.componentInstance.title = "Remove Role";
            dialogRef.componentInstance.message = "Are you sure you want to remove role";
            let parent = this.tree.treeModel.getActiveNode().parent;
            dialogRef.afterClosed().subscribe(result => {
                if (result == true) {

                    this.accessService.removeRole(this.selectedRoleId, parent.data.id).subscribe(
                        data => {
                            if (data.success) {
                                this.roleNodes = data.roleTree;
                                if (parent.data.children.length == 1) {
                                    parent.collapse();
                                }
                                this.showAddRoleButton = false;
                                this.showEditButton = false;
                                this.showDeleteButton = false;

                            }
                            else {
                                let dialogRef = this.dialog.open(ConfirmationDialog);
                                dialogRef.disableClose = true;
                                dialogRef.componentInstance.title = "Unable to delete";
                                dialogRef.componentInstance.message = "Error Occured";
                                dialogRef.componentInstance.isCancelButtonVisible = false;

                            }
                        }
                    );
                }
            });
        }
    }

    openRoleDialog(action, roleDropDownList): void {
        let dialogRef = this.dialog.open(RoleDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.parentRoles = this.allParentRoles;

        this.setRoleActionButtonAndHeader(dialogRef, action);
        if (action == "edit") {
            dialogRef.componentInstance.parentRoles = roleDropDownList;
            dialogRef.componentInstance.setDialogDetails(this.tree.treeModel.activeNodes[0].data);
            dialogRef.componentInstance.parentRoleId = this.tree.treeModel.getActiveNode().parent.data.id;
        }
        else {
            dialogRef.componentInstance.parentRoleId = this.tree.treeModel.getActiveNode().data.id;
        }

        dialogRef.afterClosed().subscribe(result => {
			var company:Company={id:1};
            result["company"]=company;
            if (result) {
                this.accessService.addRole(result).subscribe(
                    data => {
                        if (data.success) {
                            this.roleNodes = data.roleTree;
                            this.allParentRoles = data.parentRoles;// for the drop down
                        }
                    }
                );
            }
        });
    }

    setRoleActionButtonAndHeader(dialogRef: MdDialogRef<RoleDialog>, action: string): void {
        if (action == "add") {
            dialogRef.componentInstance.setTitle("Add Role");
            dialogRef.componentInstance.setActionButtonString("Add");
            dialogRef.componentInstance.setIsEdit(false);
        } else if (action == "edit") {
            dialogRef.componentInstance.setTitle("Edit Role");
            dialogRef.componentInstance.setActionButtonString("Edit");
            dialogRef.componentInstance.setIsEdit(true);
        } else {
            dialogRef.componentInstance.setTitle("Remove Role");
            dialogRef.componentInstance.setActionButtonString("Remove");
        }
    }

    ngAfterViewInit() {
        this.renderer.setElementClass(this.elRef.nativeElement.querySelector('input'), 'form-control', false);
    }

}



@Component({
    selector: 'role-cmp',
    templateUrl: 'accessControl-dialog.html',
    providers: [AccessControlService]
})

export class RoleDialog implements OnInit {
    public role: Role;
    public accessControlService: AccessControlService;

    public roleForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
    private selectedId: number;
    private roleName: string;
    private parentRole: number;
    private title: string;
    private actionButton: string = "Add";
    private isEdit: boolean = false;
    public parentRoles: any[] = []; // keep parent roles
    public parentRoleId: number = 0;
    public oldParent: number = 0;
	private companyId:number=1;


    constructor(public dialogRef: MdDialogRef<RoleDialog>, accessControlService: AccessControlService,
        private _fb: FormBuilder) {
        this.accessControlService = accessControlService;
    }

    ngOnInit() {
        this.roleForm = this._fb.group({
            id: [this.selectedId],
            roleName: [this.roleName, [<any>Validators.required], this.roleValidator.bind(this)],
            parentRole: [this.parentRoles],
            oldParent: [this.parentRoleId],
			companyId:[this.companyId]
        });
    }

    public setActionButtonString(actionButtionValue: string) {
        this.actionButton = actionButtionValue;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public setIsEdit(isEdit: boolean) {
        this.isEdit = isEdit;
    }
    public setDialogDetails(role) {
        this.selectedId = role.id;
        this.roleName = role.name;
        this.parentRole = role.parentRole;
        this.oldParent = role.oldParent;
		this.companyId=role.company.id;
    }

    roleValidator(control: FormControl): { [key: string]: any } {
        return this.roleValidator2(control.value).first();
    }


    roleValidator2(value: string): { [key: string]: any } {
        return new Observable(observer => {
            this.accessControlService.checkRoleExistence(value, this.selectedId, this.isEdit).subscribe(
                data => {
                    if (data.success) {
                        observer.next({ roleAvailable: true });
                    } else {
                        observer.next(null);
                    }
                },
            );
        });
    }
}

export interface Role {
    id: number;
    roleName: string;
    parentRole: number;
    oldParent: number;
	company:Company;
}
export interface Company{
  id:number
}
