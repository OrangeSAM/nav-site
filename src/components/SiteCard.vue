<script setup>
import { ref } from 'vue'

defineProps({
    site: {
        type: Object,
        required: true
    }
})

const getIconUrl = (iconName) => {
    return new URL(`../assets/icons/${iconName}.svg`, import.meta.url).href
}
</script>

<template>
    <a :href="site.url" target="_blank" class="site-card" rel="noopener noreferrer">
        <div class="site-header">
            <div class="site-icon">
                <img :src="getIconUrl(site.icon)" :alt="site.name" />
            </div>
            <h3>{{ site.name }}</h3>
        </div>
        <p class="site-description">{{ site.description }}</p>
        <div class="site-tags">
            <span v-for="tag in site.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
    </a>
</template>

<style scoped>
.site-card {
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: #ffffff;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
}

.site-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: #d1d5db;
}

.site-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
}

.site-icon {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: #f3f4f6;
    padding: 0.5rem;
}

.site-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.site-card h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #111827;
}

.site-description {
    margin: 0 0 1rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #4b5563;
    flex-grow: 1;
}

.site-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tag {
    padding: 0.25rem 0.75rem;
    background: #f3f4f6;
    border-radius: 9999px;
    font-size: 0.75rem;
    color: #4b5563;
    font-weight: 500;
}
</style>