declare var d3: any;

import { Component, OnInit } from '@angular/core';
// import * as d3 from 'd3'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-third-chart',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './third-chart.component.html',
  styleUrl: './third-chart.component.scss'
})
export class ThirdChartComponent implements OnInit {
  public chart = {
    main_title: 'Third Chart',
    title: 'Standardized Health and Socio-Economic Indicators for the Top 15 Countries',
    type: 'Heatmap',
    description: `The heatmap provides a comparative view of the top 15 countrie's based on their mean health and socio-economic indicators. Each row represents a country, and each column corresponds to an indicator such as "Life expectancy", "Adult Mortality", "Hepatitis B", "Measles", "BMI", "Polio", "Diphtheria", "HIV/AIDS", "GDP", and "Schooling". The color intensity in each cell reflects the countrys standardized score for that indicator, with the color scale provided at the bottom.`
  }

  addLegend(svg: any, colorScale: any) {
    const legendWidth = 300;
    const legendHeight = 30;
    const margin = { top: 450, right: 60, bottom: 30, left: 60 };

    // Define the gradient
    const defs = svg.append("defs");
    const linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient");

    linearGradient.selectAll("stop")
      .data(colorScale.ticks().map((t: any, i: any, n: any) => ({ offset: `${100 * i / n.length}%`, color: colorScale(t) })))
      .enter().append("stop")
      .attr("offset", (d: any) => d.offset)
      .attr("stop-color", (d: any) => d.color);

    // Define the legend group
    const legend = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Append the title
    legend.append("text")
      .attr("class", "legend-title")
      .attr("x", legendWidth / 2) // Position the text in the middle of the legend
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text("Indicator Value Scale"); // The title text

    // Draw the rectangle and fill with gradient
    legend.append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .style("fill", "url(#linear-gradient)")
      .attr("transform", "translate(0, 20)");

    // Create a scale and axis for the legend
    const legendScale = d3.scaleLinear()
      .domain(colorScale.domain())
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
      .ticks(5);

    legend.append("g")
      .attr("transform", `translate(0, ${legendHeight + 20})`)
      .call(legendAxis);
  }

  thirdChart() {
    // Dimensions and margins of the chart
    const margin = { top: 30, right: 30, bottom: 200, left: 100 },
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svg = d3.select("#heatmap")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Read the data
    d3.csv("../assets/dataset/Top15_Heatmap_Data_Standardized3.csv").then((data: any) => {
      // Labels of row and columns
      const countries = data.map((d: any) => d.Country);
      const indicators = Object.keys(data[0]).slice(1); // exclude the first column which is Country

      // Build X scales and axis
      const x = d3.scaleBand()
        .range([0, width])
        .domain(indicators)
        .padding(0.05);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

      // Build Y scales and axis
      const y = d3.scaleBand()
        .range([height, 0])
        .domain(countries)
        .padding(0.05);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Build color scale
      const myColor = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([d3.min(data, (d: any) => d3.min(indicators, (indicator: any) => +d[indicator])),
        d3.max(data, (d: any) => d3.max(indicators, (indicator: any) => +d[indicator]))]);


      const tooltip = d3.select("#tooltip");
      // Three functions that change the tooltip when user hover / move / leave a cell
      const mouseover = (event: any, d: any) => {
        tooltip.style("opacity", 1)
        tooltip.transition()
          .duration(200)
          .style("opacity", .9)

        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1);
      }

      const mousemove = function (d: any, event: any) {
        tooltip.style("opacity", 1);
        tooltip.html("The exact value of<br>this cell is: " + event[d.currentTarget.attributes.valuee.textContent])
          .style("left", (d.pageX) - 230 + "px")
          .style("top", (d.pageY - 100) + "px");
      };

      const mouseleave = function (d: any, event: any) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        d3.select(event)
          .style("stroke", "none")
          .style("opacity", 0.8);
      };

      // add the squares
      data.forEach((row: any) => {
        indicators.forEach(function (indicator) {
          svg.append("rect")
            .data([row])
            .attr("x", x(indicator))
            .attr("y", y(row.Country))
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .attr("valuee", indicator)
            .style("fill", myColor(row[indicator]))
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
        });
      });

      // Call this function after your heatmap is created and pass the color scale used for the heatmap
      this.addLegend(svg, myColor);
    });
  }

  ngOnInit() {
    this.thirdChart()
  }
}
