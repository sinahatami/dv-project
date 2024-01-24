import { Routes } from '@angular/router';
import { FirstChartComponent } from './first-chart/first-chart.component';
import { SecondChartComponent } from './second-chart/second-chart.component';
import { ThirdChartComponent } from './third-chart/third-chart.component';
import { FourthChartComponent } from './fourth-chart/fourth-chart.component';
import { FifthChartComponent } from './fifth-chart/fifth-chart.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home page' },
    { path: 'first-chart', component: FirstChartComponent, title: 'First Chart' },
    { path: 'second-chart', component: SecondChartComponent, title: 'Second Chart' },
    { path: 'third-chart', component: ThirdChartComponent, title: 'Third Chart' },
    { path: 'fourth-chart', component: FourthChartComponent, title: 'Fourth Chart' },
    { path: 'fifth-chart', component: FifthChartComponent, title: 'Fifth Chart' },
];
