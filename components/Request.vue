<script setup>
import { ref } from 'vue';
import { apiEndPoints, getApiUrl } from '~/utils/ApiEndpoints.js';
import Error from '~/components/Error.vue';
import success from '~/components/success.vue';

const date = new Date;
const day = date.getDate();
let month = date.toLocaleString('pt-br', { month: 'long' });
const year = date.getFullYear();
const date_request = `${day}/${month}/${year}`
const clients = [
    { empresa: 'solutions tecnology' },
    { empresa: 'cafeteria mais cafe' },
    { empresa: 'pets confort life' }
]
const client = ref("");
const applicant = ref("");
const type_service = ref("");
const description_service = ref("");
const userId = ref("");
const msgError = ref("");
const msgSucess = ref("");
const requestUrl = getApiUrl(apiEndPoints.REQUEST);

const request_service = async () => {
    if (!client.value) {
        msgError.value = "Selecione o cliente";
        setTimeout(() => {
            msgError.value = "";
        }, 2000);
        return;
    }
    if (!type_service.value) {
        msgError.value = "selecione o tipo do serviço que será feito.";
        setTimeout(() => {
            msgError.value = "";
        }, 2000);
        return;
    }
    if(!description_service.value){
        msgError.value = "Descreva qual será o serviço.";
        setTimeout(()=>{
        msgError.value = "";
        }, 2000);
    }

    try {
        const response = await fetch(requestUrl,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:{
                date: date_request,
                client: client.value.toLowerCase().trim(),
                type_service: type_service.value.toLowerCase().trim(),
                description_service: description_service.value.toLowerCase().trim(),
                userId: userId.value,
            }
        })

        const data = await response.json();

        if(response.ok){

        }
    } catch (error) {
        
    }
}

</script>
<template>
    <section class="w-screen h-screen bg-gray-400 flex flex-col items-center shadow-xl">
        <section class="w-full h-[10vh] bg-gray-700 grid place-items-center text-white">
            <h1 class="uppercase text-2xl font-bold">r.m express</h1>
        </section>
        <form class="w-[90%] h-[80vh] bg-white  m-auto rounded-2xl grid place-items-center" @submit.prevent="request_service()">
            <span class=" uppercase font-bold text-2xl">Solicitar Serviço</span>
            <label for="date_request" class="flex flex-col w-[90%] gap-1">
                <span class="font-semibold tracking-wider">Data Solicitação :</span>
                <input type="text" disabled v-model="date_request" class="uppercase border-1 bg-gray-100 rounded-lg text-center
                border-gray-300 h-8">
            </label>
            <label for="applicant" class="flex flex-col w-[90%] gap-1">
                <span class="font-semibold tracking-wider">Solicitante:</span>
                <input type="text" id="applicant" disabled v-model="applicant" class=" border-1 bg-gray-100 rounded-lg text-center
                border-gray-300 h-8 uppercase">
            </label>
            <label for="client" class="flex flex-col w-[90%]">
                <span class="font-semibold tracking-wider">Selecione o Cliente: </span>
                <select name="client" id=" client"
                    class="h-8 uppercase text-center border-1 bg-gray-100 outline-none rounded-lg border-gray-300"
                    v-model="client">
                    <option value="" disabled selected>Escolha o cliente</option>
                    <option :value="client.empresa" v-for="(client, index) in clients" :key="index">{{ client.empresa }}
                    </option>
                </select>
            </label>
            <label for="type_service" class="flex flex-col w-[90%]">
                <span class="font-semibold tracking-wider">Tipo de Serviço</span>
                <select name="type_service" id="type_service"
                    class="h-8 uppercase text-center border-1 bg-gray-100 outline-none rounded-lg border-gray-300"
                    v-model="type_service">
                    <option value="" disabled selected>Escolha uma opção</option>
                    <option value="entrega">Entrega</option>
                    <option value="coleta">Coleta</option>
                    <option value="outro">Outro</option>
                </select>
            </label>
            <label for="description_service" class="flex flex-col w-[90%] gap-1">
                <span class="font-semibold tracking-wider">Descreva o serviço</span>
                <textarea name="description_service" id="description_service"
                    class="outline-none border-2 border-gray-300 focus:border-green-300"
                    v-model="description_service"></textarea>
            </label>
            <button type="submit"
                class="w-[150px] h-[40px] rounded-2xl bg-blue-400 text-white font-bold tracking-wider">Solicitar</button>
        </form>
        <Error :msgError="msgError" v-if="msgError"/>
        <success :msgSuccess="msgSucess"  v-if="msgSucess"/>
    </section>
</template>