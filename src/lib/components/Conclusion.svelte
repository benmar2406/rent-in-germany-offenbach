<script>
  import { onMount } from 'svelte';
  import typewriter from '../customTransitions/typewriterTransition.js';
  import intersectionObserver from '$lib/customTransitions/intersectionObserver.js';

  let elementToObserve;


  onMount(() => {
    if (elementToObserve) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          isVisible = true;
          observer.disconnect(); 
        }
    });

      observer.observe(elementToObserve);

      return () => {
        observer.disconnect();
      };
    }
  });
</script>

<section class="conclusion">
  <div 
    bind:this={elementToObserve} 
    class="background-image-3">
    </div>
  {#if isVisible}
    <p transition:typewriter>
      Was braucht es, damit Wohnen wieder möglich wird – statt unerschwinglich?
    </p>
  {/if}
</section>

<style>
  .conclusion {
    position: relative;
    width: 100%;
    text-align: center;
  }

  .conclusion p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "Poppins";
    font-weight: 700;
    color: white;
  }

  .background-image-3 {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url('/images/people.jpg');
    background-size: cover;
    background-position: center;
    background-color: rgb(0, 0, 0, 0.7);
    z-index: -1;
  }

  .background-image-3::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
</style>
