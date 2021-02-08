import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrmDashboardComponent } from './grm-dashboard.component';

describe('GrmDashboardComponent', () => {
  let component: GrmDashboardComponent;
  let fixture: ComponentFixture<GrmDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrmDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
