<script setup>
    import { computed } from 'vue';

    const props = defineProps([
        'title',
        'subtitle',
        'image',
        'text',
        'timestamp',
        'link'
    ]);
    const link = computed(() => { return "/article/" + props.link; });
</script>

<template>
    <div class="card mt-4">
        <img :src="props.image" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">{{ props.title }}</h5>
            <h6 class="card-subtitle mb-2">{{ props.subtitle }}</h6>
            <p class="card-text">{{ props.text }}</p>
            <a :href="link" class="card-link">Mehr anzeigen</a>
            <p class="card-text"><small>{{ props.timestamp }}</small></p>
        </div>
    </div>
</template>

<style scoped>
</style>
