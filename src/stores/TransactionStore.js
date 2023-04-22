import { defineStore } from 'pinia'
import Config from '../config.js'

export const useTransactionStore = defineStore('transactionStore', {
    state: () => ({
        transactions: []
    }),

    
    actions: {
        
        async getAll() {
            let res = await fetch(Config.API_PATH + "/?action=getTransactions")
            let data = await res.json()
            this.transactions = data

        },

        add(transaction) {
            fetch(Config.API_PATH + "/?action=addTransaction", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category_id: transaction.category_id,
                    dt: transaction.dt,
                    name: transaction.name,
                    description: transaction.description,
                    amount: transaction.amount
                })
            })
            .then(res => res.json())
            .then(res => {
                this.transactions.push(res)
                this.transactions.sort((a, b) => {
                    if (a.dt > b.dt) return -1
                    if (a.dt < b.dt) return 1
                    if (a.id > b.id) return -1
                    if (a.id < b.id) return 1
                    return 0
                })
                
            })

        },

        update(transaction) {
            fetch(Config.API_PATH + "/?action=updateTransaction", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: transaction.id,
                    category_id: transaction.category_id,
                    dt: transaction.dt,
                    name: transaction.name,
                    description: transaction.description,
                    amount: transaction.amount
                })
            })
            .then(res => res.json())    
            .then(res => {
                let index = this.transactions.findIndex(t => t.id === res.id)
                this.transactions[index] = res
            })
        },

        delete(id) {
            fetch(Config.API_PATH + "/?action=deleteTransaction", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id
                })
            })
            .then(res => res.json())
            .then(res => this.transactions.splice(this.transactions.findIndex(t => t.id === res.id), 1))
        }
    },


})