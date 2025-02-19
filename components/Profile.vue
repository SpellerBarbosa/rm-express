<script setup>
import { ref } from 'vue';
import { watchEffect } from 'vue';
import { useUserStore } from '~/store/useUserStore';
import { apiEndPoints, getApiUrl } from '#imports';


const urlSecure = getApiUrl(apiEndPoints.SECURE);
const token = useCookie('token');
const user = ref("");
const role = ref("");
const sector = ref("");
const menu = ref(true);
const submenu = ref({
    solicitacoes: false,
    cadastrar: false,
    consultar: false
});
const useUser = useUserStore();


watchEffect(async () => {
    const response = await fetch(urlSecure, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token.value}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        user.value = data.token.user
        sector.value = data.token.sector
        role.value = data.token.role
        useUser.setUserInfo(data.token.id, data.token.user, data.token.role, data.token.sector);
    }
})

const toggleMenu = () => {
    menu.value = !menu.value
}

const toggleSubMenu = (menu) => {
    closedOthersMenu(menu)
    submenu.value[menu] = !submenu.value[menu]
}

const closedOthersMenu = (currentMenu) => {
    Object.keys(submenu.value).forEach(menu => {
        if (menu !== currentMenu) {
            submenu.value[menu] = false
        }
    })
}


</script>
<template>
    <section
        class=" h-screen grid bg-gray-700 place-items-center gap-4 md:max-w-[50%] lg:max-w-[30%] lg:w-[30%] lg:animate-none xl:max-w-[25%] absolute"
        :class="menu ? 'animate-menuClosed w-0 overflow-hidden ' : 'w-[80%] animate-menuOpen'">
        <button
            class=" w-[45px] h-[45px] fixed top-2 left-2 grid place-items-center outline-none z-50 opacity-100 lg:hidden"
            @click="toggleMenu()">
            <span class="w-[90%] h-0.5 bg-black block"
                :class="menu ? 'transition-all duration-500 ' : 'transform rotate-45 translate-y-[15px] transition-all duration-500 bg-white'"></span>

            <span class="w-[90%] h-0.5 bg-black block"
                :class="menu ? 'transition-all duration-500' : 'opacity-0'"></span>

            <span class="w-[90%] h-0.5 bg-black block"
                :class="menu ? 'transition-all duration-500' : 'transform -rotate-45 -translate-y-[13px] transition-all duration-500 bg-white'"></span>
        </button>
        <article class="w-[90%] h-[25vh] bg-[rgba(186,186,189,0.4)] rounded-2xl mt-[60px] grid grid-cols-6 grid-rows-5 gap-4 p-4 text-white shadow-xs shadow-white">
            <p class="row-start-1 col-start-2 col-span-4 text-2xl text-center sm360:text-[15px]">Bem vindo!</p>
            <h1 class="col-start-1 col-span-6 row-start-2 uppercase font-bold sm360:text-[12px]  md:text-xl">{{ user }}</h1>
            <p class="col-start-1 col-span-5 row-start-3 capitalize text-sm md:text-lg">Setor: {{ sector }}</p>
            <p class="col-start-1 col-span-5 row-start-4 capitalize text-sm md:text-lg">Acesso: {{ role }}</p>
        </article>

        <nav class="w-[90%] h-[65vh] text-white">
            <ul class="w-full h-[90%] flex flex-col gap-1">
                <li class="border-1 border-white w-full h-[35px] grid">
                    <span class="p-1 ml-4 uppercase tracking-wider">Inicio</span>
                </li>
                <li class="flex flex-col relative border-1 border-white w-full h-auto gap-1"
                    @click="toggleSubMenu('solicitacoes')">
                    <span class="p-1 ml-4 uppercase tracking-wider">Solicitações</span>
                    <div class="w-[30px] h-[30px] grid place-items-center absolute right-2 top-0">
                        <span
                            class="w-[50%] h-0.5 bg-white block transform rotate-40 translate-y-[6px] -translate-x-[6px]"
                            :class="submenu['solicitacoes'] ? 'rotate-140 transition-all duration-500' : 'transition-all duration-500'"></span>
                        <span
                            class="w-[50%] h-0.5 bg-white block transform -rotate-40 -translate-y-[8px] translate-x-[5px]"
                            :class="submenu['solicitacoes'] ? '-rotate-140 transition-all duration-500' : 'transition-all duration-500'"></span>
                    </div>
                    <ul :class="submenu['solicitacoes'] ? 'visible  w-[97%] m-auto grid gap-0.5' : 'hidden'">
                        <li
                            class="w-[100%] h-[30px] border border-[rgba(255,255,255,0.2)] text-center m-auto uppercase tracking-wider text-sm bg-[rgb(46,46,46,0.6)] p-1">
                            Solicitar</li>
                        <li
                            class="w-[100%] h-[30px] border border-[rgba(255,255,255,0.2)] text-center m-auto uppercase tracking-wider text-sm bg-[rgb(46,46,46,0.6)] p-1 mb-1">
                            Ver Solicitações</li>
                    </ul>
                </li>
                <li class="flex flex-col relative border-1 border-white w-full h-auto gap-1"
                    @click="toggleSubMenu('cadastrar')">
                    <span class="p-1 ml-4 uppercase tracking-wider">cadastrar</span>
                    <div class="w-[30px] h-[30px] grid place-items-center absolute right-2 top-0">
                        <span
                            class="w-[50%] h-0.5 bg-white block transform rotate-40 translate-y-[6px] -translate-x-[6px]"
                            :class="submenu['cadastrar'] ? 'rotate-140 transition-all duration-500' : 'transition-all duration-500'"></span>
                        <span
                            class="w-[50%] h-0.5 bg-white block transform -rotate-40 -translate-y-[8px] translate-x-[5px]"
                            :class="submenu['cadastrar'] ? '-rotate-140 transition-all duration-500' : 'transition-all duration-500'"></span>
                    </div>
                    <ul :class="submenu['cadastrar'] ? 'visible  w-[97%] m-auto grid gap-0.5' : 'hidden'">
                        <li
                            class="w-[100%] h-[30px] border border-[rgba(255,255,255,0.2)] text-center m-auto uppercase tracking-wider text-sm bg-[rgba(46,46,46,0.6)] p-1">
                            colaboladores</li>
                        <li
                            class="w-[100%] h-[30px] border border-[rgba(255,255,255,0.2)] text-center m-auto uppercase tracking-wider text-sm bg-[rgb(46,46,46,0.6)] p-1 mb-1">
                            empresas</li>
                    </ul>
                </li>
                <li class="flex flex-col relative border-1 border-white w-full h-auto gap-1"
                    @click="toggleSubMenu('consultar')">
                    <span class="p-1 ml-4 uppercase tracking-wider">consultar</span>
                    <div class="w-[30px] h-[30px] grid place-items-center absolute right-2 top-0">
                        <span
                            class="w-[50%] h-0.5 bg-white block transform rotate-40 translate-y-[6px] -translate-x-[6px]"
                            :class="submenu['consultar'] ? 'rotate-140 transition-all duration-500' : 'transition-all duration-500'"></span>
                        <span
                            class="w-[50%] h-0.5 bg-white block transform -rotate-40 -translate-y-[8px] translate-x-[5px]"
                            :class="submenu['consultar'] ? '-rotate-140 transition-all duration-500' : 'transition-all duration-500'"></span>
                    </div>
                    <ul :class="submenu['consultar'] ? 'visible  w-[97%] m-auto grid gap-0.5' : 'hidden'">
                        <li
                            class="w-[100%] h-[30px] border border-[rgba(255,255,255,0.2)] text-center m-auto uppercase tracking-wider text-sm bg-[rgba(46,46,46,0.6)] p-1">
                            colaboladores</li>
                        <li
                            class="w-[100%] h-[30px] border border-[rgba(255,255,255,0.2)] text-center m-auto uppercase tracking-wider text-sm bg-[rgb(46,46,46,0.6)] p-1 mb-1">
                            empresas</li>
                    </ul>
                </li>

            </ul>
        </nav>
    </section>
</template>