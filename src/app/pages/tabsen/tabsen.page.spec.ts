import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsenPage } from './tabsen.page';

describe('TabsenPage', () => {
  let component: TabsenPage;
  let fixture: ComponentFixture<TabsenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
