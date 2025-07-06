<script>
	import { render } from 'svelte/server';
    import HumanIcon from './HumanIcon.svelte';
    import { fade } from 'svelte/transition';

    let { 
            homelessPeople, 
            peopleIconsArray, 
            minHeightHumansGrid, 
            selectedCity,
            noDataDisplay,
            factorHomeless
        } 
    = $props();

</script>

<figure class="social-housing-container">
    <h3 class="number-social-housing">Obdachlosigkeit:<br>
        {selectedCity === "Offenbach" ? "Keine Zahlen vorhanden" : `${homelessPeople.toLocaleString('de-DE')} Menschen betroffen`}</h3>
    <div class="house-icon-grid" style:min-height={minHeightHumansGrid}px role="group" aria-label="Darstellung der Menge an obdachlosen Menschen">
        {#each peopleIconsArray as person}
            <div 
                class="icon-wrapper" 
                transition:fade={{ duration: 1000 }}
                aria-hidden="true">  
                <HumanIcon 
            />
            </div>
        {/each}
    </div>
    {#if noDataDisplay} 
        <aside
            class="no-data-text"
            >
            Für Offenbach liegen für den Zeitraum keine Zahlen vor.
        </aside>
        {/if}
    {#if !noDataDisplay}
        <figcaption>
            <div class="icon-wrapper">  
                <HumanIcon />
            </div>
            <span>= {factorHomeless.toLocaleString("de-DE")} Obdachlose Menschen</span>
        </figcaption>
     {/if}
    </figure>


<style>   
    .social-housing-container {
        margin: 0.2rem auto;  
    }

    .no-data-text {
        white-space: nowrap;
    }

    .number-social-housing {
        text-align: center;
        margin: 1.2rem auto;
    }

    .house-icon-grid {
        display: grid;
        grid-template-columns: repeat(15, 1fr);
        gap: 0.2rem;
        row-gap: 0.5rem;
        align-content:flex-start;
        width: fit-content;
        padding: 0.8rem;
        border: 1px solid #ca3f2d;
        min-height: 160px;
        margin: 0.2rem auto;
    }

    .icon-wrapper {
        width: 1.8rem;
        height: 1.8rem;
    }

      figcaption {
        display: flex;
        width: 100%;
        align-items: center;
    }

    @media screen and (max-width: 1150px) {
        .house-icon-grid {
            grid-template-columns: repeat(10, 1fr);
        }

        .number-social-housing {
            margin-top: 2rem;
        }
    }

    @media screen and (max-width: 750px) {
        .number-social-housing {
            margin-top: 2rem;
        }

        .house-icon-grid {
            grid-template-columns: repeat(10, 1fr);
        }
    }
</style>