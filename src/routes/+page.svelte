<script>
  import ScrollProgress from '$lib/components/ScrollProgress.svelte';
  import MapSection from '$lib/components/mapSection/MapSection.svelte';
  import CityRentIncomeContainer from '$lib/components/cityRentIncomeCharts/CityRentIncomeContainer.svelte';
  import IncomeChart from '$lib/components/IncomeChart/IncomeChart.svelte';
  import SocialHousing from '$lib/components/socialHousing/SocialHousing.svelte';
  import ScrollArticle1 from '$lib/components/IntroSection/scrollArticle_1/ScrollArticle1.svelte';
  import ScrollArticle from '$lib/components/scrollArticle_2/ScrollArticle.svelte';
  import Conclusion from '$lib/components/Conclusion.svelte';
</script>

<ScrollProgress />
<main>
  <ScrollArticle1 />
  <IncomeChart />
  <SocialHousing />
  <MapSection />
  <CityRentIncomeContainer/>
  <ScrollArticle />
  <Conclusion />
</main>

<style>
  main {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
</style>
