import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from './emails';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(private http: HttpClient) { }

  public getEmailsList(): Observable<any> {
    return this.http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/emails-api/emails.json')
  }
}
