import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { ServerService } from './server.service';
import { AppError } from './app-error';
import { MethodNotAllowed } from './method-not-allowed';
import { NotFoundError } from './not-found';
import { AppErrorHandler } from './app-error-handler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serverService.getAppName();
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  constructor(private serverService: ServerService) {}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  onSave() {
    this.serverService.storeServers(this.servers)
      .subscribe(
        (response) => console.log(response),
        (error: AppError) => {
          if(error instanceof MethodNotAllowed){
            alert('Something is wrong in this form/Data');
          }
          else throw error;
        }
      );
  }

  onGet() {
    this.serverService.getServers()
      .subscribe(
        (servers: any) => this.servers = servers,
        (error: AppError) => {
          if(error instanceof NotFoundError){
            alert('Data Not found!');
          }
          else throw error;
        }
    );
  }

  onDelete(server){
    this.serverService.deleteServer(123).subscribe(
        (response: Response)=> console.log('Response',response),
        (error: AppError) => {
          if(error instanceof NotFoundError){
            alert('Not found!');
          }
          else throw error;
        }
      );
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
