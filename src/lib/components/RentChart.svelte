<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let data;
  let chartContainer;
  let width = 0;
  let height = 0;

  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  onMount(() => {
    const observer = new ResizeObserver(entries => {
      const rect = entries[0].contentRect;
      width = rect.width - margin.left - margin.right;
      height = 300 - margin.top - margin.bottom; // Adjustable if needed
      drawChart();
    });

    observer.observe(chartContainer);
    return () => observer.disconnect();
  });

  function drawChart() {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Jahr))
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

    // ✅ Custom number of ticks
    const numberOfTicks = Math.ceil(data.length / 4);

    // ✅ X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(numberOfTicks))
      .attr("class", "axis-label");

    // ✅ Y1 axis (left)
    g.append("g")
      .call(d3.axisLeft(y1).ticks(5))
      .attr("class", "axis-label");

    // ✅ Y2 axis (right)
    g.append("g")
      .attr("transform", `translate(${width},0)`)
      .call(d3.axisRight(y2).ticks(5))
      .attr("class", "axis-label-reallohn");

    // ✅ Lines
    g.append("path")
      .datum(data)
      .attr("class", "line-miet")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line1);

    g.append("path")
      .datum(data.filter(d => d.Reallohnindex !== null))
      .attr("class", "line-reallohn")
      .attr("fill", "none")
      .attr("stroke", "#2196F3")
      .attr("stroke-width", 2)
      .attr("d", line2);
  }
</script>

<div class="charts-container" bind:this={chartContainer}>
  <h3 id="chart-title" class="sub-titles">Mieten vs. Löhne</h3>
  <div class="chart-wrapper">
    <svg class="rent-index-chart"></svg>
  </div>
</div>

<style>
  .charts-container {
    margin-top: 2rem;
    width: 500px;
  }

  .charts-container h3 {
    margin-bottom: 1.5rem;
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

  #chart-title {
    text-align: left;
  }

  .chart-wrapper {
    width: 100%;
  }

  .rent-index-chart {
    width: 100%;
    height: auto;
    display: block;
  }
</style> 