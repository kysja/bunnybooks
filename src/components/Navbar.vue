<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light navbar-light sticky-top py-2 px-4 px-lg-5 mb-4 border-bottom">
        
        <div class="container">
            
            <RouterLink to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <img src="@/assets/images/logo.png" class="me-3" alt="Logo">
                <span class="fs-3 text-primary fw-bold">BunnyBooks</span>
            </RouterLink>
        
            <div class="fs-4 mx-5">
                Income Statement Generator
            </div>

        </div>

    </nav>
</template>

<style scoped>
    img {
        max-height: 64px;
    }
</style>
