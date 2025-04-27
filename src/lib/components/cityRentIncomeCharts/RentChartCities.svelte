<script>
  import { onMount } from 'svelte';
  import { scaleLinear } from 'd3-scale';
  import { fade } from 'svelte/transition';
  import { useVisibilityObserver } from '$lib/customHooks/useVisibilityObserver.svelte';

  let observer = $state();
  let elementToObserve;
  let { data, sortAlphabetically, sortDescending, sortAscending, triggerAnimation, buttons, smallScreen, selectedIndex, animationKey } = $props()


  onMount(() => {
    observer = useVisibilityObserver(elementToObserve);
  });

  // 2. Dimensions, Margins & Scales

  // Data for plotting x-y axis
  const yTicks = [0, 5, 10, 15, 20, 25];
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  let width = $state(800);
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


</script>

<div class="chart" bind:clientWidth={width}>
  <h3 id="cities-chart-title" class="sub-titles">Miete pro Quadratmeter in ausgewählten Städten</h3>
  
  <div class="button-container">
    {#each buttons as button, index}
    <button 
      onclick={() => button.function(index)}
      class:selected={index === selectedIndex}
      >{button.text}
    </button>
    {/each}
  </div>

  <svg {width} {height}>
    <!-- 4. Design the bars -->
    <g class="bars" bind:this={elementToObserve}>
      {#each data as city, i}
        {#key animationKey}
          {#if (observer && observer.isVisible)}
            <rect
              transition:fade|global={{ delay: 300 * i, duration: 500 }}
              x={xScale(i) + 2}
              y={yScale(city.rentSqm)}
              width={barWidth * 0.9}
              height={yScale(0) - yScale(city.rentSqm)} />
            <text
              transition:fade|global={{ delay: 300 * i, duration: 500 }}
              class="chart-description"
              x={smallScreen.current ? xScale(i) - barWidth : xScale(i) + barWidth / 2}
              y={yScale(smallScreen.current ? city.rentSqm - 0.5 : city.rentSqm + 0.5)}
              transform={smallScreen.current ? `rotate(90 ${xScale(i) + 6} ${yScale(city.rentSqm) + barWidth * 0.45})` : ""}
            >
            {city.rentSqm.toString().replace(".", ",")} €  
            </text>
          {/if}
        {/key}
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
          <text 
            class="x-ticks"
            x={smallScreen.current ? "-60" : barWidth / 2} 
            y={smallScreen.current ? "+10" : "-4"}
            transform={smallScreen.current ? `rotate(90 ${barWidth / 2} 7)` : ""}
            text-anchor={smallScreen.current ? "start" : "middle"}
            >
            {city.name}</text>
        </g>
      {/each}
    </g>
  </svg>
</div>

<style>

  .chart {
    color: white;
    fill: white;
    max-width: 1200px;
    margin: 0 auto;
  }

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
  }

  .tick text {
    text-anchor: start;
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
    font-weight: 700;
    font-size: 0.8rem;
  }

  .mobile {
    font-size: 0.5rem;
  }

  #cities-chart-title {    
    text-align: center;
  }

  .button-container {
    height: 2rem;
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 2rem;
  }

  button {
    color: white;
  }

  @media screen and (max-width: 1200px) {
        
  .chart-description {
    font-size: 0.5rem;
  }
}



</style>