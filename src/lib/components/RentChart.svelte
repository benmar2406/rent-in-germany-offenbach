<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let data;
  let svg;
  let tooltip;

  onMount(() => {
    // Initialize D3 chart
    tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px");

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
      .domain([d3.min(data, d => d.Jahr), d3.max(data, d => d.Jahr)])
      .range([0, width]);
      
    const y1 = d3.scaleLinear()
      .domain([0, 140])
      .range([height, 0]);

    const y2 = d3.scaleLinear()
      .domain([0, 140])
      .range([height, 0]);

    const line1 = d3.line()
      .x(d => x(d.Jahr))
      .y(d => y1(d.Mietpreisindex))
      .curve(d3.curveMonotoneX);

    const line2 = d3.line()
      .x(d => x(d.Jahr))
      .y(d => d.Reallohnindex !== null ? y2(d.Reallohnindex) : NaN)
      .curve(d3.curveMonotoneX);

    const numberOfTicks = Math.ceil(data.length / 4);

    // Add X axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(numberOfTicks))
      .attr("class", "axis-label");

    // Add Y1 axis (left)
    svg.append("g")
      .call(d3.axisLeft(y1).ticks(5))
      .attr("class", "axis-label");

    // Add Y2 axis (right)
    svg.append("g")
      .attr("transform", "translate(" + width + " ,0)")
      .call(d3.axisRight(y2).ticks(5))
      .attr("class", "axis-label-reallohn");

    // Add the lines
    svg.append("path")
      .datum(data)
      .attr("class", "line-miet")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line1)
      .on("mouseover", function(event, d) {
        tooltip.style("visibility", "visible");
      })
      .on("mousemove", function(event, d) {
        const xPos = event.pageX + 10;
        const yPos = event.pageY + 10;

        const xValue = x.invert(event.offsetX);
        const closestDataPoint = data.reduce((prev, curr) => 
          Math.abs(curr.Jahr - xValue) < Math.abs(prev.Jahr - xValue) ? curr : prev);

        tooltip.html(`Jahr: ${closestDataPoint.Jahr}<br/>` +
          `Mietpreisindex: ${closestDataPoint.Mietpreisindex}`)
          .style("left", xPos + "px")
          .style("top", yPos + "px");
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
      });

    svg.append("path")
      .datum(data.filter(d => d.Reallohnindex !== null))
      .attr("class", "line-reallohn")
      .attr("fill", "none")
      .attr("stroke", "#2196F3")
      .attr("stroke-width", 2)
      .attr("d", line2)
      .on("mouseover", function(event, d) {
        tooltip.style("visibility", "visible");
      })
      .on("mousemove", function(event, d) {
        const xPos = event.pageX + 10;
        const yPos = event.pageY + 10;

        const xValue = x.invert(event.offsetX);
        const closestDataPoint = data.filter(d => d.Reallohnindex !== null).reduce((prev, curr) => 
          Math.abs(curr.Jahr - xValue) < Math.abs(prev.Jahr - xValue) ? curr : prev);

        tooltip.html(`Jahr: ${closestDataPoint.Jahr}<br/>` +
          `Reallohnindex: ${closestDataPoint.Reallohnindex}`)
          .style("left", xPos + "px")
          .style("top", yPos + "px");
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
      });

    // Add axis labels
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left - 5)
      .attr("x", -(height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "red")
      .text("Mietpreisindex");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", width + margin.right)
      .attr("x", -(height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "#2196F3")
      .text("Reallohnindex");
  });
</script>

<div class="charts-container">
  <h3>Entwicklung: Mieten vs. Löhne</h3>
  <div class="chart-wrapper">
    <svg class="rent-index-chart"></svg>
  </div>
</div>

<style>
  .charts-container {
    margin-top: 2rem;
  }

  .charts-container h3 {
    margin-bottom: 1.5rem;
  }

  .charts-container h3 span {
    font-weight: 400;
  }

  .chart-wrapper :global(.line) {
    fill: none;
    stroke: red;
    stroke-width: 5;
  }

  .chart-wrapper :global(.axis-label) {
    font-size: 12px;
  }

  .chart-wrapper :global(.line-miet) {
    fill: none;
    stroke: red;
    stroke-width: 4;
  }

  .chart-wrapper :global(.line-reallohn) {
    fill: none;
    stroke: #2196F3;
    stroke-width: 4;
  }

  .rent-index-chart {
    width: 100%;
    height: 300px;
  }
</style> 