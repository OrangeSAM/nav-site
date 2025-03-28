<script setup>
import { ref, computed } from 'vue'
import { sites } from './config/sites.js'
import SiteCategory from './components/SiteCategory.vue'

const darkMode = ref(false)
const searchQuery = ref('')

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark')
}

const filteredSites = computed(() => {
  if (!searchQuery.value) return sites

  return sites.map(category => ({
    category: category.category,
    sites: category.sites.filter(site =>
      site.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      site.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      site.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  })).filter(category => category.sites.length > 0)
})
</script>

<template>
  <div class="nav-container" :class="{ 'dark': darkMode }">
    <header class="header">
      <h1>导航站点</h1>
      <div class="toolbar">
        <div class="search-box">
          <input type="text" v-model="searchQuery" placeholder="搜索站点..." class="search-input" />
        </div>
        <button @click="toggleDarkMode" class="theme-toggle" :title="darkMode ? '切换亮色模式' : '切换暗色模式'">
          <svg v-if="!darkMode" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
            <path
              d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm7.071 7.071a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm-14.142 0a1 1 0 0 1 1.414 0l.707.707A1 1 0 1 1 5.636 12.2l-.707-.707a1 1 0 0 1 0-1.414zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-9 2a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h1zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1zM5.636 15.8a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707zm11.314 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414zM12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
          </svg>
        </button>
      </div>
    </header>
    <main>
      <SiteCategory v-for="category in filteredSites" :key="category.category" :category="category.category"
        :sites="category.sites" />
    </main>
  </div>
</template>

<style>
:root {
  --bg-primary: #ffffff;
  --text-primary: #2c3e50;
  --text-secondary: #4b5563;
  --border-color: #e5e7eb;
  --hover-bg: #f3f4f6;
}

.dark {
  --bg-primary: #1f2937;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --border-color: #374151;
  --hover-bg: #374151;
}

body {
  margin: 0;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  position: relative;
}

.search-input {
  width: 300px;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 9999px;
  background: var(--hover-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: var(--border-color);
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
}

main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .search-input {
    width: 100%;
    min-width: 200px;
  }
}
</style>
