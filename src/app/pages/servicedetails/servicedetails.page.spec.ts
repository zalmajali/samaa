import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicedetailsPage } from './servicedetails.page';

describe('ServicedetailsPage', () => {
  let component: ServicedetailsPage;
  let fixture: ComponentFixture<ServicedetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicedetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
