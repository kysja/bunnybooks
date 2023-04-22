<script setup>
    const props = defineProps({
        title: String
    })
</script>


<template>

    <div class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" id="btnModalClose" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <slot></slot>
                </div>
                
            </div>
        </div>
    </div>

</template>