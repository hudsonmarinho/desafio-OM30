<template>
  <div class="app-container">
    <div class="box-main">
      <header>
        <a class="logo-admin" href="/">
          <img :src="logo" alt="OM30" width="300" height="51" />
        </a>
      </header>

      <main>
        <form @submit.prevent="submitForm" class="form-login">
          <div>
            <label for="email">Email:</label>
            <input
              id="email"
              name="email"
              v-model="formValues.email"
              placeholder="Digite seu email"
              :class="[
                errors.email ? 'border-red-500' : 'border-gray-300',
                'group w-full px-2 py-2 border rounded'
              ]"
            />
            <span class="text-xs text-red-500">{{ errors.email }}</span>
          </div>

          <div>
            <label for="password">Senha:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              v-model="formValues.password"
              :class="[
                errors.password ? 'border-red-500' : 'border-gray-300',
                'group w-full px-2 py-2 border rounded'
              ]"
            />
            <span class="text-xs text-red-500">{{ errors.password }}</span>
          </div>

          <div>
            <button
              type="submit"
              class="w-full md:text-base text-sm rounded bg-blue-500 hover:bg-blue-700 text-neutral-50 ease-in-out duration-200"
            >
              Entrar
            </button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import md5 from "md5";
import * as Yup from "yup";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("O campo Email é obrigatório"),
  password: Yup.string().required("O campo Senha é obrigatório")
});

export default defineComponent({
  name: "PagesHome",
  data() {
    return {
      logo: require("@/assets/images/logo.svg")
    };
  },

  setup() {
    const router = useRouter();
    const toast = useToast();

    const formValues = ref<any>({
      email: ""
    });

    const errors = ref<Record<string, string>>({});

    const submitForm = async () => {
      try {
        await loginSchema.validate(formValues.value, {
          abortEarly: false
        });

        const { data } = await axios.get(
          `http://localhost:3000/users?email=${formValues.value.email}`
        );

        if (!data.length) {
          toast.error("Usuário ou senha não encontrado!");
        } else {
          const user = data[0];

          if (user.password !== md5(formValues.value.password)) {
            toast.error("Usuário ou senha não encontrado!");
          } else {
            toast.success("Login efetuado com sucesso!");
            router.push("/admin");
          }
        }
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors: Record<string, string> = {};

          error.inner.forEach((e: any) => {
            validationErrors[e.path] = e.message;
          });

          errors.value = validationErrors;
        } else {
          toast.error(error.message);
          console.log("ERRO: ", error);
        }
      }
    };

    return {
      formValues,
      submitForm,
      errors
    };
  }
});
</script>

<style lang="scss" scoped>
@import "./styles.scss";
</style>
