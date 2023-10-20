<script setup>
  import { fetchFeed } from '../assets/store.js';
  import FeedItemComponent from '../components/FeedItemComponent.vue';
</script>

<template>
  <header class="d-flex justify-content-between flex-row">
    <h1><a href="/">Feed</a></h1>
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      Filter
    </button>
    <ul class="dropdown-menu">
      <li><a 
        id="author-johanna-filter"
        class="dropdown-item" 
        :class="{ active: $route.params.name === 'johanna' }" 
        :href="$route.params.name === 'johanna' ? '/' : '/author-johanna'">Johanna</a></li>
      <li><a 
        id="author-tjark-filter"
        class="dropdown-item" 
        :class="{ active: $route.params.name === 'tjark' }" 
        :href="$route.params.name === 'tjark' ? '/' : '/author-tjark'">Tjark</a></li>
    </ul>
  </header>
  <main>
    <component v-for="item in fetchFeed($route.params.name)" :is="FeedItemComponent" v-bind="item" />
    <div v-if="fetchFeed($route.params.name).length == 0">
        <h1 class="text-center" style="margin-top: 25vh;">🙃</h1>
        <h3 class="text-center">No articles found!</h3>
    </div>
  </main>
  <footer class="px-4 d-flex justify-content-between flex-row fixed-bottom">
    <small>© Tjark & Johanna</small>
    <div class="d-flex flex-row">
      <a class="me-4" href="/about">About</a>
      <a href="/privacy">Privacy</a>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    background: var(--color-background);
  }
</style>