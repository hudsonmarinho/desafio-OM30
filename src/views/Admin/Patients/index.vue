<template>
  <Layout>
    <div class="lg:w-3/4 w-full mx-auto mb-12 flex justify-between">
      <h1 class="md:text-2xl text-base flex items-center">
        Lista de pacientes
      </h1>

      <button
        @click="newPatient()"
        class="md:h-10 h-8 md:px-4 px-3 md:text-base text-sm rounded bg-blue-600 text-neutral-50 uppercase"
      >
        Novo Paciente
      </button>
    </div>

    <div
      class="flex justify-between items-center top-2 left-12 lg:left-64 right-20 pl-4 fixed"
    >
      <span class="absolute inset-y-0 left-4 flex items-center pl-3">
        <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <input
        type="text"
        v-model="search"
        placeholder="Buscar paciente pelo nome"
        class="w-full pl-10 py-3 px-4"
      />
    </div>

    <div class="lg:w-3/4 w-full mx-auto mt-10">
      <div class="flex flex-col mt-8">
        <div
          class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <div
            class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
            v-if="filteredPatients.length > 0"
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
                          {{ formatCPF(patient.cpf) }}
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
                      {{ formatCPF(patient.cpf) }}
                    </div>
                  </td>

                  <td class="text-right pr-6 border-b border-gray-200">
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton
                          class="w-10 h-10 flex justify-center items-center text-white rounded-full border-2 border-gray-400"
                        >
                          <svg
                            style="transform: rotate(90deg)"
                            fill="#666"
                            height="20px"
                            width="20px"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 32.055 32.055"
                            xml:space="preserve"
                          >
                            <g>
                              <path
                                d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
		C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
		s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
		c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
                              />
                            </g>
                          </svg>
                        </MenuButton>
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

          <div v-else class="min-w-full text-center">
            Paciente não encontrado!
          </div>
        </div>
      </div>
    </div>

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
                      <strong>CPF:</strong> {{ formatCPF(current_patient.cpf) }}
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
import { maskCPF } from "@/utils/cpf-mask";

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
    const response = await fetch(API_URL("/patients?_sort=id&_order=DESC"));
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

    formatCPF(cpf: string) {
      return maskCPF(cpf);
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
