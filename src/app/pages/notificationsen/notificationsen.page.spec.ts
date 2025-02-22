import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsenPage } from './notificationsen.page';

describe('NotificationsenPage', () => {
  let component: NotificationsenPage;
  let fixture: ComponentFixture<NotificationsenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
