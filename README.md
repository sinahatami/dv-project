# 🌍 Life Expectancy Data Visualization

# Project

Welcome to the **dv-project**. This is a specialized web application built with **Angular** and **D3.js**
designed to explore global health trends, socio-economic indicators, and life expectancy
through interactive visualizations.

## 🚀 Getting Started

### Prerequisites

```
● Node.js and npm
● Angular CLI
● D3.js library (v7+)
```
### Installation

1. Clone the repository.
Install dependencies:
Bash
npm install
2.
Run the development server:
Bash
ng serve
3.
4. Navigate to [http://localhost:4200/](http://localhost:4200/) to view the home page.

## 📈 Visualizations Overview

This project features five distinct interactive charts, each focusing on a different aspect of global
health data.
**Chart Type Key Metrics Component
Dual-Axis Composite** Life Expectancy & YoY Change FirstChartComponent


```
Bubble Chart Immunization & Adult Mortality
+
SecondChartComponent
Heatmap Standardized Socio-Economic
Indicators
ThirdChartComponent
Scatter Linear GDP vs. Life Expectancy Correlation FourthChartComponent
Area Chart Health Expenditure Trends
(2000-2014)
FifthChartComponent
```
## 🔍 Detailed Component Breakdown

### 1. Dual-Axis Composite Chart

```
● Description : Analyzes the top 50 countries by life expectancy alongside their annual
change rate.
● Features :
○ Bar Graph : Displays the average Life Expectancy Range.
+
○ Trend Line : Overlays Year-Over-Year (YoY) changes.
○ Interactivity : Interactive tooltips for specific country metrics.
```
### 2. Bubble Chart

```
● Description : Explores the relationship between immunization coverage (Polio,
Diphtheria, Hepatitis B) and adult mortality.
● Features :
○ Dynamic Scaling : Bubble sizes are mapped to life expectancy values.
+
○ Axes : X-axis for coverage percentage; Y-axis for mortality rates.
```
### 3. Heatmap Chart

```
● Description : A comparative view of health and socio-economic indicators for the top 15
countries.
● Features :
○ Indicators : Includes GDP, Schooling, BMI, HIV/AIDS, and more.
```

```
○ Color Scale : Utilizes a sequential "Inferno" interpolator to show standardized
scores.
○ Custom Legend : Integrated indicator value scale at the base.
```
### 4. Scatter Linear Chart

```
● Description : Visualizes the correlation between wealth (GDP) and average life
expectancy.
● Features :
○ Regression Analysis : Includes a fitted linear regression line to predict trends.
+
○ Data Points : Individual dots representing specific country coordinates.
```
### 5. Area Chart Trend Line

```
● Description : Tracks health expenditure trends over time (2000–2014) for the top 5
spending nations.
● Features :
○ Stacked Areas : Represents cumulative expenditure across the USA, Micronesia,
Sierra Leone, Sweden, and Norway.
○ Time Scaling : Uses D3 time scales for accurate year-over-year progression.
+
```
## 🛠 Technical Configuration

```
● Framework : Angular 17+ with Standalone Component architecture.
+
● Routing : Centralized routing for seamless navigation between the Home view and Chart
views.
+
● Rendering : Supports Client-Side Hydration and Animations for a smooth UI.
● Data Sources : All charts are populated via CSV files located in the assets/ directory.
+
Note : This project was developed as a Final Data Visualization (DV) Project
focusing on Life Expectancy metrics.
```

