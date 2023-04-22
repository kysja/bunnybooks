<script setup>

    import { ref, reactive  } from 'vue'
    import { inject } from 'vue'
    import AddButton from '../components/AddButton.vue';
    import EditButton from '../components/EditButton.vue';
    import DeleteButton from '../components/DeleteButton.vue';
    import TheCatForm from '../components/TheCatForm.vue';
    import { useCategoryStore } from '../stores/CategoryStore.js'

    const categories = inject('categories')
    const catTypes = inject('catTypes')

    const formData = reactive({
        id: 0,
        type: '',
        name: '',
        description: ''
    })

    const categoryStore = useCategoryStore()

    const edit = (catId) => {
        let eCat = categories.value.find(c => c.id === catId)
        formData.id = eCat.id
        formData.type = eCat.type
        formData.name = eCat.name
        formData.description = eCat.description
    }

    const del = (catId) => {
        if(!confirm('Are you sure?')) return
        categoryStore.delete(catId)
    }

</script>


<template>
    <h1>Categories</h1>

    <div v-for="ctype in catTypes" :key="ctype" class="my-5">
        
        <div class="d-flex my-3">
            <div class="w-100"><h2>{{ ctype }}</h2></div>
            <div class="flex-shrink-1">
                <AddButton @click="formData.type=ctype;formData.id=0" modalId="#catModal">+ Add {{ ctype }} Category</AddButton>
            </div>
        </div>
        <table class="table border-top mb-3">
            <tbody>
                <tr v-for="category in categories.filter(e => e.type==ctype)" :key="category.id">
                    <td>{{ category.name }}</td>
                    <td>{{ category.description }}</td>
                    <td>
                        <EditButton @click="edit(category.id)" modalId="#catModal" />
                        <DeleteButton @click="del(category.id)" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <TheCatForm modalId="catModal" :formData="formData" />
    
</template>

<style>

</style>
