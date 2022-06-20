import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { AuthenticationService } from 'src/app/@core/auth/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  information = new EventEmitter<number>();
  private hubConnection: HubConnection;
  constructor(private authService: AuthenticationService) { 
    this.createConnection();
    this.register();
    this.startConnection();
  }

  private createConnection() {
    const token = this.authService.currentUserToken;
    let tokenValue = '';
    if (token !== '') {
      tokenValue = '?token=' + token;
    }
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.mahammaNotificationBaseUrl}/notify`, 
      {
        skipNegotiation: true,
		    transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => token 
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  private register(): void {
    this.hubConnection.on('InformClient', (param: number) => {
      this.information.emit(param);
    });
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started.');
      })
      .catch(err => {
        console.log('Opps!');
      });
  }
}
