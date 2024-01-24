declare var d3: any;

import { Component, OnInit } from '@angular/core';
// import * as d3 from 'd3'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-first-chart',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './first-chart.component.html',
  styleUrl: './first-chart.component.scss'
})
export class FirstChartComponent implements OnInit {

  public chart = {
    main_title: 'First Chart',
    title: 'Top 50 Countries by Average Life Expectancy and Yearly Change',
    type: 'Dual-Axis Composite Chart',
    description: 'This visualization presents a comparative analysis of the top 50 countries with the highest average life expectancy. It illustrates not only where these countries stand in terms of life expectancy but also how this metric is changing over time, providing a year-over-year change rate. The use of dual axes allows for an intuitive comparison between the static average life expectancy figures and the dynamic annual changes.'
  }

  firstChart() {
    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 80, bottom: 200, left: 50 },
      width = 1000 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svg = d3.select("#dual-axis-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    d3.csv("../assets/dataset/top_5_countries_life_expectancy_data1.csv").then((data: any) => {
      // X axis: scale and draw
      const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map((d: any) => d.Country))
        .padding(0.2);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y0 axis for Average Life Expectancy
      const y0 = d3.scaleLinear()
        .domain([73, (d3.max(data, (d: any) => +d['Life expectancy'])) as number])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y0));

      // Add Y1 axis for YoY Change
      const y1 = d3.scaleLinear()
        .domain([d3.min(data, (d: any) => +d.YoY_Change), d3.max(data, (d: any) => +d.YoY_Change)])
        .range([height, 0]);
      svg.append("g")
        .attr("transform", `translate(${Number(width)}, 0)`)
        .call(d3.axisRight(y1));



      const yAxisRight = svg.append("g")
        .attr("transform", `translate(${width}, 0)`)
        .call(d3.axisRight(y1));

      // Append a label to the right y-axis
      yAxisRight.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.right + 120)
        .attr("dy", "1.15em")
        .attr("dx", "-120")
        .attr("text-anchor", "end")
        .attr("fill", "#000") // You can change the fill color
        .text("Average Year-Over-Year Change");

      const yAxisLeft = svg.append("g")
        .call(d3.axisLeft(y0));

      // Y0 axis title
      yAxisLeft.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.right)
        .attr("dy", "-120")
        .attr("dx", "-120")
        .style("text-anchor", "end")
        .attr("fill", "#000") // You can change the fill color
        .text("Life Expectancy Range");

      // Y1 axis title
      yAxisLeft.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", width + 40)
        .attr("dy", "-5.1em")
        .style("text-anchor", "end")
        .text("Average Year-Over-Year Change");

      svg.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`) // Adjust position as needed
        .style("text-anchor", "middle")
        .text("Country");

      // Adding bars for Average Life Expectancy
      svg.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d: any) => x(d.Country) as number)
        .attr("y", (d: any) => y0(+d['Life expectancy']))
        .attr("width", x.bandwidth())
        .attr("height", (d: any) => height - y0(+d['Life expectancy']))
        .attr("fill", "#69b3a2")
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);

      // Adding a line for YoY Change
      const line = d3.line()
        .x((d: any) => (x(d.Country)) as number + x.bandwidth() / 2)
        .y((d: any) => y1(+d.YoY_Change));
      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", line);


      // Define the tooltip for the chart
      const tooltip = d3.select("#tooltip");

      // Function to show the tooltip on hover
      function showTooltip(d: any, data: any) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Country: " + data.Country + "<br/>Life Expectancy Range: " + +data['Life expectancy']
          + "<br/>YoY Change: " + data.YoY_Change)
          .style("left", (d.pageX - 300) + "px")
          .style("top", (d.pageY - 200) + "px");
      }

      // Function to hide the tooltip
      function hideTooltip() {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      }

      // ... (rest of your code to set up scales, axes, and parse data)

      // Add bars with tooltip events
      svg.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        // ... (other attributes for bars)
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);

      // Add points to the line for tooltip interaction
      svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function (d: any) { return (x(d.Country)) as any + x.bandwidth() / 2; })
        .attr("cy", function (d: any) { return y1(+d.YoY_Change); })
        .attr("r", 5)
        .attr("fill", "orange")
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);
    })
  }

  ngOnInit() {
    this.firstChart()
  }

}
