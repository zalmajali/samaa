import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilitysdetailsPage } from './utilitysdetails.page';

describe('UtilitysdetailsPage', () => {
  let component: UtilitysdetailsPage;
  let fixture: ComponentFixture<UtilitysdetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitysdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
