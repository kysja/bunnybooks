<script setup>
    import { inject, reactive, watch, computed } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useTransactionStore } from '../stores/TransactionStore.js'
    import USDollar from '../helpers/usdollar.js'
    
    const categories = inject('categories')
    
    const total = reactive({
        income: 0,
        cogs: 0,
        expense: 0
    })

    var grossProfit = computed(() => Math.round((total.income - total.cogs)*100)/100)
    var netProfit = computed(() => Math.round((total.income - total.cogs - total.expense)*100)/100)

    const transactionStore = useTransactionStore()
    const { transactions } = storeToRefs(transactionStore)
    transactionStore.getAll()

    watch([categories, transactions], () => {
        if (categories.value.length > 0 && transactions.value.length > 0) {

            transactions.value.forEach(t => {
                if (categories.value.find(c => c.id == t.category_id).type == "Income") {
                    total.income += t.amount
                } else if (categories.value.find(c => c.id == t.category_id).type == "COGS") {
                    total.cogs += t.amount
                } else if (categories.value.find(c => c.id == t.category_id).type == "Expense") {
                    total.expense += t.amount
                }
            })
        }
    })

</script>

<template>

    <h1>Income Statement</h1>
    
    <h2 class="mt-5 mb-2">Revenue</h2>
    <table class="table table-bordered w-auto">
        <tbody>
            <tr v-for="category in categories.filter(c => c.type == 'Income' && transactions.filter(t => t.category_id == c.id).length > 0)" :key="category.id">
                <td class="rep_name pe-5">{{ category.name }}</td>
                <td class="text-end rep_amount">{{ USDollar.format(transactions.filter(t => t.category_id == category.id).reduce((a, b) => a + b.amount, 0)) }}</td>
                <td class="rep_amount"></td>
            </tr>
            <tr class="bg-body-secondary">
                <td class="rep_name pe-5"><div class="fw-bold">Total</div></td>
                <td class="text-end rep_amount"><div class="fw-bold">{{ USDollar.format(total.income) }}</div></td>
                <td class="rep_amount"></td>
            </tr>
        </tbody>
    </table>

    <h2 class="mt-5 mb-2">Cost of Goods Sold</h2>
    <table class="table table-bordered w-auto">
        <tbody>
            <tr v-for="category in categories.filter(c => c.type == 'COGS' && transactions.filter(t => t.category_id == c.id).length > 0)" :key="category.id">
                <td class="rep_name pe-5">{{ category.name }}</td>
                <td class="rep_amount"></td>
                <td class="text-end rep_amount">{{ USDollar.format(transactions.filter(t => t.category_id == category.id).reduce((a, b) => a + b.amount, 0)) }}</td>
            </tr>
            <tr class="bg-body-secondary">
                <td class="rep_name pe-5"><div class="fw-bold">Total</div></td>
                <td class="rep_amount"></td>
                <td class="text-end rep_amount"><div class="fw-bold">{{ USDollar.format(total.cogs) }}</div></td>
            </tr>
        </tbody>
    </table>

    <table class="table border-top w-auto mt-5 mb-5">
        <tbody>
            <tr class="bg-body-secondary">
                <td class="rep_name pe-5"><div class="fw-bold">Gross Profit</div></td>
                <td class="text-end rep_amount"><div class="fw-bold">{{ USDollar.format(grossProfit) }}</div></td>
                <td class="rep_amount"></td>
            </tr>
        </tbody>
    </table>

    <h2 class="mt-5 mb-2">Expenses</h2>
    <table class="table table-bordered w-auto">
        <tbody>
            <tr v-for="category in categories.filter(c => c.type == 'Expense' && transactions.filter(t => t.category_id == c.id).length > 0)" :key="category.id">
                <td class="rep_name pe-5">{{ category.name }}</td>
                <td class="rep_amount"></td>
                <td class="text-end rep_amount">{{ USDollar.format(transactions.filter(t => t.category_id == category.id).reduce((a, b) => a + b.amount, 0)) }}</td>
            </tr>
            <tr class="bg-body-secondary">
                <td class="rep_name pe-5"><div class="fw-bold">Total</div></td>
                <td class="rep_amount"></td>
                <td class="text-end rep_amount"><div class="fw-bold">{{ USDollar.format(total.expense) }}</div></td>
            </tr>
        </tbody>
    </table>

    <table class="table border-top w-auto mt-5 mb-5">
        <tbody>
            <tr class="bg-body-secondary">
                <td class="rep_name pe-5"><div class="fw-bold fs-5">Net Profit</div></td>
                <td class="text-end rep_amount"><div class="fw-bold fs-5">{{ USDollar.format(netProfit) }}</div></td>
                <td class="rep_amount"></td>
            </tr>
        </tbody>
    </table>

</template>


<style scoped>
    td.rep_amount {
        width: 120px;
    }
    td.rep_name {
        width: 400px;
    }
</style>
