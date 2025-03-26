<script>
    export let isColored = false;
</script>

<svg class="money-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle 
        cx="12" 
        cy="12" 
        r="10" 
        class={isColored ? 'colored' : ''}
    />
    <text 
        x="50%" 
        y="50%" 
        text-anchor="middle" 
        dominant-baseline="central"
        class="symbol"
    >€</text>
</svg>

<style>
    .money-icon {
        width: 100%;
        height: 100%;
    }

    circle {
        fill: #cccccc;
        stroke: none;
        transition: fill 0.3s ease;
    }

    circle.colored {
        fill: #ca3f2d;
    }

    .symbol {
        fill: white;
        font-size: 14px;
        font-weight: bold;
        font-family: Arial, sans-serif;
    }
</style> 