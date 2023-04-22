<script setup>

const props = defineProps({
    modalId: String
  
})

</script>

<template>
    <button class="btn btn-sm btn-primary text-nowrap" data-bs-toggle="modal" :data-bs-target="modalId">
        <slot></slot>
    </button>
</template>

