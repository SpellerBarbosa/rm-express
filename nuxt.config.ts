import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css:['~/assets/css/index.css'],
  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt'
  ],
  googleFonts:{
    families:{
      Orbitron: [300, 400, 500, 700, 900]
    },
    display: 'swap'
  },
  vite:{
    plugins:[
      tailwindcss(),
    ],
  },
});
