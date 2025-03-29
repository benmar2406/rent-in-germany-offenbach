<script>
    export let handleIncomeClick;
    export let incomeLevels = [];
    export let selectedIndex = -1;
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
        padding: 1rem;
        height: fit-content;
        width: 95%;
        margin: auto;
    }
    
    .income-buttons-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
        margin-top: 1rem;
    }

    .income-button {
        padding: 0.8rem 1.2rem;
        border: 2px solid #000;
        border-radius: 8px;
        background: white;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
        width: 100%;
        text-align: left;
    }

    .income-button:hover, .income-button.selected {
        border-color: #ca3f2d;
        cursor: pointer;
        transform: translateX(5px);
        background-color: #fff5f5;
    }

    @media (max-width: 768px) {
        .income-button {
            padding: 0.6rem 0.8rem;
            margin: 0 auto;
            width: 90%;
        }

        .income-container {
            margin: 0;
            border-left: solid 1px grey;
        }

        .income-container {
            padding: 0.5rem;
            height: fit-content;
            margin: auto;
    }

    }

</style> 