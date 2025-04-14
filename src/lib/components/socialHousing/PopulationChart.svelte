<script>
    import HumanIcon from './HumanIcon.svelte';
    import { fade } from 'svelte/transition';

    let { homelessPeople, peopleIconsArray } = $props();

</script>

<div class="social-housing-container">
    <h3 class="number-social-housing">Obdachlosigkeit: {homelessPeople.toLocaleString('de-DE')} Menschen betroffen</h3>
    <div class="house-icon-grid">
        {#each peopleIconsArray as person}
            <div class="icon-wrapper" transition:fade={{ duration: 1000 }}>  
                <HumanIcon />
            </div>
        {/each}
    </div>
</div>


<style>   
    .social-housing-container {
        margin: 0.2rem auto;  
    }

    .number-social-housing {
        text-align: center;
        margin: 1.2rem auto;
    }

    .house-icon-grid {
        display: grid;
        grid-template-columns: repeat(15, 1fr);
        gap: 0.2rem;
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
            grid-template-columns: repeat(5, 1fr);
        }
    }
</style>