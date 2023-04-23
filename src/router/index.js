import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import TransactionsView from '../views/TransactionsView.vue'
import IncomeStatementView from '../views/IncomeStatementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/transactions', name: 'transactions', component: TransactionsView },
    { path: '/income-statement', name: 'income-statement', component: IncomeStatementView },
  ]
})

export default router
