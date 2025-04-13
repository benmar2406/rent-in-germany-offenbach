<script>
  import { onMount } from 'svelte';
  import { scaleLinear } from 'd3-scale';
  import { fade, fly } from 'svelte/transition';
  import { useVisibilityObserver } from '$lib/customHooks/useVisibilityObserver.svelte';

  let observer = $state();
  let elementToObserve;
  let selectedIndex = $state();
  let animationKey = $state(0);
  let selectedButton = $state(false);
  let mobile = $state(false);

  onMount(() => {
        observer = useVisibilityObserver(elementToObserve);
        mobile = window.innerWidth < 1120; 
    });

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

  const sortAlphabetically = (index) => {
  data = [...data].sort((a, b) => a.name.localeCompare(b.name, 'de'));
  selectedIndex = index;
  console.log("selectedIndex " + selectedIndex)

};

const sortDescending = (index) => {
  data = [...data].sort((a, b) => b.rentSqm - a.rentSqm);
};

const sortAscending = (index) => {
  data = [...data].sort((a, b) => a.rentSqm - b.rentSqm);

};

  const triggerAnimation = (sortFn, index) => {
    if (index !== selectedIndex) {
      sortFn();   
      selectedIndex = index;       
      animationKey += 1;  // trigger re-render with new key
    }
  }

  const buttons = [
    {text: "⬇", function: (i) => triggerAnimation(sortDescending, i)},
    {text: "⬆", function: (i) => triggerAnimation(sortAscending, i)},
    {text: "A-Z", function: (i) => triggerAnimation(sortAlphabetically, i)},
  ]

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
              x={mobile ? xScale(i) - barWidth : xScale(i) + barWidth / 2}
              y={yScale(mobile ? city.rentSqm - 0.5 : city.rentSqm + 0.5)}
              transform={mobile ? `rotate(90 ${xScale(i) + 6} ${yScale(city.rentSqm) + barWidth * 0.45})` : ""}
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
            x={mobile ? "-60" : barWidth / 2} 
            y={mobile ? "+10" : "-4"}
            transform={mobile ? `rotate(90 ${barWidth / 2} 7)` : ""}
            text-anchor={mobile ? "start" : "middle"}
            >
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

  @media screen and (max-width: 1200px) {
        
  .chart-description {
    font-size: 0.5rem;
  }

  .x-ticks {
    color: white;
  }
}

</style>