<script>
    import RentChart from "./RentChart.svelte";
    import RentMap from "./RentMap.svelte";
    import { useVisibilityObserver } from '$lib/customHooks/useVisibilityObserver.svelte';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    
    const data = [
      { "Jahr": 1995, "Mietpreisindex": 85.0, "Reallohnindex": null },
      { "Jahr": 1996, "Mietpreisindex": 87.6, "Reallohnindex": null },
      { "Jahr": 1997, "Mietpreisindex": 89.7, "Reallohnindex": null },
      { "Jahr": 1998, "Mietpreisindex": 90.9, "Reallohnindex": null },
      { "Jahr": 1999, "Mietpreisindex": 91.6, "Reallohnindex": null },
      { "Jahr": 2000, "Mietpreisindex": 92.8, "Reallohnindex": null },
      { "Jahr": 2001, "Mietpreisindex": 93.8, "Reallohnindex": null },
      { "Jahr": 2002, "Mietpreisindex": 95.0, "Reallohnindex": null },
      { "Jahr": 2003, "Mietpreisindex": 96.1, "Reallohnindex": null },
      { "Jahr": 2004, "Mietpreisindex": 96.9, "Reallohnindex": null },
      { "Jahr": 2005, "Mietpreisindex": 97.8, "Reallohnindex": null },
      { "Jahr": 2006, "Mietpreisindex": 98.8, "Reallohnindex": null },
      { "Jahr": 2007, "Mietpreisindex": 100.0, "Reallohnindex": 100.0 },
      { "Jahr": 2008, "Mietpreisindex": 101.3, "Reallohnindex": 100.3 },
      { "Jahr": 2009, "Mietpreisindex": 102.4, "Reallohnindex": 100.1 },
      { "Jahr": 2010, "Mietpreisindex": 103.6, "Reallohnindex": 101.6 },
      { "Jahr": 2011, "Mietpreisindex": 104.9, "Reallohnindex": 102.8 },
      { "Jahr": 2012, "Mietpreisindex": 106.0, "Reallohnindex": 103.4 },
      { "Jahr": 2013, "Mietpreisindex": 107.5, "Reallohnindex": 103.3 },
      { "Jahr": 2014, "Mietpreisindex": 109.1, "Reallohnindex": 105.0 },
      { "Jahr": 2015, "Mietpreisindex": 110.5, "Reallohnindex": 107.4 },
      { "Jahr": 2016, "Mietpreisindex": 111.8, "Reallohnindex": 109.3 },
      { "Jahr": 2017, "Mietpreisindex": 113.4, "Reallohnindex": 110.4 },
      { "Jahr": 2018, "Mietpreisindex": 115.0, "Reallohnindex": 111.9 },
      { "Jahr": 2019, "Mietpreisindex": 116.7, "Reallohnindex": 113.1 },
      { "Jahr": 2020, "Mietpreisindex": 118.3, "Reallohnindex": 111.7 },
      { "Jahr": 2021, "Mietpreisindex": 120.0, "Reallohnindex": 111.7 },
      { "Jahr": 2022, "Mietpreisindex": 122.1, "Reallohnindex": 107.2 },
      { "Jahr": 2023, "Mietpreisindex": 124.7, "Reallohnindex": 107.3 },
      { "Jahr": 2024, "Mietpreisindex": 127.5, "Reallohnindex": 110.6 }
]
  let elementToObserve = $state();
  let observer = $state(); 

  onMount(() => {
    observer = useVisibilityObserver(elementToObserve, { offset: '-200px' });
  });
</script>

<section class="map-article-container-1">
    <RentMap />
    <div class="article-container-1" >
      <article class="intro-article">
        <h2>Stadt oder Land – eine Frage des Preises? </h2>
        <p>Ein Blick auf die Mietpreise zeigt: In urbanen Zentren wie dem Rhein-Maingebiet sind die Kosten pro Quadratmeter oft doppelt so hoch wie in ländlichen Regionen. Während in Großstädten das Wohnen zur finanziellen Belastung wird, bleibt es auf dem Land für viele noch erschwinglich.</p>
        <p>Gleichzeitig wächst die Schere zwischen Löhnen und Mieten: In vielen Städten steigen die Mietpreise deutlich schneller als die Einkommen.</p>
      </article>
      <div bind:this={elementToObserve}>
        {#if observer && observer.isVisible}  
        <div 
            in:fade={{ duration: 700 }}>
            <RentChart {data} />
          </div> 
        {/if}
    </div>     
    </div>
  </section>


<style>

  .map-article-container-1 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    margin: 0;
    min-height: 100vh;
    height: fit-content
  }

  .intro-article {
    width: 90%;
    max-width: 700px;
    height: fit-content;
    padding-bottom: 0;
  }

  .intro-article h2 {
    text-align: left;
  }

  article {
    height: 100%;
    overflow-y: auto;
  }

  @media (max-width: 900px) {

    .map-article-container-1 {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .intro-article {
      margin: 0;
    } 
  } 
</style>