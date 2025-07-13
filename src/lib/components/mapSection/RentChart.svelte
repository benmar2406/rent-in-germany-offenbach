<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let data = [];

  let chartContainer;
  let svg;
  let gx, gyLeft, gyRight;
  let tooltip;
  
  let width;
  let height = 350;
  const marginTop = 20;
  const marginRight = 50;
  const marginBottom = 40;
  const marginLeft = 50;

  onMount(() => {
    const observer = new ResizeObserver(entries => {
      const rect = entries[0].contentRect;
      width = rect.width;
    });

    observer.observe(chartContainer);

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

    return () => observer.disconnect();

  });

  $: innerWidth = width - marginLeft - marginRight;
  $: innerHeight = height - marginTop - marginBottom;

  $: x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Jahr))
    .range([0, innerWidth]);

  $: y1 = d3.scaleLinear()
    .domain([50, 130])
    .range([innerHeight, 0]);

  $: y2 = d3.scaleLinear()
    .domain([50, 130])
    .range([innerHeight, 0]);

  $: line1 = d3.line()
    .x(d => x(d.Jahr))
    .y(d => y1(d.Mietpreisindex))
    .curve(d3.curveBasis);

  $: line2 = d3.line()
    .x(d => x(d.Jahr))
    .y(d => d.Reallohnindex !== null ? y2(d.Reallohnindex) : NaN)
    .curve(d3.curveBasis);

  $: if (gx) d3.select(gx).call(d3.axisBottom(x).ticks(Math.ceil(data.length / 10)).tickFormat(d3.format("d")));
  $: if (gyLeft) d3.select(gyLeft).call(d3.axisLeft(y1).ticks(3));
  $: if (gyRight) d3.select(gyRight).call(d3.axisRight(y2).ticks(3));

  function showTooltip(event, content) {

    tooltip
      .html(content)
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY + 10 + "px")
      .style("visibility", "visible");
  }

  function hideTooltip() {
    tooltip?.style("visibility", "hidden");
  }
</script>

