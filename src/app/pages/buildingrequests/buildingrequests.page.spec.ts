import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingrequestsPage } from './buildingrequests.page';

describe('BuildingrequestsPage', () => {
  let component: BuildingrequestsPage;
  let fixture: ComponentFixture<BuildingrequestsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingrequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
