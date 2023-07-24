import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningRequestsComponent } from './cleaning-requests.component';

describe('CleaningRequestsComponent', () => {
  let component: CleaningRequestsComponent;
  let fixture: ComponentFixture<CleaningRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CleaningRequestsComponent]
    });
    fixture = TestBed.createComponent(CleaningRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