<figure class="charts-container" bind:this={chartContainer}>
  <h3 class="sub-titles" id="chart-title">Mieten vs. Löhne</h3>
  <div class="chart-wrapper">
    <svg bind:this={svg} width={width} height={height}>
      <g transform={`translate(${marginLeft},${marginTop})`}>
        <!-- Axes -->
        <g bind:this={gx} transform={`translate(0,${innerHeight})`} />
        <g bind:this={gyLeft} />
        <g bind:this={gyRight} transform={`translate(${innerWidth},0)`} />

        <!-- Mietpreisindex line -->
        <path
          role="presentation"
          d={line1(data)}
          fill="none"
          stroke="#ca3f2d"
          stroke-width="3"
          on:mousemove={(e) => {
            const [xPos] = d3.pointer(e);
            const xVal = x.invert(xPos);
            const closest = data.reduce((a, b) =>
              Math.abs(b.Jahr - xVal) < Math.abs(a.Jahr - xVal) ? b : a
            );
            showTooltip(e, `Jahr: ${closest.Jahr}<br/>Mietpreisindex: ${closest.Mietpreisindex}`);
          }}
          on:mouseout={hideTooltip}
          on:blur={hideTooltip}
        />

        <!-- Reallohnindex line -->
        <path
          role="presentation"
          d={line2(data.filter(d => d.Reallohnindex !== null))}
          fill="none"
          stroke="#2db8ca"
          stroke-width="3"
          on:mousemove={(e) => {
            const [xPos] = d3.pointer(e);
            const xVal = x.invert(xPos);
            const filtered = data.filter(d => d.Reallohnindex !== null);
            const closest = filtered.reduce((a, b) =>
              Math.abs(b.Jahr - xVal) < Math.abs(a.Jahr - xVal) ? b : a
            );
            showTooltip(e, `Jahr: ${closest.Jahr}<br/>Reallohnindex: ${closest.Reallohnindex}`);
          }}
          on:mouseout={hideTooltip}
          on:blur={hideTooltip}
        />

        <!-- Y-axis labels -->
        <text
          transform="rotate(-90)"
          x={-innerHeight / 2}
          y={innerWidth + marginRight + 10}
          dy="-1em"
          fill="#ca3f2d"
          text-anchor="middle"
        >Mietpreisindex</text>

        <text
          transform="rotate(-90)"
          x={-innerHeight / 2}
          y={ -15}
          dy="-1em"
          fill="#2db8ca"
          text-anchor="middle"
        >Reallohnindex (ab 2007)</text>
        <text
          class="index"
          x={innerWidth / 2}
          y={innerHeight + 40} 
          text-anchor="middle"
        >Indexiert auf 2007 = 100</text>
      </g>
    </svg>
  </div>
    <p class="source">
      Quelle: Destatis (2025) - <a target="_blank" rel="noopener noreferrer" href="https://www.destatis.de/DE/Themen/Arbeit/Verdienste/Realloehne-Nettoverdienste/Tabellen/liste-reallohnindex.html#134650">Reallöhne und Nominallöhne</a> | <a target="_blank" rel="noopener noreferrer" href="https://www-genesis.destatis.de/datenbank/online/table/61111-0003/table-toolbar/search/s/NjExMTEtMDAwMw==#filter=JTdCJTIyaGlkZUVtcHR5Q29scyUyMiUzQWZhbHNlJTJDJTIyaGlkZUVtcHR5Um93cyUyMiUzQWZhbHNlJTJDJTIyY2FwdGlvbiUyMiUzQSU1QiU3QiUyMnZhcmlhYmxlSWQlMjIlM0ElMjI2MTExMSUyMiUyQyUyMmlkJTIyJTNBJTIyZmlsdGVyLjAlMjIlMkMlMjJ2YWx1ZXNJZHMlMjIlM0ElNUIlMjI2MTExMSUyMiU1RCUyQyUyMmNoaWxkcmVuJTIyJTNBJTVCJTdCJTIydmFyaWFibGVJZCUyMiUzQSUyMkRJTlNHJTIyJTJDJTIyaWQlMjIlM0ElMjJmaWx0ZXIuMC4wJTIyJTJDJTIydmFsdWVzSWRzJTIyJTNBJTVCJTIyREclMjIlNUQlMkMlMjJjaGlsZHJlbiUyMiUzQSU1QiU3QiUyMnZhcmlhYmxlSWQlMjIlM0ElMjJQUkVJUzElMjIlMkMlMjJpZCUyMiUzQSUyMmZpbHRlci4wLjAuMCUyMiUyQyUyMnZhbHVlc0lkcyUyMiUzQSU1QiUyMlFNVSUyMiU1RCUyQyUyMmNoaWxkcmVuJTIyJTNBJTVCJTVEJTJDJTIyc2hvd0FzSW50ZXJsaW5lJTIyJTNBZmFsc2UlMkMlMjJpc0hpZGRlbiUyMiUzQWZhbHNlJTJDJTIyYmxvY2tDb2RlJTIyJTNBJTIyYzElMjIlMkMlMjJjYW5CZUVkaXRlZCUyMiUzQWZhbHNlJTJDJTIyY2FuQmVIaWRkZW4lMjIlM0FmYWxzZSUyQyUyMnBvc3NpYmxlUGxhY2VzJTIyJTNBJTVCJTVEJTdEJTVEJTJDJTIyc2hvd0FzSW50ZXJsaW5lJTIyJTNBZmFsc2UlMkMlMjJzaG93VmFyaWFibGUlMjIlM0FmYWxzZSUyQyUyMnNob3dWYXJpYWJsZVZhbHVlJTIyJTNBJTVCJTIyTEFCRUwlMjIlNUQlMkMlMjJzb3J0JTIyJTNBJTIyTmFtZUFzYyUyMiUyQyUyMmlzSGlkZGVuJTIyJTNBZmFsc2UlMkMlMjJibG9ja0NvZGUlMjIlM0ElMjJ2MSUyMiUyQyUyMmNhbkJlRWRpdGVkJTIyJTNBZmFsc2UlMkMlMjJjYW5CZUhpZGRlbiUyMiUzQWZhbHNlJTJDJTIycG9zc2libGVQbGFjZXMlMjIlM0ElNUIlNUQlN0QlNUQlMkMlMjJzaG93QXNJbnRlcmxpbmUlMjIlM0FmYWxzZSUyQyUyMmlzSGlkZGVuJTIyJTNBZmFsc2UlMkMlMjJibG9ja0NvZGUlMjIlM0ElMjJzMSUyMiUyQyUyMmNhbkJlRWRpdGVkJTIyJTNBZmFsc2UlMkMlMjJjYW5CZUhpZGRlbiUyMiUzQWZhbHNlJTJDJTIycG9zc2libGVQbGFjZXMlMjIlM0ElNUIlNUQlN0QlNUQlMkMlMjJyb3dIZWFkZXIlMjIlM0ElNUIlN0IlMjJ2YXJpYWJsZUlkJTIyJTNBJTIySkFIUiUyMiUyQyUyMmlkJTIyJTNBJTIycm93VGl0bGUuMCUyMiUyQyUyMnZhbHVlc0lkcyUyMiUzQSU1QiUyMjE5OTElMjIlMkMlMjIxOTkyJTIyJTJDJTIyMTk5MyUyMiUyQyUyMjE5OTQlMjIlMkMlMjIxOTk1JTIyJTJDJTIyMTk5NiUyMiUyQyUyMjE5OTclMjIlMkMlMjIxOTk4JTIyJTJDJTIyMTk5OSUyMiUyQyUyMjIwMDAlMjIlMkMlMjIyMDAxJTIyJTJDJTIyMjAwMiUyMiUyQyUyMjIwMDMlMjIlMkMlMjIyMDA0JTIyJTJDJTIyMjAwNSUyMiUyQyUyMjIwMDYlMjIlMkMlMjIyMDA3JTIyJTJDJTIyMjAwOCUyMiUyQyUyMjIwMDklMjIlMkMlMjIyMDEwJTIyJTJDJTIyMjAxMSUyMiUyQyUyMjIwMTIlMjIlMkMlMjIyMDEzJTIyJTJDJTIyMjAxNCUyMiUyQyUyMjIwMTUlMjIlMkMlMjIyMDE2JTIyJTJDJTIyMjAxNyUyMiUyQyUyMjIwMTglMjIlMkMlMjIyMDE5JTIyJTJDJTIyMjAyMCUyMiUyQyUyMjIwMjElMjIlMkMlMjIyMDIyJTIyJTJDJTIyMjAyMyUyMiUyQyUyMjIwMjQlMjIlNUQlMkMlMjJjaGlsZHJlbiUyMiUzQSU1QiU1RCUyQyUyMnNob3dBc0ludGVybGluZSUyMiUzQWZhbHNlJTJDJTIyc2hvd1ZhcmlhYmxlJTIyJTNBZmFsc2UlMkMlMjJzaG93VmFyaWFibGVWYWx1ZSUyMiUzQSU1QiUyMkxBQkVMJTIyJTVEJTJDJTIyc29ydCUyMiUzQSUyMk5hbWVBc2MlMjIlMkMlMjJpc0hpZGRlbiUyMiUzQWZhbHNlJTJDJTIyYmxvY2tDb2RlJTIyJTNBJTIydjIlMjIlMkMlMjJjYW5CZUVkaXRlZCUyMiUzQXRydWUlMkMlMjJjYW5CZUhpZGRlbiUyMiUzQWZhbHNlJTJDJTIycG9zc2libGVQbGFjZXMlMjIlM0ElNUIlNUQlN0QlNUQlMkMlMjJjb2x1bW5IZWFkZXIlMjIlM0ElNUIlN0IlMjJ2YXJpYWJsZUlkJTIyJTNBJTIyQ0MxM0EyJTIyJTJDJTIyaWQlMjIlM0ElMjJjb2xUaXRsZS4wJTIyJTJDJTIydmFsdWVzSWRzJTIyJTNBJTVCJTIyQ0MxMy0wNDExJTIyJTJDJTIyQ0MxMy0wNDExMCUyMiUyQyUyMkNDMTMtMDQxMiUyMiUyQyUyMkNDMTMtMDQxMjIlMjIlMkMlMjJDQzEzLTA0MSUyMiU1RCUyQyUyMmNoaWxkcmVuJTIyJTNBJTVCJTVEJTJDJTIyc2hvd0FzSW50ZXJsaW5lJTIyJTNBZmFsc2UlMkMlMjJzaG93VmFyaWFibGUlMjIlM0F0cnVlJTJDJTIyc2hvd1ZhcmlhYmxlVmFsdWUlMjIlM0ElNUIlMjJJRCUyMiUyQyUyMkxBQkVMJTIyJTVEJTJDJTIyc29ydCUyMiUzQSUyMk5hbWVBc2MlMjIlMkMlMjJpc0hpZGRlbiUyMiUzQWZhbHNlJTJDJTIyYmxvY2tDb2RlJTIyJTNBJTIydjMlMjIlMkMlMjJjYW5CZUVkaXRlZCUyMiUzQXRydWUlMkMlMjJjYW5CZUhpZGRlbiUyMiUzQWZhbHNlJTJDJTIycG9zc2libGVQbGFjZXMlMjIlM0ElNUIlNUQlN0QlNUQlMkMlMjJmaXhGaXJzdENvbHVtbnMlMjIlM0FmYWxzZSU3RA==">Verbraucherpreisindex für Deutschland</a>
    </p>
</figure>

<style>
  .charts-container {
    width: 80%;
    max-width: 500px;
    min-width: 300px;
    margin: 1.8rem;
  }

  .charts-container h3 {
    margin: 1rem auto;
  }

  .chart-wrapper {
    width: 100%;
  }

  svg {
    height: auto;
  }

  .index {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    .charts-container {
      width: 90%;
      min-width: auto;
      margin: 0 auto;
      padding: 0.2rem
    }
  }
</style>
