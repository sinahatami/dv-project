import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthChartComponent } from './fifth-chart.component';

describe('FifthChartComponent', () => {
  let component: FifthChartComponent;
  let fixture: ComponentFixture<FifthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FifthChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FifthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
