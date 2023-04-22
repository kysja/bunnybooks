<script setup>

const props = defineProps({
    modalId: String
  
})

</script>

<template>
    <a class="me-3" role="button" data-bs-toggle="modal" :data-bs-target="modalId" title="Edit"><img src="../assets/icons/edit_16.png"></a>
</template>

