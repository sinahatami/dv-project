declare var d3: any;

import { Component, OnInit } from '@angular/core';
// import * as d3 from 'd3'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-second-chart',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './second-chart.component.html',
  styleUrl: './second-chart.component.scss'
})
export class SecondChartComponent implements OnInit {
  public chart = {
    main_title: 'Second Chart',
    title: 'Correlation Between Immunization Coverage and Adult Mortality in the Top 150 Countries by Life Expectancy',
    type: 'Bubble Chart',
    description: 'This visualization examines the relationship between immunization coverage and adult mortality among the top 150 countries ranked by life expectancy. It aims to explore whether higher immunization rates are associated with lower adult mortality, which is a key indicator of public health.'
  }

  secondChart() {
    // Set the dimensions and margins of the graph
    const margin = { top: 40, right: 40, bottom: 60, left: 60 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svg = d3.select("#scatterplot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Read the data
    d3.csv("../assets/dataset/Processed_Life_Expectancy_Data2.csv").then((data: any) => {

      // Convert strings to numbers
      data.forEach((d: any) => {
        d['Immunization Coverage'] = +d['Immunization Coverage'];
        d['Adult Mortality'] = +d['Adult Mortality'];
        d['Life expectancy'] = +d['Life expectancy'];
      });

      // Add X axis
      const x = d3.scaleLinear()
        .domain([90, d3.max(data, (d: any) => d['Immunization Coverage'])])
        .range([0, width]);
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .append("text")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Immunization Coverage (%)");

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d: any) => d['Adult Mortality'])])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Adult Mortality");

      // Bubble size scale
      let bubbleScale = d3.scaleSqrt()
        .domain([50, d3.max(data, (d: any) => d['Life expectancy'])])
        .range([-10, 30]); // Adjust the range based on your actual visualization needs

      // Add bubbles with tooltips
      const tooltip = d3.select("#scatterplot").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      svg.append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", (d: any) => x(d['Immunization Coverage']))
        .attr("cy", (d: any) => y(d['Adult Mortality']))
        .attr("r", (d: any) => bubbleScale(d['Life expectancy']))
        .style("fill", "#69b3a2")
        .style("opacity", "0.7")
        .attr("stroke", "black")
        .on("mouseover", (event: any, d: any) => {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(d['Country'] + "<br/> Life expectancy: " + d['Life expectancy'])
            .style("left", (event.pageX - 240) + "px")
            .style("top", (event.pageY - 120) + "px");
        })
        .on("mouseout", (d: any) => {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });

      // Add axes labels
      svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + 100)
        .attr("y", height + 40)
        .text("Immunization Coverage (%)");

      svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -50)
        .attr("dy", ".75em")
        .attr("dx", "-130")
        .attr("transform", "rotate(-90)")
        .text("Adult Mortality");
    });

  }

  ngOnInit() {
    this.secondChart()
  }
}
