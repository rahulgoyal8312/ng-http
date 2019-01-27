import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppError } from './app-error';
import { NotFoundError } from './not-found';
import { MethodNotAllowed } from './method-not-allowed';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) {}
  private url='https://sample-project-ec0110.firebaseio.com/data.json';

  storeServers(servers: any[]) {
    // const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(this.url,servers).pipe(
      catchError((error:Response) =>{
        // console.log(error);
        if(error.status === 405){
          throw(new MethodNotAllowed(error));
        }
        if(error.status === 422){
          throw('Duplicate entry');
        }
        console.log(error);
        throw(new AppError(error));
        
      })
    );
  }

  getServers() {
    return this.http.get(this.url).pipe(
      map(
        (response: Response) => {
          const data = response;
          // for (const server of data) {
          //   server.name = 'FETCHED_' + server.name;
          // }
          return data;
        }
      ),
      catchError(
        (error: Response) => {
          // console.log(error.status);
          if(error.status === 404){
            console.log(error);
           throw(new NotFoundError(error));
          }
          throw(new AppError(error));
        }
      )
    );
  }

  getAppName() {
    return this.http.get('https://sample-project-ec0110.firebaseio.com/appName.json').pipe(
      map(
        (response: Response) => {
          return response;
        }
      )
    );
  }

  deleteServer(id:number){
    return this.http.delete('https://jsonplaceholder.typicode.com/posts/'+1234).pipe(
      map(
        (response: Response) =>  {
          return response;
        }
      ),
      catchError(
        (error: Response) => {
          if(error.status===404){
            throw(new NotFoundError(error));
          }
          throw('Cant delete');
        }
      )    
    );
  }
}
