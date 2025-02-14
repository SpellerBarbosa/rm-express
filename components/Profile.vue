<script setup>
import { ref } from 'vue';
import { watchEffect } from 'vue';
import { useUrlsStore } from '~/store/useUrlsStore';

const useUrl = useUrlsStore();
const fixedUrls = useUrl.getFixesUrls;
const token = useCookie('token');
const user = ref("");
const role = ref("");

watchEffect(async()=>{
    const response = await fetch(fixedUrls.secureUrl,{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${token.value}`
        }
    });

    const data = await response.json();

})
</script>
<template>
    <section>
        <article>
            <h1>{{ user }}</h1>
            
        </article>
    </section>
</template>