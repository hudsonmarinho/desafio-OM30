<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Sidebar from "@/layouts/Dashboard/Sidebar.vue";
import Header from "@/layouts/Dashboard/Header.vue";

export default defineComponent({
  name: "PagesHeader",
  components: {
    Sidebar,
    Header
  }
});
</script>
