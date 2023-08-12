import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private titleService: Title){}

  ngOnInit(): void {
    this.titleService.setTitle('Ultraclean Contacts');

    this.isLoading = false;
  }
}
