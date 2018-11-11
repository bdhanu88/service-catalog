/**
 * Created by CSI on 8/15/2017.
 */
import {Injectable} from "@angular/core";
import {Headers} from "@angular/http";
import {AuthenticationService} from "../../login/authentication.service";
import {HttpCustomService} from "../../shared/common/http/common-http.service";
@Injectable()
export class EmployeeProfileService{
  public profileId:number;
  private skills=[];
  private selectedSkillNodes=[];
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private httpCustomService: HttpCustomService, private authenticationService: AuthenticationService) {
  }

  setProfileId(id){
    this.profileId=id;
  }
  getProfileId():number{
    return this.profileId;
  }
  setSkills(skillArray){
    // const arr = _.uniqBy([skillArray, this.skills], 'id')
    this.skills=skillArray;
  }
  getSkills(){
    return this.skills;
  }

  setSkillNodeArray(array){
    var list=[].concat(array);
    this.selectedSkillNodes=list;
  }
  getSkillNodeArray(){
    return this.selectedSkillNodes;
  }
}
