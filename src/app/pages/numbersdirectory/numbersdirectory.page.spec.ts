import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumbersdirectoryPage } from './numbersdirectory.page';

describe('NumbersdirectoryPage', () => {
  let component: NumbersdirectoryPage;
  let fixture: ComponentFixture<NumbersdirectoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersdirectoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
