<script>
  import { onMount } from 'svelte';
  import { scaleLinear } from 'd3-scale';
  import { fade, fly } from 'svelte/transition';
  import { useVisibilityObserver } from '$lib/customHooks/useVisibilityObserver.svelte';

  let observer = $state();
  let elementToObserve;

  // 1. Basic Setup: Get the data
  // Some random birthrate data
  let data = $state([
  { "name": "München", "rentSqm": 23.70 },
  { "name": "Berlin", "rentSqm": 19.11 },
  { "name": "Hamburg", "rentSqm": 17.16 },
  { "name": "Frankfurt", "rentSqm": 19.58 },
  { "name": "Köln", "rentSqm": 15.34 },
  { "name": "Stuttgart", "rentSqm": 19.96 },
  { "name": "Düsseldorf", "rentSqm": 15.17 },
  { "name": "Leipzig", "rentSqm": 10.71 },
  { "name": "Dresden", "rentSqm": 10.18 },
  { "name": "Nürnberg", "rentSqm": 13.76 },
  { "name": "Hannover", "rentSqm": 11.69 },
  { "name": "Bremen", "rentSqm": 11.80 },
  { "name": "Dortmund", "rentSqm": 9.94 },
  { "name": "Essen", "rentSqm": 9.68 }
]);

  // 2. Dimensions, Margins & Scales

  // Data for plotting x-y axis
  const yTicks = [0, 5, 10, 15, 20, 25];
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  let width = $state(500);
  let height = 350;

  let xScale = $derived(
    scaleLinear()
      .domain([0, data.length])
      .range([padding.left, width - padding.right])
  );

  let yScale = scaleLinear()
    .domain([0, 25])
    .range([height - padding.bottom, padding.top]);

  let innerWidth = $derived(width - (padding.left + padding.right));
  let barWidth = $derived(innerWidth / (data.length / 0.9));

  onMount(() => {
        observer = useVisibilityObserver(elementToObserve); 
    });

</script>

<div class="chart" bind:clientWidth={width}>
  <h3 id="cities-chart-title" class="sub-titles">Miete pro Quadratmeter in ausgewählten Städten</h3>
  <svg {width} {height}>
    <!-- 4. Design the bars -->
    <g class="bars" bind:this={elementToObserve}>
        {#each data as city, i}
        {#if observer && observer.isVisible}
          <rect
            in:fade={{ delay: 300 * i, duration: 1000 }}
            x={xScale(i) + 2}
            y={yScale(city.rentSqm)}
            width={barWidth * 0.9}
            height={yScale(0) - yScale(city.rentSqm)} />
          <text
          in:fade={{ delay: 300 * i, duration: 1000 }}
            class="chart-description"
            x={xScale(i) + barWidth / 2}
            y={yScale(city.rentSqm) - 5}
            >
            {city.rentSqm} €
          </text>
        {/if}
        {/each}
    </g>
    <!-- Design y axis -->
    <g class="axis y-axis">
      {#each yTicks as tick}
        <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
          <line x2="100%" />
          <text y="-4"
            >{tick}</text>
        </g>
      {/each}
    </g>

    <!-- Design x axis -->
    <g class="axis x-axis">
      {#each data as city, i}
        <g class="tick" transform="translate({xScale(i)}, {height})">
          <text x={barWidth / 2} y="-4">
            {city.name}</text>
        </g>
      {/each}
    </g>
  </svg>
</div>

<style>
  .x-axis .tick text {
    text-anchor: middle;
    color: black;
  }

  .bars rect {
    fill: #ca3f2d;
    stroke: none;
  }

  .tick {
    font-family: Poppins, sans-serif;
    font-size: 0.725em;
    font-weight: 200;
    color: black;
  }

  .tick text {
    fill: black;
    text-anchor: start;
    color: black;
  }

  .tick line {
    stroke: #2db8ca;
    stroke-dasharray: 2;
    opacity: 1;
  }

  .tick.tick-0 line {
    display: inline-block;
    stroke-dasharray: 0;
  }

  .chart-description {
    text-anchor: middle;
    fill: black;
    font-weight: 700;
    font-size: 0.8rem;
  }

  #cities-chart-title {    
    text-align: center;
  }
</style>