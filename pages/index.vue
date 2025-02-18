<script setup>
import Error from '~/components/error.vue';
import Success from '~/components/Success.vue';
import { useUrlsStore } from '~/store/useUrlsStore';
import { ref } from 'vue';

const msgError = ref("");
const msgSuccess = ref("");
const user = ref("");
const password = ref("");
const useUrl = useUrlsStore();
const fixedUrls = useUrl.getFixesUrls;
const token = useCookie('token');
const btnText = ref(false)

const handleLogin = async () =>{
    if(!user.value){
        msgError.value = "Digite seu usuario";
        setTimeout(() => {
            msgError.value = "";
        }, 2000);
    }

    if(!password.value){
        msgError.value = "Digite seu senha.";
        setTimeout(() => {
            msgError.value = "";
        }, 2000);
    }

    try {
        const response = await fetch(fixedUrls.loginUrl,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                user: user.value.toLowerCase().trim(),
                password: password.value.trim()
            })
        });

        const data = await response.json();

        if(response.ok){
            msgSuccess.value = data.msg;
            token.value = data.token;
            btnText.value = true;

            setTimeout(() => {
                msgSuccess.value = "";
                user.value = "";
                password.value ="";
                btnText.value = false;
            }, 2000);

            const secure = await fetch(fixedUrls.secureUrl,{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${token.value}`
                }
            })

            const dataSecure = await secure.json();
            console.log(dataSecure)

        }else{
            msgError.value = data.msg;
            setTimeout(() => {
                msgError.value = "";
            }, 2000);
        }
    } catch (error) {
        msgError.value = "Erro no servidor, tente novamente mais tarde.";
        setTimeout(() => {
            msgError.value = "";
        }, 2000);
    }
}


</script>

<template>
    <section class=" w-screen h-screen grid place-items-center gap-4 bg-gray-900 opacity-90">
        <form class="w-[340px] h-[340px] bg-white rounded-3xl relative opacity-85 flex flex-col items-center justify-center gap-4 font-obitron shadow-2gitxl shadow-gray-600 sm:w-[500px] sm:h-[500px] sm:gap-8"  @submit.prevent="handleLogin()">
            <img src="~/assets/img/logo.png" alt="logo" class="w-[120px] border-white border-2 rounded-full absolute -top-16 left-0 right-0  m-auto opacity-95 sm:w-[180px] sm:-top-22">

            <label for="user" class="flex sm:w-[80%]">
                <img src="~/assets/img/user_icon.png" alt=" Icone input usuario" class="w-[35px] sm:w-[50px] p-1 bg-gray-400 border-2 border-gray-500">
                <input type="text" class="border-2 border-gray-500 uppercase text-center sm:w-full sm:text-2xl outline-none"  placeholder="Usuario" v-model="user">
            </label>
            <label for="user" class="flex sm:w-[80%]">
                <img src="~/assets/img/pass_icon.png" alt=" Icone input usuario" class="w-[35px] sm:w-[50px] p-1 bg-gray-400 border-2 border-gray-500">
                <input type="password" class="border-2 border-gray-500 uppercase text-center sm:w-full sm:text-2xl outline-none"  placeholder="senha" v-model="password">
            </label>
            <button type="submit" class="w-[150px] p-2 border-2 rounded-2xl bg-gray-600 text-white tracking-wider uppercase text-xs cursor-pointer sm:p-4 sm:w-[200px] sm:text-lg sm:-tracking-wider" :disabled="btnText" >{{ btnText ? 'carregando...':'Entrar' }}</button>
        </form>
        <Error :msgError="msgError"  v-if="msgError"/>
        <Success :msgSuccess="msgSuccess"  v-if="msgSuccess"/>
    </section>
</template>