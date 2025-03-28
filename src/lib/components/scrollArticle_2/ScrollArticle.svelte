<script>
	/* By Connor Rothschild https://twitter.com/CL_Rothschild
	Scrollytelling component from Russell Goldenberg https://twitter.com/codenberg/status/1432774653139984387 
  (Styling of source component adjusted)*/
	
  import Scrolly from "./Scrolly.svelte";
  	
  let value;

  const steps = [
		"<p>Nehmen wir ein Einkommen von 2.000 € netto im Monat. Bei einer Mietbelastung von 30 % bleiben 1.400 € zum Leben. Klingt okay? Davon gehen aber noch Strom, Heizung, Lebensmittel, ÖPNV, Versicherungen und vieles mehr ab. In der Realität wird’s oft knapp – oder es muss an anderen Stellen gespart werden.</p>",
    "<p>Manche weichen ins Umland aus – dort sind die Mieten (noch) günstiger. Aber das hat seinen Preis: längere Pendelzeiten, höhere Mobilitätskosten, weniger Infrastruktur. Und wenn alle das machen, steigen auch dort die Preise. Ein Kreislauf beginnt.</p>",
    "<p>Mehr sozialer Wohnungsbau, Mietpreisbremsen, Förderung für Neubauprojekte – viele Maßnahmen werden diskutiert. Doch Entspannung ist bisher nicht in Sicht. Was bleibt, ist die Frage:</p>",
  ];
</script>

<section class="scroll-section">
    <div class="background-image"></div>
    <div class="section-container">
      <div class="steps-container">
        <Scrolly bind:value>
          {#each steps as text, i}
            <div class="step" class:active={value === i}>
              <div class="step-content">{@html text}</div>
            </div>
          {/each}
        </Scrolly>
      </div>
    </div>
</section>
  

<style>
	:global(body) {
		overflow-x: hidden;
	}

  .background-image {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url('/images/citystreet.jpg'); 
    background-size: cover;
    background-position: center;
    z-index: -1; 
    }

  .section-container {
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
    display: flex;
  }

  .step {
    height: 80vh;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  .step-content {
    font-size: 1rem;
    background: whitesmoke;
    color: #ccc;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 500ms ease;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .2);
    text-align: left;
    width: 75%;
    margin: auto;
    max-width: 500px;
  }

	.step.active .step-content {
		background: white;
		color: black;
	}
	
  .steps-container {
    height: 100%;
  }

  .steps-container {
    flex: 1 1 40%;
    z-index: 10;
  }
	
/* Comment out the following line to always make it 'text-on-top' */
  @media screen and (max-width: 768px) {
    .section-container {
      flex-direction: column-reverse;
    }

    .step {
    height: 95vh;
  }
  }
</style>
