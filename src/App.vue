<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import Navbar from './components/Navbar.vue'
    import Sidebar from './components/Sidebar.vue'

    import { provide } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useCategoryStore } from './stores/CategoryStore.js'

    const categoryStore = useCategoryStore()
    const { categories } = storeToRefs(categoryStore)
    categoryStore.getAll()
    provide('categories', categories)
    provide('catTypes', ['Income', 'COGS', 'Expense'])


</script>

<template>
    <header>
        <Navbar />
    </header>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 border-right bg-light p-4">
                <Sidebar />
            </div>
            <div class="col-lg-9 p-4">
                <RouterView />
            </div>
        </div>
    </div>
</template>

