import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { FirebaseTokenService } from 'src/app/@AppService/services/notification/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification-header',
  templateUrl: './notification-header.component.html',
  styleUrls: ['./notification-header.component.scss']
})
export class NotificationHeaderComponent implements OnInit {
  enabledDesktopNotification : boolean = false;
  currentToken : any;
  firebaseInstance : any = null;

  constructor(public firebaseTokenService: FirebaseTokenService) { }

  ngOnInit(): void {
    this.firebaseTokenService.getFirebaseToken().subscribe(x => {
      if(x.result?.responseData)
      {
        this.enabledDesktopNotification = true;
        this.currentToken = x.result.responseData;
      }
    });
  }

  enablePushNotification() {
    if(this.enabledDesktopNotification == false){
      this.requestPermission();
    }
  }

  disablePushNotification() {
    if(this.currentToken){
      this.firebaseTokenService.removeFirebaseToken(this.currentToken).subscribe(x => 
        {
          this.enabledDesktopNotification = false;
          this.firebaseInstance = null;
        });
    }
  }

  requestPermission() {
    this.firebaseInstance = getMessaging();
    getToken(this.firebaseInstance, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
          this.firebaseTokenService.addFirebaseToken(currentToken).subscribe(x => 
            {
              this.enabledDesktopNotification = true;
              this.listen()
            });
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  
  listen() {
    onMessage(this.firebaseInstance, (payload) => {
      console.log('Message received. ', payload);
    });
  }

}
