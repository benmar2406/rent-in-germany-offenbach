<script>
    import { fade } from 'svelte/transition';

    let { stepIndex = 0 } = $props();
    let index = $state(0);
    let showChart = $state(false);
    let divSize = $state(100);
    let animationFinished = $state(false)

  // availableSqm is calculated from the sqm price to how much sqm you would get in 2018 or today for the same price of 11.40 €
  const steps = [
        { year: 2010, pricePerSqm: 11.49, availableSqm: 1 },
        { year: 2018, pricePerSqm: 16.78, availableSqm: +(11.49 / 16.78).toFixed(2) },
        { year: 2025, pricePerSqm: 19.58, availableSqm: +(11.49 / 19.58).toFixed(2) }
    ];

    $effect(() => {
        if (stepIndex > 0) {
            index = stepIndex - 1;
            showChart = true;
            divSize = 100 * Math.sqrt(steps[index].availableSqm);}  
    });

</script>

{#if showChart}
    <div class="sqm-chart-container" in:fade>
        <p class="qm-2010"> Quadratmeterpreis 2010: {steps[0].pricePerSqm} €</p>
        <div class="sqm-2018">
            <div 
                class="sqm-chart"
                style:width={`${divSize}%`}
                style:height={`${divSize}%`}>
                <p>{steps[index].year} bekommt man für<br> 11,49 €: {steps[index].availableSqm} qm</p>
            </div>
        </div>
        <p class="qm-2010">Frankfurt a.M.</p>
    </div>
{/if}

<style>
  .sqm-chart-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);
    text-align: center;
    top: 50%;
    left: 50%;
  }
  .sqm-chart-container p {
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    line-height: 1.2rem;
  }

  .qm-2010 {
    color: #333333;
    text-shadow: white 0.2em 0.3em 0.4em;
    padding-bottom: 0.3rem;
  }
  
  .sqm-2018 {
    border: solid 1px #333333;
    border-radius: 5%;
    text-align: center;
    width: 300px;
    height: 300px;
    display: flex;
    align-items: end;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

  .sqm-chart {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: width 0.3s, height 0.3s;
    border-radius: 5%;
    transition: all 1.2s ease;
    box-shadow: 10px -7px 20px rgba(0, 0, 0, 0.2);
    background: rgba(51, 51, 51, 0.9);
  }

    .sqm-chart p { 
        padding: 2rem;
    }   
</style>
