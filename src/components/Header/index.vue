<template>
  <header class="bg-white flex justify-between">
    <h1>Desafio OM30</h1>

    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/admin">Admin</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PagesHeader"
});
</script>

<style lang="scss" scoped>
@import "./styles.scss";
</style>
