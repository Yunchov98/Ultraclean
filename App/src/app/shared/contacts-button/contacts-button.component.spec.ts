import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsButtonComponent } from './contacts-button.component';

describe('ContactsButtonComponent', () => {
  let component: ContactsButtonComponent;
  let fixture: ComponentFixture<ContactsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsButtonComponent]
    });
    fixture = TestBed.createComponent(ContactsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
