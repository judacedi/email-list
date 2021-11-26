import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmailsService } from './emails.service';
import { Observable, Subscription } from 'rxjs';
import { Email } from './emails';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  emails$: Observable<Email[]>;
  emailsArray: Email[];
  subscription: Subscription;
  currentOrder: number;
  isAscending: boolean;

  constructor(private emailService: EmailsService) { 
    this.emails$ = this.emailService.getEmailsList();
  }

  ngOnInit(): void {
    this.subscription = this.emails$.subscribe((res) => this.emailsArray = res);
    this.currentOrder = 0; // 0 for Date, 1 for Sender
    this.isAscending = false;
  }

  public reOrder(reOrderBy: string): void {
    if (reOrderBy === 'sender') {
      this.orderBySender();
      this.currentOrder = 1;
    } else if(reOrderBy === 'date') {
      this.orderByDate();
      this.currentOrder = 0;
    }
  }

  private orderBySender(): void {
    if (this.currentOrder === 1 && !this.isAscending) { //Orders by ASC only if the current order is Sender
      this.emailsArray.sort((a, b) => {
        if (a.from > b.from)
          return -1
        else if (a.from < b.from)
          return 1;
  
        return 0;
      })
      this.isAscending = true;
    } else {                                            //Else it just sorts as DESC
      this.emailsArray.sort((a, b) => {
        if (a.from < b.from)
          return -1
        else if (a.from > b.from)
          return 1;
  
        return 0;
      })
      this.isAscending = false;
    }
  }

  private orderByDate(): void {
    if (this.currentOrder === 0 && !this.isAscending) { //Orders ASC only if the current order is Date
      this.emailsArray.sort((a, b) => {
        if (a.datetime < b.datetime)
        return -1
      else if (a.datetime > b.datetime)
        return 1;
  
      return 0;
      })
      this.isAscending = true;
    } else {                                            //Else it just sorts as DESC
      this.emailsArray.sort((a, b) => {
        if (a.datetime > b.datetime)
        return -1
      else if (a.datetime < b.datetime)
        return 1;
  
      return 0;
      })
      this.isAscending = false;
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
