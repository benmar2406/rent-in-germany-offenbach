<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    
    const onePerson = `${base}/images/income-chart/one.png`;
    const twoPersons = `${base}/images/income-chart/two.png`;
    const threePersons = `${base}/images/income-chart/three.png`;
    const fourPersons = `${base}/images/income-chart/four.png`;

    const iconsArray = [[onePerson, "Eine Person"], [twoPersons, "Zwei Personen"], [threePersons, "Drei Personen"], [fourPersons, "ab 4 Personen"]];

    export let handleIconClick;
    export let selectedIndex = -1;
</script>

<div class="haushaltsgroesse-container">
    <p class="sub-titles class" id="haushaltsgroesse-title">Wähle die Haushaltsgröße aus:</p>
    <div class="person-icons-container">
        {#each iconsArray as icon, index}
            <div class="icon-container-wrapper">
                <button 
                    class="icon-container" 
                    class:selected={index === selectedIndex}
                    on:click={() => handleIconClick(index)}
                    on:keydown={(e) => e.key === 'Enter' && handleIconClick(index)}
                >
                    <img src={icon[0]} alt="Person Icon" />
                </button>
                <p class="household-size-text">{icon[1]}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    .haushaltsgroesse-container {
        padding: 0;
        margin: 0;
        height: fit-content;
        width: 100%;
    }
    
    .person-icons-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
        height: fit-content;
        margin-top: 1rem;
    }

    .icon-container {
        width: 4rem;
        height: 4rem;
        border: 5px solid #000;
        background-color: transparent;
        border-radius: 50%;
        padding: 0.5rem;
        margin: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.3s ease;
    }

    .icon-container:hover, .icon-container.selected {
        border-color: red;
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
    }

    .icon-container-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 768px) {
        .haushaltsgroesse-container {
            margin: auto;
            padding: 0;
        }

        .person-icons-container {
            flex-wrap: wrap;
            width: 70%;
            justify-content: center;
            align-items: center;
            margin: auto;
            margin-bottom: 2rem;
        }

        .person-icons-container > div {
            flex-basis: 40%;
        }
    }

</style>