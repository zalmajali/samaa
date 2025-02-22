import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingreservationsPage } from './buildingreservations.page';

describe('BuildingreservationsPage', () => {
  let component: BuildingreservationsPage;
  let fixture: ComponentFixture<BuildingreservationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingreservationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
