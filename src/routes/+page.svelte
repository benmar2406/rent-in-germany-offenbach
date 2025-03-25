<script>
  import RentMap from '$lib/components/RentMap.svelte';
  import RentChart from '$lib/components/RentChart.svelte';
  import IncomeChart from '$lib/components/IncomeChart/IncomeChart.svelte';

  const data = [
    { "Jahr": 1991, "Mietpreisindex": 56.7, "Reallohnindex": 93 },
    { "Jahr": 1992, "Mietpreisindex": 62.5, "Reallohnindex": 97.9 },
    { "Jahr": 1993, "Mietpreisindex": 69, "Reallohnindex": 97.8 },
    { "Jahr": 1994, "Mietpreisindex": 72.6, "Reallohnindex": 96.9 },
    { "Jahr": 1995, "Mietpreisindex": 75.6, "Reallohnindex": 98.1 },
    { "Jahr": 1996, "Mietpreisindex": 78.2, "Reallohnindex": 97.9 },
    { "Jahr": 1997, "Mietpreisindex": 81.7, "Reallohnindex": 96 },
    { "Jahr": 1998, "Mietpreisindex": 83.6, "Reallohnindex": 95.8 },
    { "Jahr": 1999, "Mietpreisindex": 85.8, "Reallohnindex": 96.5 },
    { "Jahr": 2000, "Mietpreisindex": 87.7, "Reallohnindex": 96.5 },
    { "Jahr": 2001, "Mietpreisindex": 89.6, "Reallohnindex": 96.5 },
    { "Jahr": 2002, "Mietpreisindex": 91.7, "Reallohnindex": 96.5 },
    { "Jahr": 2003, "Mietpreisindex": 93.9, "Reallohnindex": 96.5 },
    { "Jahr": 2004, "Mietpreisindex": 96.1, "Reallohnindex": 95.5 },
    { "Jahr": 2005, "Mietpreisindex": 98.8, "Reallohnindex": 94.3 },
    { "Jahr": 2006, "Mietpreisindex": 101.2, "Reallohnindex": 93.5 },
    { "Jahr": 2007, "Mietpreisindex": 104, "Reallohnindex": 92.8 },
    { "Jahr": 2008, "Mietpreisindex": 106.9, "Reallohnindex": 93.2 },
    { "Jahr": 2009, "Mietpreisindex": 110.5, "Reallohnindex": 93.1 },
    { "Jahr": 2010, "Mietpreisindex": 112.2, "Reallohnindex": 94.5 },
    { "Jahr": 2011, "Mietpreisindex": 114.1, "Reallohnindex": 95.7 },
    { "Jahr": 2012, "Mietpreisindex": 116.3, "Reallohnindex": 96.2 },
    { "Jahr": 2013, "Mietpreisindex": 118.2, "Reallohnindex": 96.1 },
    { "Jahr": 2014, "Mietpreisindex": 120.5, "Reallohnindex": 97.9 },
    { "Jahr": 2015, "Mietpreisindex": 122.1, "Reallohnindex": 100 },
    { "Jahr": 2016, "Mietpreisindex": 124.3, "Reallohnindex": 101.8 },
    { "Jahr": 2017, "Mietpreisindex": 126.5, "Reallohnindex": 102.8 },
    { "Jahr": 2018, "Mietpreisindex": 128.7, "Reallohnindex": 104.1 },
    { "Jahr": 2019, "Mietpreisindex": 130.9, "Reallohnindex": 105.3 },
    { "Jahr": 2020, "Mietpreisindex": 132.3, "Reallohnindex": null },
    { "Jahr": 2021, "Mietpreisindex": 135.5, "Reallohnindex": null },
    { "Jahr": 2022, "Mietpreisindex": 137.9, "Reallohnindex": null }
  ];
</script>

<main>
  <div class="map-article-container-1">
    <RentMap />
    <div>
      <article class="intro-article">
        <h1>Wohnen in der Stadt - ein Luxus?</h1>
        <p>Die Mieten in deutschen Städten steigen seit Jahren rasant, und für viele wird es immer schwieriger, sich ein Zuhause in urbanen Ballungszentren zu leisten. Ob München, Berlin oder Hamburg – die durchschnittlichen Quadratmeterpreise für Mietwohnungen haben teils astronomische Höhen erreicht.</p>
        <p>In Großstädten ist die Miete oft der größte Kostenfaktor, und gerade für junge Menschen oder Familien mit geringeren Einkommen stellt sich die Frage: Wie viel Geld muss man verdienen, um in einer dieser Städte noch wohnen zu können?</p>
      </article>
      <RentChart {data} />
    </div>
  </div>
  <IncomeChart />
</main>

<style>
  main {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  .intro-article {
    width: 90%;
    max-width: 700px;
    height: fit-content;
    padding-bottom: 0.3rem;
  }

  .map-article-container-1 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    margin: 0;
    min-height: 100vh;
  }

  article {
    padding: 2rem;
    height: 100%;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .map-article-container-1 {
      grid-template-columns: 1fr;
      min-height: auto;
    }
    
  
  }
</style>
