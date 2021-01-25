import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Users } from '../models/users'
import { Posts } from '../models/posts'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = "https://jsonplaceholder.typicode.com/";

  constructor(private httpClient: HttpClient) { }

  public getUsers(){
    return this.httpClient.get<Array<Users>>(this.REST_API_SERVER + 'users').pipe(catchError(this.handleError))
  }

  public getPosts(){
    return this.httpClient.get<Array<Posts>>(this.REST_API_SERVER + 'posts').pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
