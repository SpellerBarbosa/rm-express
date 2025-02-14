<script setup>
const props = defineProps({
    msgError:{
        type: String
    }
})

</script>
<template>
    <span class="w-[80%] h-[50px] bg-red-500 rounded-2xl absolute overflow-hidden flex justify-center items-center text-white  font-obitron font-semibold top-4 sm:w-[60%] sm:text-xl lg:w-[40%] lg:text-2xl">
        <p>{{ msgError }}</p>
        <div class="w-full h-1 bg-white absolute bottom-0 animate-regressive"></div>
    </span>
</template>