<script>
    import RentChart from "./RentChart.svelte";
    import RentMap from "./RentMap.svelte";
    import { useVisibilityObserver } from '$lib/customHooks/useVisibilityObserver.svelte';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    
    const data = [
      { "Jahr": 1991, "Mietpreisindex": 56.7, "Reallohnindex": 93 },
      { "Jahr": 1992, "Mietpreisindex": 62.5, "Reallohnindex": 97.9 },
      { "Jahr": 1993, "Mietpreisindex": 69.0, "Reallohnindex": 97.8 },
      { "Jahr": 1994, "Mietpreisindex": 72.6, "Reallohnindex": 96.9 },
      { "Jahr": 1995, "Mietpreisindex": 75.6, "Reallohnindex": 98.1 },
      { "Jahr": 1996, "Mietpreisindex": 78.2, "Reallohnindex": 97.9 },
      { "Jahr": 1997, "Mietpreisindex": 81.7, "Reallohnindex": 96.0 },
      { "Jahr": 1998, "Mietpreisindex": 83.6, "Reallohnindex": 95.8 },
      { "Jahr": 1999, "Mietpreisindex": 85.8, "Reallohnindex": 96.5 },
      { "Jahr": 2000, "Mietpreisindex": 87.7, "Reallohnindex": 96.5 },
      { "Jahr": 2001, "Mietpreisindex": 89.6, "Reallohnindex": 96.5 },
      { "Jahr": 2002, "Mietpreisindex": 91.7, "Reallohnindex": 96.5 },
      { "Jahr": 2003, "Mietpreisindex": 93.9, "Reallohnindex": 96.5 },
      { "Jahr": 2004, "Mietpreisindex": 96.1, "Reallohnindex": 95.5 },
      { "Jahr": 2005, "Mietpreisindex": 98.8, "Reallohnindex": 94.3 },
      { "Jahr": 2006, "Mietpreisindex": 101.2, "Reallohnindex": 93.5 },
      { "Jahr": 2007, "Mietpreisindex": 104.0, "Reallohnindex": 92.8 },
      { "Jahr": 2008, "Mietpreisindex": 106.9, "Reallohnindex": 93.2 },
      { "Jahr": 2009, "Mietpreisindex": 110.5, "Reallohnindex": 93.1 },
      { "Jahr": 2010, "Mietpreisindex": 112.2, "Reallohnindex": 94.5 },
      { "Jahr": 2011, "Mietpreisindex": 114.1, "Reallohnindex": 95.7 },
      { "Jahr": 2012, "Mietpreisindex": 116.3, "Reallohnindex": 96.2 },
      { "Jahr": 2013, "Mietpreisindex": 118.2, "Reallohnindex": 96.1 },
      { "Jahr": 2014, "Mietpreisindex": 120.5, "Reallohnindex": 97.9 },
      { "Jahr": 2015, "Mietpreisindex": 122.1, "Reallohnindex": 100.0 },
      { "Jahr": 2016, "Mietpreisindex": 124.3, "Reallohnindex": 101.8 },
      { "Jahr": 2017, "Mietpreisindex": 126.5, "Reallohnindex": 102.8 },
      { "Jahr": 2018, "Mietpreisindex": 128.7, "Reallohnindex": 104.1 },
      { "Jahr": 2019, "Mietpreisindex": 130.9, "Reallohnindex": 105.3 },
      { "Jahr": 2020, "Mietpreisindex": 132.3, "Reallohnindex": null },
      { "Jahr": 2021, "Mietpreisindex": 135.5, "Reallohnindex": null },
      { "Jahr": 2022, "Mietpreisindex": 137.9, "Reallohnindex": null }
];



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