import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildinguserPage } from './buildinguser.page';

describe('BuildinguserPage', () => {
  let component: BuildinguserPage;
  let fixture: ComponentFixture<BuildinguserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildinguserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
