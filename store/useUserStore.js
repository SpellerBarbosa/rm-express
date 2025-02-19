import { defineStore } from "pinia";

export const useUserStore = defineStore('user',{
    state:()=>({
        user_id: undefined,
        user_name: undefined,
        user_role: undefined,
        user_sector: undefined
    }),
    actions:{
        setUserInfo(user_id, user_name, user_role, user_sector){
            this.user_id = user_id,
            this.user_name = user_name,
            this.user_role = user_role,
            this.user_sector = user_sector
        }
    }
});