import {Injectable} from "@angular/core";
import {NotificationsService, PushNotificationsService} from "angular2-notifications/dist";
/**
 * Created by sachithra on 8/31/2017.
 */
@Injectable()
export class CommonNotificationService{

  constructor(private notificationService:NotificationsService,public _pushNotifications:PushNotificationsService){
  }

  createSuccessNotification(title:string,content:string){
    this.notificationService.success(title,content,{ timeOut: 3000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"],
    });
  }
  createErrorNotification(title:string,content:string){
    this.notificationService.error(title,content,{ timeOut: 3000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"],
    });
  }
  createPushNotification(title:string,content:string){
    this._pushNotifications.requestPermission();
    this._pushNotifications.create(title,{
      body:content,
      icon:"assets/img/carewarelogo.png",
      sticky:false
    }).subscribe();
  }
}
