import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthChartComponent } from './fourth-chart.component';

describe('FourthChartComponent', () => {
  let component: FourthChartComponent;
  let fixture: ComponentFixture<FourthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourthChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FourthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
