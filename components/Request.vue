<script setup>
import { ref } from 'vue';

const date = new Date;
const day = date.getDate();
let month = date.getMonth();
const year = date.getFullYear();
const date_request = ref()

if(month <= 10){
    date_request.value = `${day}/0${month}/${year}`
}

</script>
<template>
    <section class="w-screen h-screen bg-gray-400 flex flex-col items-center">
        <section class="w-full h-[10vh] bg-gray-700 grid place-items-center">
            <h1 class="uppercase text-2xl font-bold">r.m express</h1>
        </section>
        <form class="w-[90%] h-[80vh] bg-white  m-auto rounded-2xl flex flex-col items-center justify-center ">
            <span class="">Solicitar</span>
            <label for="date_request">Data Solicitação
                <input type="text" disabled  v-model="date_request">
            </label>
        </form>
    </section>
</template>