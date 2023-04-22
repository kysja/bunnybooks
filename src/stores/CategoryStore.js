import { defineStore } from 'pinia'
import Config from '../config.js'

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        categories: []
    }),

    
    actions: {
        
        async getAll() {
            let res = await fetch(Config.API_PATH + "/?action=getCategories")
            let data = await res.json()
            this.categories = data
            this.categories.sort((a, b) => {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1
                return 0
            })
        },

        add(category) {
            fetch(Config.API_PATH + "/?action=addCategory", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: category.type,
                    name: category.name,
                    description: category.description
                })
            })
            .then(res => res.json())
            .then(res => this.categories.push(res))
        },

        update(category) {
            fetch(Config.API_PATH + "/?action=updateCategory", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: category.id,
                    type: category.type,
                    name: category.name,
                    description: category.description
                })
            })
            .then(res => res.json())    
            .then(res => {
                let index = this.categories.findIndex(c => c.id === res.id)
                this.categories[index] = res
            })
        },

        delete(id) {
            fetch(Config.API_PATH + "/?action=deleteCategory", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id
                })
            })
            .then(res => res.json())
            .then(res => this.categories.splice(this.categories.findIndex(c => c.id === res.id), 1))
        }
    },


})