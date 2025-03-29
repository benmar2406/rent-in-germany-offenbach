<script>
  import { onMount } from 'svelte';

  let scrollProgress = 0;

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress = (scrollTop / scrollHeight) * 100;
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div class="progress-container">
  <div class="progress-bar" style="width: {scrollProgress}%;"></div>
</div>

<style>
  .progress-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 6px;
    width: 100%;
    background-color: transparent;
    z-index: 9999;
  }

  .progress-bar {
    height: 100%;
    background-color: #ca3f2d; 
    transition: width 0.1s ease-out;
  }

</style>
