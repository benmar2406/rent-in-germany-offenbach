<script>
  import { onMount } from 'svelte';
  import mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  

  let map;
  let popup;

  let isLoading = true;

  onMount(() => {

    // Initialize Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVubWFyYmUiLCJhIjoiY204ZGdqbmk2MjIxcjJrczd5cjhnOWc5ZiJ9.aNWSLi175awDsnHX7mZIlQ';
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/benmarbe/cm8bs3mv900gf01s96g49btrq',
      center: [10.0, 51.3],
      zoom: 5,
      projection: 'mercator',
      maxZoom: 12,
      minZoom: 5.4
    });

    // Initialize popup
    popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });


    // Map event handlers
    map.on('load', () => {
      isLoading = false;
      map.getCanvas().style.cursor = 'default';
      map.addControl(new mapboxgl.NavigationControl());
    });

    map.on('mousemove', (event) => {
      const plzs = map.queryRenderedFeatures(event.point, {
        layers: ['germany-rent-plz-0-7ubtns']
      });

      if (plzs.length > 0) {
        const feature = plzs[0];
        const plz = feature.properties.plz || 'Keine Daten verfügbar.';
        const regio3 = feature.properties.regio3 || 'Keine Daten verfügbar.';
        const regio2 = feature.properties.regio2 || 'Keine Daten verfügbar.';
        const retrievedPrice = feature.properties.price_per_sqm;
        const priceSqm = retrievedPrice ? retrievedPrice.toFixed(2) : '';
        popup.setLngLat(event.lngLat)
          .setHTML(`
            <div id="pd">
              <h3 class="regio2">${regio2}</h3>
              <div id="location-information">
                <p id="regio3">${regio3}</p>
                <p id="plz">PLZ: ${plz}</p>
              </div>
              <p id="rent-price-info">Durchschnittlicher Mietpreis pro Quadratmeter:</p>
              <p id="rent-price">${priceSqm} €</p>
            </div>
          `)
          .addTo(map);
      } else {
        popup.remove();
      }
    });

    document.getElementById('map').addEventListener('mouseleave', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  });
</script>
<div id="map">
  {#if isLoading} <div class="loading-screen"><p>Karte läd...<p></div>{/if}
</div>

<style>
  #map {
    width: 100%;
    height: 100vh;
    top: 0;
  }

  .loading-screen {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading-screen p {
    font-size: 3rem;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
  }

  /* These are Mapbox's elements, so they need :global() */
  :global(.mapboxgl-popup) {
    max-width: 300px !important;
  }

  :global(.mapboxgl-popup-content) {
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.8);
  }

  /* Dynamically created popup content needs :global() */
  :global(#pd) {
    margin: 1rem;
    font-family: 'Newsreader', serif;
    width: 250px;
    margin: 0.4rem;
  }

  :global(.regio2) {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
    margin: 0 0 5px 0;
  }

  :global(#regio3) {
    margin: 0;
    font-size: 0.9rem;
    padding: 0;
  }

  :global(#location-information) {
    margin: 0;
  }
  
  :global(#plz) {
    margin: 0;
    padding: 0;
    font-size: 0.9rem;
  }

  :global(#rent-price-info) {
    margin: 0.8rem 0;
    margin-bottom: 0;
    font-size: 0.9rem;
    line-height: 1.2rem;
    
  }
  :global(#rent-price) {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 2rem;
    margin: 0;
    padding: 0;

  }

  @media (max-width: 768px) {
    #map {
      height: 60vh;
    }

  }
</style>