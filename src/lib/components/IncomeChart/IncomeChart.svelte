<script>
    import PersonIconContainer from './PersonIconContainer.svelte';
    import MoneyIconContainer from './MoneyIconContainer.svelte';
    import IncomeButtonContainer from './IncomeButtonContainer.svelte';
    import IncomeArticle from './IncomeArticle.svelte';
    import { onMount } from 'svelte';

    let percentage = $state(0);
    let displayPercentage = $state("");
    let selectedHousehold = $state(0);
    let selectedIncome = $state(0);
    let displayIncome = $state("");

    const totalIcons = 100;
    const coloredIcons = $derived(Math.round(totalIcons * (percentage / 100)));
    
    const data = {
        "onePerson": {
            "rentPercentage": [44, 28, 23, 20, 16],
            "incomeLevels": ["unter 1.500€", "1.500–2000€", "2.000€ - 3.000€", "3.000€ - 4.000€", "Über 4.000€"]
        },
        "twoPersons": {
            "rentPercentage": [44, 30, 23, 19, 16],
            "incomeLevels": ["unter 1.500€", "1.500–2000€", "2.000€ - 3.000€", "3.000€ - 4.000€", "Über 4.000€"]
        },
        "threePersons": {
            "rentPercentage": [49, 34, 26, 20, 16],
            "incomeLevels": ["unter 1.500€", "1.500–2000€", "2.000€ - 3.000€", "3.000€ - 4.000€", "Über 4.000€"]
        },
        "fourPersons": {
            "rentPercentage": [58, 37, 28, 22, 17],
            "incomeLevels": ["unter 1.500€", "1.500–2000€", "2.000€ - 3.000€", "3.000€ - 4.000€", "Über 4.000€"]
        }
    };

    const householdSizes = ["onePerson", "twoPersons", "threePersons", "fourPersons"];

    const handleIconClick = (index) => {
        selectedHousehold = index;
        updatePercentage();
    }

    const handleIncomeClick = (index) => {
        selectedIncome = index;
        displayIncome = data[householdSizes[selectedHousehold]].incomeLevels[selectedIncome];
        updatePercentage();
    }

    const updatePercentage = () => {
        const household = householdSizes[selectedHousehold];
        percentage = data[household].rentPercentage[selectedIncome];
        displayPercentage = percentage.toFixed(0).replace('.', ',');
    }

    onMount(() => {
        selectedHousehold = 0; 
        selectedIncome = 2; 
        displayIncome = data[householdSizes[selectedHousehold]].incomeLevels[selectedIncome];
        updatePercentage();
    });
</script>
<section class="einkommen">
    <h2 class="title-einkommen">Wieviel vom Einkommen geht für die Miete drauf?</h2>
    <div class="income-chart-container">
        <div class="controls-container separator">
            <PersonIconContainer 
                {handleIconClick} 
                selectedIndex={selectedHousehold}
            />
            <IncomeButtonContainer 
                {handleIncomeClick} 
                incomeLevels={data[householdSizes[selectedHousehold]].incomeLevels}
                selectedIndex={selectedIncome}
            />
        </div>
        <div class="separator">
            <MoneyIconContainer 
                {coloredIcons} 
                {displayPercentage} 
                {displayIncome} 
                {percentage}
            />
        </div>
        <div>
            <IncomeArticle />
        </div>   
    </div>
</section>  

<style>

    .title-einkommen {
        margin: 3rem auto;
        width: 100%;
        text-align: center;
    }

    .income-chart-container {
        display: flex;
        width: 100%;
        max-width: 1200px;
        margin: 5rem auto;
        gap: 2rem;
        justify-content: space-between;
    }

    .separator {
        border-right: 1px solid #ccc;
    }

    .income-chart-container > div {
        flex-basis: 33%;
        min-width: 400px;
    }

   :global(.sub-titles) {
        font-size: 1.2rem;
        margin-bottom: 1.8rem;
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        padding-left: 0.3rem;
    }

    .income-article {
        width: 100%;
        padding: 0;
        margin: 0;
    }

    .legende {
        background-color: #f4f4f4;
        border-left: 4px solid #888;
        padding: 1rem 1.5rem;
        margin-top: 2rem;
        border-radius: 6px;
        font-size: 0.95rem;
        line-height: 1.6;
        }

    .legende h4 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        font-weight: 600;
        }

    .legende p {
        margin: 0.5rem 0;
    }

    :global(.sub-titles) {
        text-align: center;
    }

    @media (max-width: 768px) {
        .income-chart-container {
            flex-direction: column;
        }

        .title-einkommen {
            width: 90%;
        }

        .einkommen {
            width: 95%;
            margin: 0 auto;
        }

        .income-chart-container > div {
            min-width: auto;
        }

        .income-article {
            padding: 1rem;
        }

    }

    



</style>        