import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../emails';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() email: Email;

  constructor() { }

  ngOnInit(): void {
  }

  public turnToRead(): void {
    this.email.unread = false;
  }

}
