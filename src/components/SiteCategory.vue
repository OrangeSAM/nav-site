<script setup>
import SiteCard from './SiteCard.vue'

defineProps({
    category: {
        type: String,
        required: true
    },
    sites: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="site-category">
        <h2>{{ category }}</h2>
        <div class="site-grid">
            <SiteCard v-for="site in sites" :key="site.url" :site="site" />
        </div>
    </div>
</template>

<style scoped>
.site-category {
    margin-bottom: 2rem;
}

.site-category h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #2c3e50;
}

.site-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    max-width: 1920px;
    margin: 0 auto;
}

@media (min-width: 1440px) {
    .site-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
    }
}

@media (max-width: 768px) {
    .site-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
    }
}

@media (max-width: 480px) {
    .site-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
</style>