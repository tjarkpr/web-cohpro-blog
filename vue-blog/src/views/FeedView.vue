<script setup>
  import { fetchFeed } from '../assets/store.js';
  import FeedItemComponent from '../components/FeedItemComponent.vue';
</script>

<template>
  <header class="d-flex justify-content-between flex-row align-items-center">
    <h1 class="title"><a href="/">Feed</a></h1>
    <button class="btn btn-secondary dropdown-toggle filter" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
    <InFeedAdsense
        data-ad-layout-key="-gi+g+7v-1q-6r"
        data-ad-client="ca-pub-3632293280429419X"
        data-ad-slot="4760763315">
    </InFeedAdsense>
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
  .filter {
    height: fit-content;
    color: #fff;
    background: rgb(226, 43, 171);
    border: none;
  }
  .dropdown-item.active {
    background-color: transparent;
    color: rgb(226, 43, 171);
  }
  footer {
    background: var(--color-background);
  }
</style>