import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DuesusersPage } from './duesusers.page';

describe('DuesusersPage', () => {
  let component: DuesusersPage;
  let fixture: ComponentFixture<DuesusersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DuesusersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
