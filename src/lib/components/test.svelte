<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let chartContainer;
    let svg;
    let gx, gy;
  
    let width = 640;
    let height = 300;
  
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;
  
    let data = [];
  
    // Load data on mount
    onMount(async () => {
      const raw = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", d3.autoType);
      data = raw;
    });
  
    // Reactive dimensions
    $: innerWidth = width - marginLeft - marginRight;
    $: innerHeight = height - marginTop - marginBottom;
  
    // Scales
    $: x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.GrLivArea) || 1])
      .range([0, innerWidth]);
  
    $: y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.SalePrice) || 1])
      .range([innerHeight, 0]);
  
    // Axes
    $: if (gx) d3.select(gx).call(d3.axisBottom(x));
    $: if (gy) d3.select(gy).call(d3.axisLeft(y));
  </script>
  
  <div class="charts-container" bind:this={chartContainer}>
    <h3 class="sub-titles">Scatterino</h3>
    <svg bind:this={svg} width={width} height={height}>
      <g transform={`translate(${marginLeft},${marginTop})`}>
        <!-- Axes -->
        <g bind:this={gx} transform={`translate(0,${innerHeight})`} />
        <g bind:this={gy} />
  
        <!-- Dots -->
        {#each data as d}
          <circle
            cx={x(d.GrLivArea)}
            cy={y(d.SalePrice)}
            r="2"
            fill="#69b3a2"
          />
        {/each}
  
        <!-- Label -->
        <text
          transform="rotate(-90)"
          x={-innerHeight / 2}
          y={-35}
          dy="-1em"
          fill="#69b3a2"
          text-anchor="middle"
        >Sale Price</text>
      </g>
    </svg>
  </div>
  
  <style>
    .charts-container {
      width: 100%;
      max-width: 700px;
      margin: 2rem auto;
    }
  
    svg {
      width: 100%;
      height: auto;
    }
  
    .sub-titles {
      text-align: center;
      font-size: 1.2rem;
    }
  </style>
  