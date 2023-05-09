<template>
  <Layout>
    <div class="md:w-3/4 w-full mx-auto mb-12 flex justify-between">
      <h1 class="md:text-2xl text-base flex items-center">Novo Paciente</h1>

      <button
        @click="goBack()"
        class="md:h-10 h-8 md:px-4 px-3 md:text-base text-sm rounded bg-blue-600 text-neutral-50 uppercase"
      >
        Voltar
      </button>
    </div>

    <patient-form submitText="Cadastrar" />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Layout from "@/layouts/Dashboard/Layout.vue";
import PatientForm from "@/components/PatientForm/index.vue";

export default defineComponent({
  name: "AdminPatientNew",
  components: {
    Layout,
    PatientForm
  },
  methods: {
    goBack() {
      this.$router.push("/admin/");
    }
  }
});
</script>
