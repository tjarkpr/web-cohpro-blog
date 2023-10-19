<script setup>
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import MarkdownIt from 'markdown-it';
    const Markdown = new MarkdownIt({ html: true });

    const failed = ref(false)
    const markdownText = ref("");
    const route = useRoute();

    fetch('/articles/' + route.params.id + '.md')
            .then(response => response.text())
            .then(txt => markdownText.value = txt)
            .catch(_ => failed.value = true);

    const markdownHTML = computed(() => {
        return Markdown.render(markdownText.value);
    });

    function failedFetch() { return failed.value; }
</script>

<template>
  <header class="d-flex justify-content-between flex-row">
    <h1><a href="/">Feed</a></h1>
  </header>
  <main>
    <div class="markdown" v-if="!failedFetch()" v-html="markdownHTML"></div>
    <div v-if="failedFetch()">
        <h1 class="text-center" style="margin-top: 25vh;">🙃</h1>
        <h3 class="text-center">The article could not be found!</h3>
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
  .markdown {
      width: 100%;
  }
  footer {
    background: var(--color-background);
  }
</style>