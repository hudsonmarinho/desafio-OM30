<template>
  <Layout>
    <div class="flex justify-between">
      <h1>Paciêntes</h1>
      <router-link to="/admin">Voltar</router-link>
    </div>

    <div>Lista de Paciêntes</div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/layouts/Dashboard/Layout.vue";

export default defineComponent({
  name: "AdminPatientsIndex",
  components: { Layout }
});
</script>
