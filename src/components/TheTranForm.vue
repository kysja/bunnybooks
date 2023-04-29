<script setup>
    import { ref, reactive, computed, watch  } from 'vue'
    import { inject } from 'vue'
    import { useCategoryStore } from '../stores/CategoryStore.js'
    import { useTransactionStore } from '../stores/TransactionStore.js'
    import { storeToRefs } from 'pinia'
    import Modal from '../components/Modal.vue';

    const props = defineProps({
        modalId: String,
        formData: Object

    })

    const transactionStore = useTransactionStore()
    const catTypes = inject('catTypes')
    const categories = inject('categories')
   
    const errModal = ref('')
    const form = reactive({
        id: 0,
        category_id: 0,
        dt: '',
        name: '',
        description: '',
        amount: 0
    })
    const modalTitle = computed(() => form.id > 0 ? 'Edit Transaction' : 'Add Transaction')

    watch(props.formData, (val) => {
        form.id = val.id
        if (form.id === 0) {
            form.category_id = 0
            form.dt = new Date().toISOString().slice(0, 10)
            form.name = ''
            form.description = ''
            form.amount = 0
        } else {
            form.category_id = val.category_id
            form.dt = val.dt
            form.name = val.name
            form.description = val.description
            form.amount = val.amount
        }
        errModal.value = ''
    })

    const save = () => {
        alert("This feature is turned off in the demo version.")
        // if (form.name == '') 
        //     errModal.value = 'Name is required'
        // else if (form.category_id == 0) 
        //     errModal.value = 'Category is required'
        // if (errModal.value != '') {
        //     setTimeout(() => errModal.value = '', 5000)
        //     return
        // }

        // form.id == 0 ? transactionStore.add(form) : transactionStore.update(form)

        // form.id = 0
        // form.category_id = 0
        // form.dt = new Date().toISOString().slice(0, 10)
        // form.name = ''
        // form.description = ''
        // form.amount = 0

        document.getElementById('btnModalClose').click()
    }

</script>



<template>

    <Modal :id="modalId" :title="modalTitle"> 
        
        <form @submit.prevent="save">
            
            <input type="hidden" v-model="form.id">

            <div v-show="errModal" class="text-start text-danger">Error: {{ errModal }}</div>
            
            <div class="my-4">
                <label>Category</label>
                <select v-model="form.category_id" class="form-select">
                    <option value="0">Select Category</option>
                        <option 
                            v-for="category in categories.sort( (a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name) )" 
                            :key="category.id" 
                            :value="category.id" 
                            :selected="category.id === form.category_id">
                                
                                {{ category.type.toUpperCase() }} :: {{ category.name }}
                        </option>
                </select>
            </div>
            <div class="my-4">
                <label>Date</label>
                <input v-model.trim="form.dt" type="date" class="form-control">
            </div>
            <div class="my-4">
                <label>Amount</label>
                <input v-model.trim="form.amount" class="form-control">
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