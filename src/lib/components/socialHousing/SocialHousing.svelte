<script>
    import SocialHousingChart from "./SocialHousingChart.svelte";
    import PopulationChart from "./PopulationChart.svelte";
    import SocialHousingArticle from "./SocialHousingArticle.svelte";

    let homelessPeople = $state(330000);
    let selectedIndex = $state(0);
    let selectedCityIndex = $state(0)
    let selectedCity = $state('Offenbach');
    let factor = $state(50);

    let socialHouses = $state(5348); 
    let totalIcons = $derived(socialHouses / factor) // 2.5 million social houses / appartments
    let houseIcons = $derived(Array.from({ length: totalIcons }, (_, index) => ({
        index
    })));

    let totalIconsPeople = $derived(homelessPeople / 10000) 
    let peopleIconsArray = $derived(Array.from({ length: totalIconsPeople }, (_, index) => ({
        index
    })));

    let cityButtons = ["Offenbach", "Deutschland"]
    let yearsButtons = [2000, 2024]
    let factors = [50, 10000]

    let cities = {
        Offenbach:
            [
                { year: 2000, apartments: 5348, homelessPopulation: 330000 },
                { year: 2024, apartments: 3328, homelessPopulation: 531600 }
            ],
        Deutschland:
            [
                { year: 2000, apartments: 2500000, homelessPopulation: 330000 },
                { year: 2024, apartments: 1100000, homelessPopulation: 531600 }
            ],
    }

    $inspect(socialHouses)

    const handleYearClick = (index) => {
        selectedIndex = index;
        socialHouses = cities[selectedCity][index].apartments;
        homelessPeople = cities[selectedCity][index].homelessPopulation;
    }

    const handleCityClick = (index) => {
        selectedCityIndex = index;
        selectedCity = cityButtons[index];
        factor = factors[index]
        handleYearClick(selectedIndex)
    }

</script>


<section class="social-housing-section">
    <h2>Sozialer Wohnungsbau im Rückgang</h2>
    <div class="button-container">
        {#each cityButtons as button, index}
        <button 
          onclick={() => handleCityClick(index)}
          class:selected={index === selectedCityIndex}
          >{button}
        </button>
        {/each}
    </div>
    <div class="button-container">    
        {#each yearsButtons as button, index}
        <button 
          onclick={() => handleYearClick(index)}
          class:selected={index === selectedIndex}
          >{button}
        </button>
        {/each}
    </div>
    <div class="grid-layout">
        <SocialHousingChart {houseIcons} {socialHouses} {factor}/>
        <PopulationChart {homelessPeople} {peopleIconsArray} />
    </div>
    <SocialHousingArticle/>
</section>

<style>
    .social-housing-section {
        background-color: #333333;
        margin:  auto;
        padding-top: 2rem;
        padding-bottom: 4rem;
        color: white;
    }

    .social-housing-section h2 {
        width: 90%;
        margin: auto;
    }

    .grid-layout {
        display: grid;
        grid-template-columns: 1fr 1fr; 
        width: 85%;
        margin: auto;
        gap: 0.8rem;
        min-height: 400px;

    }

    .button-container {
        margin: 3rem auto;
        margin-bottom: 1rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

  .button-container button {
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .button-container button:hover, button.selected {
    color: #ca3f2d;
  }

 @media screen and (max-width: 760px) {
    .grid-layout {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        width: 100%;
    }
  }

  @media screen and (max-width: 1150px) {
    .grid-layout {
        width: 95%;
    }
  }
</style>
