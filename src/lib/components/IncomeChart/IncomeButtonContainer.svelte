<script>
    export let handleIncomeClick;
    export let incomeLevels = [];
    export let selectedIndex = -1;
</script>

<div class="income-container">
    <p class="income-title">Wähle das monatliche Nettoeinkommen:</p>
    <div class="income-buttons-container">
        {#each incomeLevels as level, index}
            <button 
                class="income-button"
                class:selected={index === selectedIndex}
                on:click={() => handleIncomeClick(index)}
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
        border-color: red;
        cursor: pointer;
        transform: translateX(5px);
        background-color: #fff5f5;
    }

    .income-title {
        text-align: left;
        margin-bottom: 0.7rem;
        width: 100%;
        display: block;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        font-weight: 700;
    }
</style> 