import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeType } from '../../../shared/common/util/data.component';

@Component({
    selector: 'location-cmp',
    moduleId: module.id,
    templateUrl: 'location.component.html'
})

export class LocationComponent implements OnInit{

    private locationList:any;
     list:{ building:string,floor: string, jobs: {time:string,name:string,currArea:{area:string,location:string},destArea:{area:string,location:string},isJobAssigned:string,jobId:string,status:string}[] } []=[
       {"building":"Hospital Building","floor":"Floor 01","jobs":
         [{"time":"12","name":"James","currArea":{"area":"Cafetaria","location":"Hospital Building"},"destArea":{"area":"Operation Theatre","location":"Hospital Building"},"isJobAssigned":"false","jobId":"123-4560E","status":"1"},
           {"time":"10","name":"Johnathan","currArea":{"area":"Dispensary","location":"Hospital Building"},"destArea":{"area":"Emergency Room","location":"Hospital Building"},"isJobAssigned":"false","jobId":"123-4561E","status":"1"}
           ,{"time":"9","name":"Abraham","currArea":{"area":"Emergency Room","location":"Hospital Building"},"destArea":{"area":"ICU","location":"Hospital Building"},"isJobAssigned":"false","jobId":"123-4562E","status":"1"},
           {"time":"5","name":"Ethan","currArea":{"area":"Cafetaria","location":"Hospital Building"},"destArea":{"area":"Dispensary","location":"Hospital Building"},"isJobAssigned":"false","jobId":"123-4563E","status":"1"},
           {"time":"5","name":"Cortez","currArea":{"area":"Cafetaria","location":"Hospital Building"},"destArea":{"area":"Dispensary","location":"Hospital Building"},"isJobAssigned":"false","jobId":"123-4563E","status":"1"},
           {"time":"5","name":"Eldridge","currArea":{"area":"Cafetaria","location":"Hospital Building"},"destArea":{"area":"Dispensary","location":"Hospital Building"},"isJobAssigned":"false","jobId":"123-4563E","status":"1"}
         ]},
       {"building":"Hospital Building","floor":"Floor 02","jobs":
         [{"time":"12","name":"Bert","currArea":{"area":"Cafetaria","location":"Hospital Building"},"destArea":{"area":"Ward 10","location":"Hospital Building"},"isJobAssigned":"false","jobId":"123-4564E","status":"1"},
           {"time":"10","name":"Augustus","currArea":{"area":"ICU","location":"Hospital Building "},"destArea":{"area":"Ward 11","location":"Clinic Building"},"isJobAssigned":"true","jobId":"123-4565E","status":"2"}
           ,{"time":"10","name":"Andrew","currArea":{"area":"Dispensary","location":"Hospital Building"},"destArea":{"area":"ICU","location":"Clinics Building"},"isJobAssigned":"true","jobId":"123-4566E","status":"3"},
           {"time":"15","name":"Timothy","currArea":{"area":"Pharmacy","location":"Hospital Building"},"destArea":{"area":"Emergency Room","location":"Clinics Building"},"isJobAssigned":"true","jobId":"123-4567E","status":"2"}
         ]},
       {"building":"Hospital Building","floor":"Floor 03","jobs":
         [{"time":"12","name":"Milton","currArea":{"area":"ICU","location":"Hospital Building "},"destArea":{"area":"Operation Theatre","location":"Clinics Building"},"isJobAssigned":"false","jobId":"123-4568E","status":"4"},
           {"time":"10","name":"Buford","currArea":{"area":"Dispensary","location":"Hospital Building"},"destArea":{"area":"Emergency Room","location":"Clinic Building"},"isJobAssigned":"false","jobId":"123-4569E","status":"1"}
           ,{"time":"10","name":"Elliott","currArea":{"area":"Cafetaria","location":"Hospital Building"},"destArea":{"area":"Dispensary","location":"Clinic Building"},"isJobAssigned":"true","jobId":"123-4570E","status":"2"}
         ]},
       {"building":"Hospital Building","floor":"Floor 04","jobs":
         [{"time":"12","name":"Luther","currArea":{"area":"Cafetaria","location":"Hospital Building"},"destArea":{"area":"Ward 12","location":"Clinics Building"},"isJobAssigned":"false","jobId":"123-4571E","status":"1"},
           {"time":"10","name":"Larry","currArea":{"area":"Dispensary","location":"Hospital Building"},"destArea":{"area":"Ward 11","location":"Clinic building"},"isJobAssigned":"false","jobId":"123-4572E","status":"1"}
           ,{"time":"10","name":"Mose","currArea":{"area":"Emergency Room","location":"Hospital Building"},"destArea":{"area":"ICU","location":"Clinics Building"},"isJobAssigned":"true","jobId":"123-4573E","status":"3"}
         ]},
       {"building":"Clinics Building","floor":"Floor 01","jobs":
         [{"time":"12","name":"Jewel","currArea":{"area":"Cafetaria","location":"Clinics Building"},"destArea":{"area":"Emergency Room","location":"Clinics Building"},"isJobAssigned":"true","jobId":"123-4574E","status":"2"},
           {"time":"10","name":"Kennith","currArea":{"area":"Dispensary","location":"Clinics Building"},"destArea":{"area":"Ward 12","location":"Hospital Building"},"isJobAssigned":"false","jobId":"123-4575E","status":"1"}
           ,{"time":"10","name":"Amos","currArea":{"area":"Emergency Room","location":"Clinics Building"},"destArea":{"area":"Ward 12","location":"Clinics Building"},"isJobAssigned":"true","jobId":"123-4576E","status":"3"}
         ]},
       {"building":"Clinics Building","floor":"Floor 02","jobs":
         [{"time":"12","name":"Roy","currArea":{"area":"Emergency Room","location":"Clinics Building"},"destArea":{"area":"Pharmacy","location":"Hospital Building"},"isJobAssigned":"false","jobId":"123-4577E","status":"1"},
           {"time":"10","name":"Buster","currArea":{"area":"Cafetaria","location":"Clinics Building"},"destArea":{"area":"Pharmacy","location":"Hospital Building"},"isJobAssigned":"true","jobId":"123-4578E","status":"2"}
           ,{"time":"10","name":"Fred","currArea":{"area":"Dispensary","location":"Clinics Building"},"destArea":{"area":"Emergency Room","location":"Hospital Building"},"isJobAssigned":"true","jobId":"123-4579E","status":"3"}
         ]},
       {"building":"Clinics Building","floor":"Floor 03","jobs":
         [{"time":"12","name":"Eusebio","currArea":{"area":"Dispensary","location":"Clinics Building"},"destArea":{"area":"Ward 12","location":"Hospital Building"},"isJobAssigned":"true","jobId":"123-4580E","status":"2"},
           {"time":"10","name":"Jude","currArea":{"area":"Cafetaria","location":"Clinics Building"},"destArea":{"area":"Ward 11","location":"Hospital Building"},"isJobAssigned":"true","jobId":"123-4581E","status":"3"}
         ]},
       {"building":"Clinics Building","floor":"Floor 04","jobs":
         [{"time":"12","name":"Alton","currArea":{"area":"Emergency Room","location":"Clinics Building"},"destArea":{"area":"ICU","location":"Clinics Building"},"isJobAssigned":"false","jobId":"123-4582E","status":"1"},
           {"time":"10","name":"Brock","currArea":{"area":"Dispensary","location":"Clinics Building"},"destArea":{"area":"Ward 11","location":"Clinics Building"},"isJobAssigned":"true","jobId":"123-4583E","status":"2"}
         ]},
       {"building":"Clinics Building","floor":"Floor 05","jobs":
         [{"time":"12","name":"Marcel","currArea":{"area":"Cafetaria","location":"Clinics Building"},"destArea":{"area":"ICU","location":"Hospital Building"},"isJobAssigned":"true","jobId":"123-4584E","status":"3"},
           {"time":"10","name":"Ellis","currArea":{"area":"Dispensary","location":"Clinics Building"},"destArea":{"area":"Emergency Room","location":"Hospital Building"},"isJobAssigned":"false","jobId":"123-4585E","status":"1"}
         ]}
     ];
    public treeType:TreeType = TreeType.LocationTree;
    ngOnInit(){

    }
    constructor(){
      this.locationList=this.list;
    }
}
