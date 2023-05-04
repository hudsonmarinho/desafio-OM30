<template>
  <Layout>
    <div class="flex justify-between">
      <h1 class="text-2xl">Lista de pacientes</h1>
      <button
        @click="newPatient()"
        class="w-60 h-10 rounded bg-blue-600 text-neutral-50 uppercase"
      >
        Novo Paciente
      </button>
    </div>

    <div v-if="patient" class="flex justify-between mb-4 mt-4 items-center">
      <input
        type="text"
        v-model="search"
        placeholder="Buscar nome do(a) paciente"
        class="w-full rounded border border-neutral-300 rounded py-3 px-4"
      />
    </div>

    <div class="mt-10">
      <div class="flex flex-col mt-8">
        <div
          class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <div
            class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
          >
            <table class="list-patients min-w-full">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Nome Completo
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Nome da Mãe
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    CPF
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white">
                <tr v-for="(patient, index) in filteredPatients" :key="index">
                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap relative"
                  >
                    <a
                      @click="showPatient(patient.id)"
                      class="absolute inset-x-0 inset-y-0 cursor-pointer"
                    ></a>

                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <Image
                          :src="patient.photo"
                          :alt="patient.full_name"
                          :title="patient.full_name"
                          class="w-10 h-10 rounded-full"
                        />
                      </div>

                      <div class="ml-4">
                        <div
                          class="text-sm font-medium leading-5 text-gray-900"
                        >
                          {{ patient.full_name }}
                        </div>
                        <div class="text-sm leading-5 text-gray-500">
                          {{ patient.cpf }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap relative"
                  >
                    <a
                      @click="showPatient(patient.id)"
                      class="absolute inset-x-0 inset-y-0 cursor-pointer"
                    ></a>

                    <div class="text-sm leading-5 text-gray-900">
                      {{ patient.full_name_mother }}
                    </div>
                  </td>

                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap relative"
                  >
                    <a
                      @click="showPatient(patient.id)"
                      class="absolute inset-x-0 inset-y-0 cursor-pointer"
                    ></a>

                    <div class="text-sm leading-5 text-gray-900">
                      {{ patient.cpf }}
                    </div>
                  </td>

                  <td class="text-right pr-6 border-b border-gray-200">
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton
                          class="w-10 h-10 flex justify-center items-center text-white rounded bg-gray-300 hover:bg-gray-400"
                          >...</MenuButton
                        >
                      </div>

                      <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                      >
                        <MenuItems
                          class="absolute right-0 w-32 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none"
                        >
                          <div class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                              <button
                                @click="editPatient(patient.id)"
                                :class="[
                                  active
                                    ? 'bg-gray-400 text-white'
                                    : 'text-gray-900',
                                  'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                ]"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="w-5 h-5 mr-2 text-violet-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  :stroke="[active ? '#fff' : '#666']"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                                Editar
                              </button>
                            </MenuItem>

                            <MenuItem v-slot="{ active }">
                              <button
                                @click="removePatient(patient.id)"
                                :class="[
                                  active
                                    ? 'bg-red-400 text-white'
                                    : 'text-gray-900',
                                  'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                ]"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="w-5 h-5 mr-2 text-violet-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  :stroke="[active ? '#fff' : '#666']"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Remover
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL Mover para um "Context" -->
    <div class="container mx-auto">
      <div class="flex justify-center">
        <div
          v-show="isOpenModal"
          class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
        >
          <div class="max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl">{{ current_patient.full_name }}</h3>

              <svg
                @click="closeModal"
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 text-red-900 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div class="max-w-sm w-full lg:max-w-full lg:flex">
              <div
                class="lg:w-48 w-full lg:h-48 h-56 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                :style="{
                  background: 'center center no-repeat',
                  backgroundSize: 'cover',
                  backgroundImage: `url(${
                    current_patient.photo
                      ? current_patient.photo
                      : '/user-default.png'
                  })`
                }"
                title="Woman holding a mug"
              ></div>

              <div
                class="lg:p-4 lg:pt-1 pt-4 flex flex-col justify-between leading-normal"
              >
                <div class="mb-8">
                  <div class="text-gray-700 text-base">
                    <p v-if="current_patient.full_name">
                      <strong>Nome completo:</strong>
                      {{ current_patient.full_name }}
                    </p>

                    <p v-if="current_patient.full_name_mother">
                      <strong>Nome da mãe:</strong>
                      {{ current_patient.full_name_mother }}
                    </p>

                    <p v-if="current_patient.birth_date">
                      <strong>Data de Nascimento:</strong>
                      {{ current_patient.birth_date }}
                    </p>

                    <p v-if="current_patient.cpf">
                      <strong>CPF:</strong> {{ current_patient.cpf }}
                    </p>

                    <p v-if="current_patient.cns">
                      <strong>CNS:</strong> {{ current_patient.cns }}
                    </p>

                    <p v-if="current_patient.address" class="mt-4">
                      <strong>Endereço completo:</strong><br />
                      {{ current_patient.address }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 flex justify-between">
              <div></div>
              <button
                @click="editPatient(current_patient.id)"
                class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import axios from "axios";

import { Patient } from "@/types/Patient";
import { API_URL } from "@/utils/api";

import Layout from "@/layouts/Dashboard/Layout.vue";
import Image from "@/components/Image/index.vue";

export default defineComponent({
  name: "AdminPatientsIndex",
  components: { Layout, Menu, MenuButton, MenuItems, MenuItem, Image },
  data() {
    let isOpenModal = ref(false);

    return {
      patients: [] as Patient[],
      current_patient: [] as Patient[],
      search: "",
      isOpenModal
    };
  },

  async created() {
    const response = await fetch(API_URL("/patients"));
    const data = await response.json();
    this.patients = data;
  },

  computed: {
    filteredPatients(): Patient[] {
      return this.patients.filter((patient: Patient) =>
        patient.full_name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },

  methods: {
    async newPatient() {
      this.$router.push("/admin/patient/new");
    },

    showPatient(id: number) {
      axios
        .get(API_URL(`/patients/${id}`))
        .then((response) => {
          this.current_patient = response.data;
          this.openModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editPatient(id: number) {
      this.$router.push(`/admin/patient/edit/${id}`);
    },

    async removePatient(id: number) {
      if (confirm("Deseja realmente excluir este paciente?")) {
        await fetch(API_URL(`/patients/${id}`), {
          method: "DELETE"
        });

        this.patients = this.patients.filter((patient) => patient.id !== id);
      }
    },

    closeModal() {
      this.isOpenModal = false;
    },

    openModal() {
      this.isOpenModal = true;
    }
  }
});
</script>
