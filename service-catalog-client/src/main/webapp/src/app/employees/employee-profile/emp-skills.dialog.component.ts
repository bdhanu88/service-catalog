/**
 * Created by CSI on 8/18/2017.
 */
import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, FormArray, FormControl} from "@angular/forms";
import {HttpCustomService} from "../../shared/common/http/common-http.service";
import {EmployeeProfileService} from "./emp-profile.service";
import {AccordionModule} from "ng2-accordion";
@Component({
  selector: "skill-tree-dialog",
  templateUrl: "emp-skills.component.html",
  providers: []
})

export class SkillTreeDialog {
   nodes = [{
    name: '',
    children: []
  }];
   skillGroups: any[] = [];
  private selectedId:any = 0;
  skillForm: FormGroup;
  selectedSkills=[];

  constructor(private dialogRef:MdDialogRef<SkillTreeDialog>,private httpCustomService: HttpCustomService, private _fb: FormBuilder,private empProfService:EmployeeProfileService) {
    // this.httpCustomService.commonHttpRequest("getAllSkillTree" , "skill/getTree" , null  , this.generateSkillTree.bind(this, true));

  }
  /*private generateSkillTree(isSetSelectedId:boolean,data:any) : void{
    this.nodes = data.tree;
    let skillGroups = data.skillGroups;
    this.skillGroups = skillGroups;


    if(isSetSelectedId){
      if(skillGroups.length > 0){
        this.selectedId = skillGroups[0].id;
      }else{
        this.selectedId = -1;
      }
    }
    let selected= this.selectedSkills;

    if(selected.length>0){
      for(let skill of selected){
        for(let skillGroup of skillGroups){
          let index = skillGroup.skills.findIndex(x => x.id==skill.id);
          if(index>-1){
            let node={name:skillGroup.name,children:[skill]};
            let pos = this.treenodes.findIndex(x => x.name == skillGroup.name);
            if(pos>-1){
              let childArray=this.treenodes[pos].children;
              childArray.push(skill);
            }
            else {
              this.treenodes.push(node);
            }
            skillGroup.skills[index].selected=true;
          }
        }
      }
    }
    this.empProfService.setSkillNodeArray(this.treenodes);
  }*/

  ngOnInit() {

      this.skillForm = this._fb.group({
        selectedSkills: this._fb.array([])
      });


  }
   treenodes=[{
    name: '',
    children: []
  }];

  onChange(skillGroup:any,skill:any, isChecked: boolean) {

    const skillFormArray = this.selectedSkills;
    // skill.skillGroup=skillGroup;

    let node={name:skillGroup.name,children:[skill]};

    let pos = this.treenodes.findIndex(x => x.name == skillGroup.name)
    if(isChecked){
      skill.selected=true;
      if(pos>-1){
        let childArray=this.treenodes[pos].children;
        childArray.push(skill);
      }
      else {
        this.treenodes.push(node);
      }
      skillFormArray.push(skill);
    } else {
      skill.selected=false;
      let chlidArray =this.treenodes[pos].children;
      let childPos= chlidArray.findIndex(x=>x.value==skill);
      chlidArray.splice(childPos);
      if(chlidArray.length==0){
        this.treenodes.splice(pos);
      }
      let index = skillFormArray.findIndex(x => x.value == skill)
      skillFormArray.splice(index);
    }
    this.empProfService.setSkills(skillFormArray);
    this.empProfService.setSkillNodeArray(this.treenodes);

  }

}
export interface treeNode{
  name:string;
  children:[any];
}
