import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltracleanServicesComponent } from './ultraclean-services.component';

describe('UltracleanServicesComponent', () => {
  let component: UltracleanServicesComponent;
  let fixture: ComponentFixture<UltracleanServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UltracleanServicesComponent]
    });
    fixture = TestBed.createComponent(UltracleanServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
