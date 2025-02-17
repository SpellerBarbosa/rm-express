<script setup lang="ts">
import Home from '~/components/Home.vue';

</script>




<template>
    <main class="w-screen h-screen flex flex-col bg-gray-400">
        <Profile/>
        <Home class="hidden"/>
        <Request />
    </main>
</template>