<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    
    const onePerson = `${base}/images/income-chart/one.png`;
    const twoPersons = `${base}/images/income-chart/two.png`;
    const threePersons = `${base}/images/income-chart/three.png`;
    const fourPersons = `${base}/images/income-chart/four.png`;

    const iconsArray = [[onePerson, "Eine Person"], [twoPersons, "Zwei Personen"], [threePersons, "Drei Personen"], [fourPersons, "ab 4 Personen"]];

    let { handleIconClick, selectedIndex } = $props();
    
</script>

<figure class="household-container" aria-labelledby="haushaltsgroesse-title">
    <figcaption class="sub-titles" id="haushaltsgroesse-title">Wähle die Haushaltsgröße aus:</figcaption>
    <div class="person-icons-grid" role="group" aria-label="Household size options">
        {#each iconsArray as icon, index}
            <div class="icon-container-wrapper">
                <button
                    class="icon-container"
                    class:selected={index === selectedIndex}
                    onclick={() => handleIconClick(index)}
                    onkeydown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleIconClick(index);
                        }
                    }}
                    aria-pressed={index === selectedIndex}
                    aria-label={`Select household size: ${icon[1]}`}
                >
                    <img src={icon[0]} alt="" aria-hidden="true" />
                </button>
                <p class="household-size-text">{icon[1]}</p>
            </div>
        {/each}
    </div>
</figure>


<style>
    .household-container {
        padding: 0 0.1rem;
        margin: 0 0.1rem;
        margin-bottom: 2rem;
        height: fit-content;
        width: 100%;
    }
    
    .person-icons-grid {
        display: flex;
        justify-content: center;
        align-items: start;
        gap: 0.2rem;
        width: 100%;
        height: fit-content;
        margin-top: 1rem auto;
        margin: auto;
    }

    .person-icons-grid > div {
        flex-basis: 33%;
        padding: 0.1rem;
    }

    .icon-container {
        width: 3.5rem;
        height: 3.5rem;
        border: 3px solid white;
        background-color: transparent;
        border-radius: 50%;
        padding: 0.4rem;
        margin: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.3s ease;
    }

    .icon-container:hover, .icon-container.selected {
        border-color: #ca3f2d;
        cursor: pointer;
    }

    .icon-container img {
        padding: 0.2rem;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }  

    .household-size-text {
        text-align: center;
        margin-top: 0.1rem;
        font-family: 'Poppins', sans-serif;
        font-size: 0.7rem;
        font-weight: 700;
        line-height: 0.8rem;
        width: 3rem;
        margin: auto;
    }

    .icon-container-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    

    @media screen and (max-width: 1200px) {
        .person-icons-grid {
            align-items: start;
            justify-content: center;
            flex-wrap: wrap;
            max-width: 360px;
        }
    }

</style>