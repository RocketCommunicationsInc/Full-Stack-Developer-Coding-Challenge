import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrmDashboardComponent } from './grm-dashboard.component';
import {DataService} from '../../services/data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GrmDashboardComponent', () => {
  let component: GrmDashboardComponent;
  let fixture: ComponentFixture<GrmDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
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
