<script setup>

</script>

<template>
    <section class=" w-screen h-screen grid place-items-center gap-4 bg-gray-900 opacity-90">
        <form class="w-[340px] h-[340px] bg-white rounded-3xl relative opacity-85 flex flex-col items-center justify-center gap-4 font-obitron shadow-2gitxl shadow-gray-600 sm:w-[500px] sm:h-[500px] sm:gap-8">
            <img src="~/assets/img/logo.png" alt="logo" class="w-[120px] border-white border-2 rounded-full absolute -top-16 left-0 right-0  m-auto opacity-95 sm:w-[180px] sm:-top-22">

            <label for="user" class="flex sm:w-[80%]">
                <img src="~/assets/img/user_icon.png" alt=" Icone input usuario" class="w-[35px] sm:w-[50px] p-1 bg-gray-400 border-2 border-gray-500">
                <input type="text" class="border-2 border-gray-500 uppercase text-center sm:w-full sm:text-2xl outline-none"  placeholder="Usuario">
            </label>
            <label for="user" class="flex sm:w-[80%]">
                <img src="~/assets/img/pass_icon.png" alt=" Icone input usuario" class="w-[35px] sm:w-[50px] p-1 bg-gray-400 border-2 border-gray-500">
                <input type="password" class="border-2 border-gray-500 uppercase text-center sm:w-full sm:text-2xl outline-none"  placeholder="senha">
            </label>
            <button type="submit" class="w-[150px] p-2 border-2 rounded-2xl bg-gray-600 text-white tracking-wider uppercase text-xs cursor-pointer sm:p-4 sm:w-[200px] sm:text-lg sm:-tracking-wider">Entrar</button>
        </form>
    </section>
</template>