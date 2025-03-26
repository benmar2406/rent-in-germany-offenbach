<script>
  import { onMount, tick } from 'svelte';
  import * as d3 from 'd3';

  export let data;
  let chartContainer;
  let width = 0;
  let height = 0;
  let hasMounted = false;
  let tooltip;

  const margin = { top: 20, right: 50, bottom: 40, left: 50 };

  $: if (hasMounted && width > 0 && height > 0) {
    drawChart();
  }

  onMount(() => {
    hasMounted = true;

    const observer = new ResizeObserver(async entries => {
      const rect = entries[0].contentRect;
      width = rect.width - margin.left - margin.right;
      height = 300 - margin.top - margin.bottom;
      await tick();
    });

    observer.observe(chartContainer);
    return () => observer.disconnect();
  });

  function drawChart() {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    if (!tooltip) {
      tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("padding", "5px")
        .style("border", "1px solid #ccc")
        .style("border-radius", "4px")
        .style("font-size", "12px");
    }

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Jahr))
      .range([0, width]);

    const y1 = d3.scaleLinear().domain([0, 140]).range([height, 0]);
    const y2 = d3.scaleLinear().domain([0, 140]).range([height, 0]);

    const line1 = d3.line()
      .x(d => x(d.Jahr))
      .y(d => y1(d.Mietpreisindex))
      .curve(d3.curveMonotoneX);

    const line2 = d3.line()
      .x(d => x(d.Jahr))
      .y(d => d.Reallohnindex !== null ? y2(d.Reallohnindex) : NaN)
      .curve(d3.curveMonotoneX);

    const numberOfTicks = Math.ceil(data.length / 4);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(numberOfTicks))
      .attr("class", "axis-label");

    // Y1 axis (left)
    g.append("g")
      .call(d3.axisLeft(y1).ticks(5))
      .attr("class", "axis-label");

    // Y2 axis (right)
    g.append("g")
      .attr("transform", `translate(${width},0)`)
      .call(d3.axisRight(y2).ticks(5))
      .attr("class", "axis-label-reallohn");

    // Red line: Mietpreisindex
    g.append("path")
      .datum(data)
      .attr("class", "line-miet")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line1)
      .on("mouseover", () => tooltip.style("visibility", "visible"))
      .on("mousemove", function (event) {
        const [xPos] = d3.pointer(event);
        const xValue = x.invert(xPos);
        const closest = data.reduce((a, b) =>
          Math.abs(b.Jahr - xValue) < Math.abs(a.Jahr - xValue) ? b : a
        );
        tooltip
          .html(`Jahr: ${closest.Jahr}<br/>Mietpreisindex: ${closest.Mietpreisindex}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));

    // Blue line: Reallohnindex
    g.append("path")
      .datum(data.filter(d => d.Reallohnindex !== null))
      .attr("class", "line-reallohn")
      .attr("fill", "none")
      .attr("stroke", "#2196F3")
      .attr("stroke-width", 2)
      .attr("d", line2)
      .on("mouseover", () => tooltip.style("visibility", "visible"))
      .on("mousemove", function (event) {
        const [xPos] = d3.pointer(event);
        const xValue = x.invert(xPos);
        const filtered = data.filter(d => d.Reallohnindex !== null);
        const closest = filtered.reduce((a, b) =>
          Math.abs(b.Jahr - xValue) < Math.abs(a.Jahr - xValue) ? b : a
        );
        tooltip
          .html(`Jahr: ${closest.Jahr}<br/>Reallohnindex: ${closest.Reallohnindex}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));

        // Y-axis labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", - 20)
      .attr("dy", "-1em")
      .style("text-anchor", "middle")
      .style("fill", "#ca3f2d")
      .text("Mietpreisindex");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", width + margin.right + 5)
      .attr("dy", "-1em")
      .style("text-anchor", "middle")
      .style("fill", "#2db8ca")
      .text("Reallohnindex (bis 2019)");

  }
</script>

<div class="charts-container" bind:this={chartContainer}>
  <h3 class="sub-titles">Mieten vs. Löhne</h3>
  <div class="chart-wrapper">
    <svg class="rent-index-chart"></svg>
  </div>
</div>

<style>
  .charts-container {
    width: 70%;
    margin: 4rem 2rem;
  }

  .charts-container h3 {
    margin: 1.5rem auto;
  }

  .chart-wrapper :global(.line) {
    fill: none;
    stroke: #ca3f2d;
    stroke-width: 5;
  }

  .chart-wrapper :global(.axis-label) {
    font-size: 12px;
  }

  .chart-wrapper :global(.line-miet) {
    fill: none;
    stroke: #ca3f2d;
    stroke-width: 4;
  }

  .chart-wrapper :global(.line-reallohn) {
    fill: none;
    stroke: #2db8ca;
    stroke-width: 4;
  }

  .rent-index-chart {
    width: 100%;
    height: 300px;
  }

  .chart-wrapper {
    width: 100%;
  }

  .charts-container {
    width: 70%;
    margin: 0 2rem;
  }

  @media (max-width: 768px) {
    .charts-container {
      width: 85%;
      margin: 0 auto;
    }
  }
</style>
