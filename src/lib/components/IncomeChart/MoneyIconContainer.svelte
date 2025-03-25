<script>
    import MoneyIcon from './MoneyIcon.svelte';
    export let coloredIcons = 0;
    export let percentage = 0;
    export let displayPercentage = "";
    export let displayIncome = "";
    const totalIcons = 100;

    $: moneyIcons = Array(totalIcons).fill(null).map((_, index) => ({
        isColored: index < coloredIcons
    }));
</script>

<div class="chart-article-container-2">
    <p class="income-title">Anteil der Miete am Einkommen:</p>
    <div class="money-icon-container">
        {#each moneyIcons as { isColored }}
            <div class="icon-wrapper">  
                <MoneyIcon {isColored} />
            </div>
        {/each}
    </div>
    <article class="income-article">
        <p>Bei einem Einkommen von {displayIncome} werden für die Miete aufgewendet:</p>
        <p class="income-percentage" 
            class:high={percentage > 30}
            >{displayPercentage}%</p>
    </article>
</div>

<style>
    .chart-article-container-2 {
        padding: 1rem;
        padding-left: 3rem;
        margin-top: 0;
    }

    .money-icon-container {
        display: grid;
        grid-template-columns: repeat(20, 1fr);
        gap: 0.3rem;
        align-content:flex-start;
        width: fit-content;
        margin: 2rem auto;
        margin-bottom: 1rem;
        padding: 1rem;
        border: 1px solid red;
    }

    .icon-wrapper {
        width: 2rem;
        height: 2rem;
    }

    .income-article {
        margin-top: 0.5rem;
    }

    .income-percentage {
        font-size: 4rem;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
    }

    .high {
        color: red;
    }
</style>

