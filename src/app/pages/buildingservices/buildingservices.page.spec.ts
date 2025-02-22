import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingservicesPage } from './buildingservices.page';

describe('BuildingservicesPage', () => {
  let component: BuildingservicesPage;
  let fixture: ComponentFixture<BuildingservicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingservicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
