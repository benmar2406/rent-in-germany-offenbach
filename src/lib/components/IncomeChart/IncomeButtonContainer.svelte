<script>

    let { handleIncomeClick, incomeLevels, selectedIndex } = $props();
    
</script>

<div class="income-container">
    <h3 id="income-title" class="sub-titles">Wähle das monatliche Nettoeinkommen:</h3>
    <div class="income-buttons-container">
        {#each incomeLevels as level, index}
            <button 
                class="income-button"
                class:selected={index === selectedIndex}
                onclick={() => handleIncomeClick(index)}
            >
                {level}
            </button>
        {/each}
    </div>
</div>

<style>
    .income-container {
        height: fit-content;
        width: 95%;
        padding: 0.1rem;
        margin: 0.1rem;
    }
    
    .income-buttons-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
        margin-top: 1rem;
        margin: auto;
    }

    .income-button {
        padding: 0.8rem 1.2rem;
        border: 2px solid;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
        width: 90%;
        text-align: left;
    }
    

    @media (max-width: 1200px) {
        .income-button {
            padding: 0.6rem 0.8rem;
            margin: 0 auto;
            width: 80%;
        }

        .income-container {
            border-left: solid 1px grey;
        }
    }
</style> 