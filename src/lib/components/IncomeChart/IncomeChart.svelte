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
        min-width: 390px;
    } 

    @media (max-width: 768px) {
        .income-chart-container {
            flex-direction: column;
            margin-top: 1rem;
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

        .separator {
            border-right: 0;
        }

        .controls-container {
            display: flex;
        }

    }

</style>        