<template>
  <img :src="imageSrc" :alt="imageAlt" :title="imageTitle" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Image",
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    imageSrc() {
      return this.src || "/user-default.png";
    },
    imageAlt() {
      return this.alt || "Imagem Alt";
    },
    imageTitle() {
      return this.title;
    }
  }
});
</script>
