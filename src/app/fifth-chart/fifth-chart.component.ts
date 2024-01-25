declare var d3: any;

import { Component, OnInit } from '@angular/core';
// import * as d3 from 'd3'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fifth-chart',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './fifth-chart.component.html',
  styleUrl: './fifth-chart.component.scss'
})
export class FifthChartComponent implements OnInit {
  public chart = {
    main_title: 'Fifth Chart',
    title: 'Trends in Total Health Expenditure Across Top 5 Countries (2000-2014)',
    type: 'Area Chart',
    description: 'This visualization presents the total health expenditure trends from the year 2000 to 2014 for top 5 countries, including the United States of America, Micronesia, Sierra Leone, Sweden, and Norway. Each colored area represents the expenditure of one country, and the layers are stacked on top of each other to show the cumulative expenditure over the years.'
  }

  fifthChart() {
    // Define the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 50, left: 60 }, // Adjusted bottom margin for X-axis label
      width = 1000 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Append the SVG object to the body of the page
    const svg = d3.select("#chart5")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Date / Time
    const parseTime = d3.timeParse("%Y");

    // Set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // Define the area
    const area = d3.area()
      .x(function (d: any) { return x(d.Year); })
      .y0(height)
      .y1(function (d: any) { return y(d.Total_expenditure); });

    // Read the CSV file
    d3.csv("assets/dataset/Top_5_Countries_Health_Expenditure.csv").then((data: any) => {
      // Format the data
      data.forEach((d: any) => {
        d.Year = parseTime(d.Year);
        d.Total_expenditure = +d.Total_expenditure;
      });

      // Get a list of unique countries
      const countries = [...new Set(data.map((d: any) => d.Country))];

      // Sort countries by maximum total expenditure
      countries.sort((a, b) => {
        const maxExpenditureA = d3.max(data.filter((d: any) => d.Country === a), (d: any) => d.Total_expenditure);
        const maxExpenditureB = d3.max(data.filter((d: any) => d.Country === b), (d: any) => d.Total_expenditure);
        return maxExpenditureB - maxExpenditureA; // Note: sorting in descending order
      });

      // Define color scale for countries
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
      const colorScale2 = ['rgba(31, 119, 180, 1)', 'rgba(255, 127, 14, 0.9)', 'rgba(44, 160, 44, 0.8)', 'rgba(214, 39, 40, 0.7)', 'rgba(166, 0, 159, 0.6)']
      // Set the domains for X and Y scales
      x.domain(d3.extent(data, function (d: any) { return d.Year; }));
      y.domain([0, d3.max(data, function (d: any) { return d.Total_expenditure; }) + 10]);

      // Add the X-axis
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the Y-axis
      svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

      // Add X-axis label
      svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 20) + ")") // Adjusted Y position
        .style("text-anchor", "middle")
        .text("Year");

      // Add Y-axis label
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Total Expenditure");

      // Add tooltips
      const tooltip = d3.select("#chart5")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      // Add a legend for countries
      const legend = svg.selectAll(".legend")
        .data(countries)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d: any, i: any) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d: any) { return colorScale(d) });

      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d: any) { return d; });

      const mouseover = function (event: any, d: any) {
        let ave_Total_expenditure = 0
        d.forEach((a: any) => {
          ave_Total_expenditure += a.Total_expenditure
        })
        ave_Total_expenditure = ave_Total_expenditure / 15
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(`Country: ${d[0].Country}<br>Mean Total Expenditure: ${ave_Total_expenditure}`)
          .style("left", (event.pageX - 240) + "px")
          .style("top", (event.pageY - 110) + "px");
      }

      const mouseout = function (event: any, d: any) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      }

      // Add the area for each country with tooltips
      countries.forEach((country, index) => {
        let countryData = data.filter(function (row: any) { return row.Country === country; });

        // Add the area for this country
        svg.append("path")
          .data([countryData])
          .attr("class", "area")
          .attr("d", area)
          .style("fill", colorScale2[index])
          .on("mouseover", mouseover)
          .on("mouseout", mouseout);
      });
    });
  }

  ngOnInit() {
    this.fifthChart()
  }
}
