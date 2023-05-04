<template>
  <div>
    <Header />
    <h1>Home</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header/index.vue";

export default defineComponent({
  name: "PagesHome",
  components: {
    Header
  }
});
</script>
