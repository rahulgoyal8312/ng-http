import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler{
	handleError(error){
      console.log(error);
      alert('Something went wrong');
	}
}