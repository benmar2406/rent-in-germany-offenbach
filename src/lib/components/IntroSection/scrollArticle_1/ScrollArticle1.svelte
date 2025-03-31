<script>
	/* By Connor Rothschild https://twitter.com/CL_Rothschild
	Scrollytelling component from Russell Goldenberg https://twitter.com/codenberg/status/1432774653139984387 */
	
  import { onMount } from 'svelte';
  import Scrolly from "./Scrolly.svelte";
  import RentSqmDevelopment from "./RentSqmDevelopment.svelte";
  	
  let value = $state(0);
  let hideStep = $state(false);
  let targetElement;
  let scrollProgress = $state(0);

  const steps = [
		"<h1 class='main-title'>Wohnen in der Stadt<br><span>Ein Luxus?<span></h1>",
    "<p>Die Mieten in deutschen Städten steigen seit Jahren rasant, und für viele wird es immer schwieriger, sich ein Zuhause in urbanen Ballungszentren zu leisten. Ob München, Berlin oder Hamburg – die durchschnittlichen Quadratmeterpreise für Mietwohnungen haben teils astronomische Höhen erreicht.</p>",
    "<p>In Großstädten ist die Miete oft der größte Kostenfaktor, und gerade für junge Menschen oder Familien mit geringeren Einkommen stellt sich die Frage: Wie viel Geld muss man verdienen, um in einer dieser Städte noch wohnen zu können?</p>",
    "",

  ];

    onMount(() => {
        const handleScroll = () => {
            const scrollTop = targetElement.scrollTop;
            const scrollHeight = targetElement.scrollHeight - targetElement.clientHeight;
            scrollProgress = (scrollTop / scrollHeight) * 100;

        };

        targetElement.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            targetElement.removeEventListener('scroll', handleScroll);
        };
    });

</script>
<section class="scroll-section">
  <div class="background-image-1">
      <RentSqmDevelopment 
        stepIndex={value}/>
    </div>
  
    <div bind:this={targetElement} class="section-container">
      <div class="steps-container">
        <Scrolly bind:value>
          {#each steps as text, i}
              <div class="step" class:active={value === i}>
                {#if i < steps.length - 1}
                  <div class="step-content">{@html text}</div>
                {/if}
              </div>
          {/each}
        </Scrolly>
      </div>
  </div>
</section>
  

<style>

  
  :global(.main-title) {
    text-align: center;
    margin: 2rem auto;
    color: #ca3f2d;
  }

  :global(.main-title span) {
    font-family: 'Newsreader', serif;
    color: black;
    font-style: italic;
  }

.background-image-1 {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url('/images/skyscrapers.jpg'); 
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
    height: 90vh;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  .step-content {
    font-size: 1rem;
    background: whitesmoke;
    color: #ccc;
    border-radius: 5px;
    padding: 1.4rem;
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


  :global(.step-content p) {
    padding: 0.2rem;
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
