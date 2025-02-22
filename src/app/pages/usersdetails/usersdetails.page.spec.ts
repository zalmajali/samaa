import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersdetailsPage } from './usersdetails.page';

describe('UsersdetailsPage', () => {
  let component: UsersdetailsPage;
  let fixture: ComponentFixture<UsersdetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
