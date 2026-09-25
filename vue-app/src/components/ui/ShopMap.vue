<script setup>
/**
 * The shop's real location on Google Maps.
 *
 * The frame URL is built from the address in `src/data/site.js`, so the pin
 * always follows the address the rest of the site publishes. It uses Google's
 * keyless `output=embed` form: no API key, no billing account, and no
 * hand-drawn streets standing in for a real location.
 *
 * To move to Google's official Embed API later, replace `shop.maps.embedUrl`
 * with the `src` from Google Maps → Share → Embed a map (or a
 * `maps/embed/v1/place?key=...` URL) — this component needs no change.
 */
import { addressLines, shop } from '../../data/site.js'

const mapTitle = `Google map showing ${shop.name} at ${addressLines.join(', ')}`
</script>

<template>
  <figure class="shop-map">
    <div class="shop-map__frame">
      <iframe
        :src="shop.maps.embedUrl"
        :title="mapTitle"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      ></iframe>
    </div>

    <figcaption class="shop-map__caption">
      <strong>{{ shop.address.line1 }}</strong>
      <span>{{ shop.address.suburb }}, {{ shop.address.city }}, {{ shop.address.postalCode }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.shop-map {
  margin: 0;
}

/* The frame holds the map's height before Google loads, so the page does not
   jump when the map arrives. */
.shop-map__frame {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--ink-600);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
}

.shop-map__frame iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.shop-map__caption {
  display: grid;
  gap: 0.15rem;
  margin-top: 0.85rem;
  font-size: var(--step-small);
  color: var(--cream-muted);
}

.shop-map__caption strong {
  color: var(--cream);
  letter-spacing: 0.04em;
}

</style>