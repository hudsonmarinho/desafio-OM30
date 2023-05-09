<template>
  <div class="flex flex-col items-center justify-center text-center h-screen">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">
      404: Página não encontrada
    </h1>

    <p class="text-lg text-gray-700 mb-8">
      A página que você está procurando não existe.
    </p>

    <router-link
      to="/"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >Voltar para a página inicial</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageNotFound"
});
</script>
