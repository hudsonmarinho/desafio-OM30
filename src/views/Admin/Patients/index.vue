<template>
  <Layout>
    <div class="flex justify-between">
      <h1 class="text-2xl">Lista de paciêntes</h1>
      <button
        @click="newPatient()"
        class="w-60 h-10 rounded bg-blue-600 text-neutral-50 uppercase"
      >
        Novo Paciênte
      </button>
    </div>

    <div class="flex justify-between mb-4 mt-4 items-center">
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
            <table class="min-w-full">
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
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                  >
                    Editar/Remover
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
                        <img
                          class="w-10 h-10 rounded-full"
                          :src="patient.photo"
                          :alt="patient.full_name"
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
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Patient } from "@/types/Patient";
import Layout from "@/layouts/Dashboard/Layout.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

export default defineComponent({
  name: "AdminPatientsIndex",
  components: { Layout, Menu, MenuButton, MenuItems, MenuItem },
  data() {
    return {
      patients: [] as Patient[],
      search: ""
    };
  },

  async created() {
    const response = await fetch("http://localhost:3000/patients");
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
      this.$router.push(`/admin/patient/show/${id}`);
    },

    editPatient(id: number) {
      this.$router.push(`/admin/patient/edit/${id}`);
    },

    removePatient(id: number) {
      // TODO: Implementar a exclusão de paciente
      console.log(id);
    }
  }
});
</script>
