<script>
    import PersonIconContainer from './PersonIconContainer.svelte';
    import MoneyIconContainer from './MoneyIconContainer.svelte';
    import IncomeButtonContainer from './IncomeButtonContainer.svelte';
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
            <article class="income-article">
                <h3 class="sub-titles">Wie viel vom Einkommen bleibt zum Leben?</h3>

                <p>Im Jahr 2022 gaben Haushalte in Deutschland durchschnittlich <strong>27,8 % ihres Nettoeinkommens</strong> für die Bruttokaltmiete aus. Wer <strong>nach 2019</strong> eine Wohnung neu angemietet hat, musste mit <strong>29,5 %</strong> deutlich mehr einplanen – in Großstädten lag die Quote sogar bei <strong>30,8 %</strong>.</p>

                <p>Besonders stark betroffen sind Haushalte mit geringem Einkommen: Sie wenden oft <strong>über 40 %</strong> ihres Budgets allein für die Miete auf. Insgesamt traf das im Jahr 2022 auf rund <strong>3,1 Millionen Haushalte</strong> zu – darunter <strong>1,5 Millionen</strong>, bei denen die Mietkosten sogar die Hälfte des Einkommens überschritten.</p>

                <p>Auch die Haushaltsgröße spielt eine Rolle: <strong>Einpersonenhaushalte</strong> gaben im Schnitt <strong>32,7 %</strong> ihres Einkommens für Miete aus, während größere Haushalte anteilig weniger zahlten. Entscheidend bleibt jedoch: Wer weniger verdient, ist stärker belastet – unabhängig von der Haushaltsform.</p>

                <div class="legende">
                    <h4>Begriffe erklärt</h4>
                    <p><strong>Bruttokaltmiete</strong>: Die Miete inklusive kalter Nebenkosten wie Müllabfuhr, Hausmeister oder Allgemeinstrom – jedoch ohne Heiz- und Wasserkosten.</p>
                    <p><strong>Mietbelastung</strong>: Der Anteil der Bruttokaltmiete am monatlichen Haushaltsnettoeinkommen – also wie viel Prozent des Einkommens für Miete aufgewendet werden müssen.</p>
                </div>
            </article>
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