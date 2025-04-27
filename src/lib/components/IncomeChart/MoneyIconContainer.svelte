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
        <p class="income-percentage" 
            class:high={percentage >= 30}
            >{displayPercentage}%</p>
    <div class="money-icon-grid">
        {#each moneyIcons as { isColored }}
            <div class="icon-wrapper">  
                <MoneyIcon {isColored} />
            </div>
        {/each}
    </div>
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
        text-align: center;
        margin-top: 2.8rem;
        margin-bottom: 1.0rem;
    }

    .high {
        color: #ca3f2d;
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

    }
</style>

