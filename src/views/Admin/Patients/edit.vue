<template>
  <Layout>
    <div class="md:w-3/4 w-full mx-auto mb-12 flex justify-between">
      <h1 class="md:text-2xl text-base flex items-center">Editar Paciente</h1>

      <button
        @click="goBack()"
        class="md:h-10 h-8 md:px-4 px-3 md:text-base text-sm rounded bg-blue-600 text-neutral-50 uppercase"
      >
        Voltar
      </button>
    </div>

    <patient-form submitText="Salvar" :initialValues="patient" v-if="patient" />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { API_URL } from "@/utils/api";

import Layout from "@/layouts/Dashboard/Layout.vue";
import PatientForm from "@/components/PatientForm/index.vue";

export default defineComponent({
  name: "AdminPatientEdit",
  components: {
    Layout,
    PatientForm
  },

  data() {
    return {
      patient: {}
    };
  },

  async created() {
    const patientId = this.$route.params.id;
    const { data } = await axios.get(API_URL(`/patients/${patientId}`));

    this.patient = data;
  },

  mounted() {
    const patientId = this.$route.params.id;

    axios
      .get(API_URL(`/patients/${patientId}`))
      .then((response) => {
        this.patient = response.data;
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  },

  methods: {
    goBack() {
      this.$router.push("/admin/");
    }
  }
});
</script>
