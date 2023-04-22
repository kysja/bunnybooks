<script setup>
    import { ref, reactive, computed, watch  } from 'vue'
    import { useCategoryStore } from '../stores/CategoryStore.js'
    import Modal from '../components/Modal.vue';

    const props = defineProps({
        modalId: String,
        formData: Object

    })

    const categoryStore = useCategoryStore()
    const errModal = ref('')
    const form = reactive({
        id: 0,
        type: '',
        name: '',
        description: ''
    })
    const modalTitle = computed(() => form.id > 0 ? 'Edit Category' : 'Add ' + form.type + ' Category')

    watch(props.formData, (val) => {
        form.id = val.id
        form.type = val.type
        if (form.id === 0) {
            form.name = ''
            form.description = ''
        } else {
            form.name = val.name
            form.description = val.description
        }
        errModal.value = ''
    })

    const save = () => {
        if (form.name == '') {
            errModal.value = 'Name is required'
            setTimeout(() => errModal.value = '', 5000)
            return
        }

        form.id == 0 ? categoryStore.add(form) : categoryStore.update(form)

        form.id = 0
        form.name = ''
        form.description = ''

        document.getElementById('btnModalClose').click()
    }

</script>



<template>

    <Modal :id="modalId" :title="modalTitle"> 
        
        <form @submit.prevent="save">
            
            <input type="hidden" v-model="form.id">

            <div v-show="errModal" class="text-start text-danger">Error: {{ errModal }}</div>
            <div class="my-4">
                <label>Type</label>
                <div class="fw-bold">{{ form.type }}</div>
            </div>
            <div class="my-4">
                <label>Name</label>
                <input v-model.trim="form.name" class="form-control">
            </div>
            <div class="my-4">
                <label>Description</label>
                <input v-model.trim="form.description" class="form-control">
            </div>
            <div class="my-4 text-center">
                <button class="btn btn-primary">Save</button>
            </div>

        </form>

    </Modal>

</template>