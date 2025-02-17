<script setup>
import Profile from '~/components/Profile.vue';
import { watchEffect } from 'vue';
import { ref } from 'vue';

const requestUrl = 'http://localhost:3001/api/requests';
const pending = ref({});
const completed = ref({});
const waiting = ref({});

const requests = async() =>{
        const response = await fetch(requestUrl,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data = await response.json();
        pending.value = data.requests.filter((request) => request.status === 'pendente');
        completed.value = data.requests.filter((request) => request.status === 'concluidos');
        waiting.value = data.requests.filter((request) => request.status === 'aguardando');


    }

watchEffect(async()=>{
    requests();
})
</script>

<template>
    <section class="w-screen h-screen flex flex-col bg-gray-400">
        <section class="w-full h-[10vh] bg-gray-600 grid place-items-center mb-[10px] lg:w-[70%] lg:ml-[30%] xl:w-[75%] xl:ml-[25%]">
            <span class="text-xl font-bold">R.M EXPRESS</span>
        </section>
        <section class="w-full h-full flex gap-2 bg-[url(/assets/img/bg-image.png)] bg-auto bg-no-repeat bg-center lg:w-[70%] lg:ml-[30%] xl:w-[75%] xl:ml-[25%]">
            <div class=" h-[80px] bg-blue-400 rounded-2xl grid place-items-center font-bold text-white tracking-wider text-center w-[calc(100%/2)]">
                <h1 class="uppercase text-sm">Solicitações Aguardando</h1>
                <p class="text-xl">{{ waiting.length }}</p>
            </div>
            <div class="w-[calc(100%/2)] h-[80px] bg-yellow-400 rounded-2xl grid place-items-center font-bold text-white tracking-wider text-center">
                <h1 class="uppercase text-sm">Solicitações pendentes</h1>
                <p class="text-xl">{{ pending.length }}</p>
            </div>
            <div class="w-[calc(100%/2)] h-[80px] bg-green-400 rounded-2xl grid place-items-center font-bold text-white tracking-wider text-center">
                <h1 class="uppercase text-sm">Solicitações Conluidas</h1>
                <p class="text-xl">{{ completed.length }}</p>
            </div>
        </section>
    </section>
</template>