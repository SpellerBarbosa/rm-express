import { defineStore } from "pinia";

export const useUrlsStore =  defineStore('urls',{
    state:()=>({
    }),

    getters:{
        getFixesUrls(){
            return{
                 loginUrl: 'http://localhost:3001/api/login',
                 secureUrl: 'http://localhost:3001/api/secure'
            }
        }
    }
})