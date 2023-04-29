<script setup>

    import { ref, reactive, computed } from 'vue'
    import { inject } from 'vue'
    import AddButton from '../components/AddButton.vue';
    import EditButton from '../components/EditButton.vue';
    import DeleteButton from '../components/DeleteButton.vue';
    import TheTranForm from '../components/TheTranForm.vue';
    import { storeToRefs } from 'pinia'
    import { useTransactionStore } from '../stores/TransactionStore.js'
    import USDollar from '../helpers/usdollar.js'

    const categories = inject('categories')
    const catTypes = inject('catTypes')

    const formData = reactive({
        id: -1,
        category_id: 0,
        dt: '',
        name: '',
        description: '',
        amount: 0
    })

    const transactionStore = useTransactionStore()
    const { transactions } = storeToRefs(transactionStore)
    transactionStore.getAll()

    const edit = (tranId) => {
        const eTran = transactions.value.find(t => t.id === tranId)
        formData.id = eTran.id
        formData.category_id = eTran.category_id
        formData.dt = eTran.dt
        formData.name = eTran.name
        formData.description = eTran.description
        formData.amount = eTran.amount
    }


    const del = (tranId) => {
        alert ("This feature is turned off in the demo version.")
        // if(!confirm('Are you sure?')) return
        // transactionStore.delete(tranId)
    }

</script>


<template>
        
    <div class="d-flex">
        <div class="w-100"><h1>Transactions</h1></div>
        <div class="flex-shrink-1">
            <AddButton @click="formData.id=0" modalId="#tranModal">+ Add Transaction</AddButton>
        </div>
    </div>
    
    <table class="table table-bordered my-5">
        <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
                <td>{{ transaction.dt }}</td>
                <td>
                    <div>{{ transaction.name }}</div>
                    <div class="small">{{ transaction.description }}</div>
                </td>
                <td class="text-end pe-5 ps-3">{{ USDollar.format(transaction.amount) }}</td>
                <td>{{ categories.find(c => c.id === transaction.category_id).type }}</td>
                <td>{{ categories.find(c => c.id === transaction.category_id).name }}</td>
                <td class="text-center text-nowrap">
                    <EditButton @click="edit(transaction.id)" modalId="#tranModal" />
                    <DeleteButton @click="del(transaction.id)" />
                </td>
            </tr>
        </tbody>
    </table>

    <TheTranForm modalId="tranModal" :formData="formData" />

</template>

<style>

</style>
