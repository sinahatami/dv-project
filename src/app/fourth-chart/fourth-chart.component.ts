declare var d3: any;

import { Component, OnInit } from '@angular/core';
// import * as d3 from 'd3'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forth-chart',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './fourth-chart.component.html',
  styleUrl: './fourth-chart.component.scss'
})
export class FourthChartComponent implements OnInit {

  public chart = {
    main_title: 'Fourth Chart',
    title: 'GDP and Life Expectancy Correlation with Linear Regression Analysis',
    type: 'Scatter Linear Chart',
    description: `This visualization aims to explore the correlation between a country's wealth, represented by GDP, and the average life expectancy of its inhabitants. Each dot represents a country, with the horizontal position reflecting its GDP and the vertical position indicating its average life expectancy. The red line represents a linear regression model fitted to the data, suggesting the expected life expectancy given a country's GDP.`
  }

  fourthChart() {
    const margin = { top: 10, right: 30, bottom: 50, left: 60 },
      width = 1200 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#scatterplot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Read the data
    d3.csv("../assets/dataset/scatter_data_with_countries4.csv").then((data: any) => {
      // Assuming 'Intercept' and 'Coefficient' are columns in your CSV
      const intercept = parseFloat(data[0].Intercept);
      const coefficient = parseFloat(data[0].Coefficient);
      // Add X axis
      const x = d3.scaleLinear()
        .domain([0, d3.max(data, (d: any) => +d.GDP)])
        .range([0, width]);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d: any) => +d['Life expectancy'])])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add X axis label
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", (width / 2) + 10)
        .attr("y", height + margin.top + 30)
        .text("GDP");

      // Add Y axis label
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top - 100)
        .text("Life Expectancy");

      // Create a tooltip
      const tooltip = d3.select("#tooltip");

      // Function to show the tooltip on mouseover
      const mouseover = (event: any, d: any) => {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Country: " + d.Country + "<br>GDP: " + d.GDP + "<br>Life Expectancy: " + d['Life expectancy'])
          .style("left", (event.pageX - 240) + "px")
          .style("top", (event.pageY - 110) + "px");
      };

      // Function to hide the tooltip on mouseout
      const mouseout = (event: any, d: any) => {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      };
      // Add dots
      svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d: any) => x(d.GDP))
        .attr("cy", (d: any) => y(d['Life expectancy']))
        .attr("r", 5)
        .style("fill", "#69b3a2")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

      // Now add the regression line using the intercept and coefficient
      const linePoints = x.domain().map((xValue: any) => {
        return { x: xValue, y: intercept + coefficient * xValue };
      });

      // Add the regression line to the plot
      svg.selectAll(".regression-line")
        .data([linePoints])
        .enter()
        .append("path")
        .attr("class", "regression-line")
        .attr("d", d3.line()
          .x((d: any) => x(d.x))
          .y((d: any) => y(d.y))
        )
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .style("fill", "none");

      // Add the regression line
      svg.append("line")
        .attr("x1", x(0))
        .attr("y1", y(intercept))
        .attr("x2", x(d3.max(data, (d: any) => +d.GDP)))
        .attr("y2", y(intercept + coefficient * d3.max(data, (d: any) => +d.GDP)))
        .attr("stroke", "red")
        .attr("stroke-width", 2);
    });
  }

  ngOnInit() {
    this.fourthChart()
  }
}
