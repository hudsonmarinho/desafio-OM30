<template>
  <div class="flex">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
    ></div>

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="h-16 flex items-center bg-gray-800 px-4">
        <div class="flex items-center">
          <img :src="logo" style="width: 35px" />
          <span class="mx-2 text-2xl font-semibold text-white">OM30</span>
        </div>
      </div>

      <nav class="mt-4">
        <p class="pl-4 text-xs font-semibold mb-4 text-gray-400">MENU</p>

        <router-link
          class="flex items-center px-2 py-2 duration-200 border-l-4"
          :class="[$route.name === 'UIElements' ? activeClass : inactiveClass]"
          to="/admin"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
              fill="currentColor"
            />
            <path
              d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
              fill="currentColor"
            />
            <path
              d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
              fill="currentColor"
            />
            <path
              d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
              fill="currentColor"
            />
          </svg>

          <span class="mx-4 font-normal">Pacientes</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useSidebar } from "@/hooks/useSidebar";

const isOpen = useSidebar();

export default defineComponent({
  name: "Sidebar",
  data() {
    return {
      isOpen,
      activeClass: ref(
        "bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100"
      ),
      inactiveClass: ref(
        "border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
      ),
      logo: require("@/assets/images/icon-logo.svg")
    };
  }
});
</script>
