<script setup>
    import { computed } from 'vue';

    const props = defineProps([
        'title',
        'subtitle',
        'image',
        'text',
        'datestring',
        'link'
    ]);
    const link = computed(() => { return "/article/" + props.link; });
</script>

<template>
    <div class="card mt-4 app-card">
        <img :src="props.image" class="card-img-top app-card-img" alt="">
        <div class="card-body">
            <h5 class="card-title">{{ props.title }}</h5>
            <h6 class="card-subtitle mb-2">{{ props.subtitle }}</h6>
            <p class="card-text">{{ props.text }}</p>
            <div class="d-flex flex-row justify-content-between">
                <p class="card-text mb-0"><small>{{ props.datestring }}</small></p>
                <a :href="link" class="card-link app-card-link py-1 px-2">Read Article</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.app-card {
    background: var(--color-background-soft);
    color: var(--color-text);
    border: none;
}

.app-card-link {
    text-decoration: none;
    color: #fff;
    background: rgb(226, 43, 171);
    border-radius: 5px;
}

.app-card-img {
    height: 200px;
    object-fit: cover;
}
</style>
