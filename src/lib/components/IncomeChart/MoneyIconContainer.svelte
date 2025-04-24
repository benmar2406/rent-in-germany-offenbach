<script>
    import MoneyIcon from './MoneyIcon.svelte';
    export let coloredIcons = 0;
    export let percentage = 0;
    export let displayPercentage = "";
    const totalIcons = 100;

    $: moneyIcons = Array(totalIcons).fill(null).map((_, index) => ({
        isColored: index < coloredIcons
    }));
</script>

<div class="chart-article-container-2">
    <p id="income-title" class="sub-titles">Anteil der Miete am Haushaltseinkommen:</p>
    <div class="money-icon-grid">
        {#each moneyIcons as { isColored }}
            <div class="icon-wrapper">  
                <MoneyIcon {isColored} />
            </div>
        {/each}
    </div>
    <article class="income-article">
        <p class="rent-percentage-text">Anteil des Einkommens der für die Miete draufgeht:</p>
        <p class="income-percentage" 
            class:high={percentage >= 30}
            >{displayPercentage}%</p>
    </article>
</div>

<style>

    .money-icon-grid {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        gap: 0.7rem;
        width: fit-content;
        align-content:flex-start;
        padding: 0.8rem;
        border: 1px solid #ca3f2d;
        margin: auto;
    }

    .icon-wrapper {
        width: 1.8rem;
        height: 1.8rem;
    }

    .income-percentage {
        font-size: 4rem;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
    }

    .high {
        color: #ca3f2d;
    }

    .rent-percentage-text {
        margin: 1.5rem auto;
    }

    .income-article {
        margin: auto;
        text-align: center;
    }

    #income-title {
        text-align: center;
    }

    @media (max-width: 1200px) {
        .money-icon-grid {
            grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
            width: 90%;
            margin: 0 auto;
        }

        .rent-percentage-text {
            padding: 0 1.7rem;
            text-align: center;
        }

        .income-percentage {
           text-align: center;

        }
    }
</style>

