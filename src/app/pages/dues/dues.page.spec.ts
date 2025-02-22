import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DuesPage } from './dues.page';

describe('DuesPage', () => {
  let component: DuesPage;
  let fixture: ComponentFixture<DuesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
