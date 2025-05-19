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

<figure class="chart-article-container-2" aria-labelledby="income-title" aria-describedby="income-description">
    <figcaption id="income-title" class="sub-titles">Anteil der Miete am Haushaltseinkommen:</figcaption>
    <p id="income-description" class="sr-only">Dieser Chart zeigt den Anteil der Miete am Haushaltseinkommen</p>
    <p class="income-percentage" aria-live="polite">
        <span class:high={percentage >= 30}>{displayPercentage}%</span>
    </p>
    <div class="money-icon-grid" role="group" aria-label="Geld Icons die den Anteil an der Miete repräsentieren.">
        {#each moneyIcons as { isColored }}
            <div class="icon-wrapper" aria-hidden="true">
                <MoneyIcon {isColored} />
            </div>
        {/each}
    </div>
    <p class="sr-only">Prozentualer Anteil des Einkommens für die Miete: {displayPercentage}%</p>
</figure>

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

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    @media (max-width: 1200px) {
        .money-icon-grid {
            grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
            width: 90%;
            margin: 0 auto;
        }

    }
</style>

