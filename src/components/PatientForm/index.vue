<template>
  <form
    @submit.prevent="submitForm"
    class="md:w-3/4 w-full mx-auto rounded-md bg-white p-6 shadow-md"
  >
    <div class="flex md:flex-row flex-col mb-6">
      <div class="lg:w-3/4 md:w-2/4 w-full space-y-1 mr-6 md:mb-0 mb-6">
        <label
          for="full_name"
          class="text-sm block font-medium text-gray-700 cursor-pointer font-normal"
        >
          Nome Completo<span class="text-red-600">*</span>:
        </label>

        <input
          id="full_name"
          name="full_name"
          v-model="formValues.full_name"
          :class="[
            errors.full_name ? 'border-red-500' : 'border-gray-300',
            'group w-full px-2 py-2 border rounded'
          ]"
        />
        <span class="text-xs text-red-500">{{ errors.full_name }}</span>
      </div>

      <div class="lg:w-1/4 md:w-2/4 w-full space-y-1">
        <label
          for="birth_date"
          class="text-sm block font-medium text-gray-700 cursor-pointer font-normal"
        >
          Data de Nascimento<span class="text-red-600">*</span>:
        </label>

        <input
          id="birth_date"
          name="birth_date"
          type="date"
          v-model="formValues.birth_date"
          :class="[
            errors.birth_date ? 'border-red-500' : 'border-gray-300',
            'group w-full px-2 py-2 border rounded'
          ]"
        />
        <span class="text-xs text-red-500">{{ errors.birth_date }}</span>
      </div>
    </div>

    <div class="w-full space-y-1 mb-6">
      <label
        for="full_name_mother"
        class="text-sm block font-medium text-gray-700 cursor-pointer font-normal"
      >
        Nome Completo da mãe<span class="text-red-600">*</span>:
      </label>

      <input
        id="full_name_mother"
        name="full_name_mother"
        v-model="formValues.full_name_mother"
        :class="[
          errors.full_name_mother ? 'border-red-500' : 'border-gray-300',
          'group w-full px-2 py-2 border rounded'
        ]"
      />
      <span class="text-xs text-red-500">{{ errors.full_name_mother }}</span>
    </div>

    <div class="flex md:flex-row flex-col mb-6">
      <div class="w-full space-y-1 mr-6 md:mb-0 mb-6">
        <label
          for="cpf"
          class="text-sm block font-medium text-gray-700 cursor-pointer font-normal"
        >
          CPF<span class="text-red-600">*</span>:
        </label>

        <input
          id="cpf"
          name="cpf"
          v-mask="'###.###.###-##'"
          v-model="formValues.cpf"
          :class="[
            errors.cpf ? 'border-red-500' : 'border-gray-300',
            'group w-full px-2 py-2 border rounded'
          ]"
        />
        <span class="text-xs text-red-500">{{ errors.cpf }}</span>
      </div>

      <div class="w-full space-y-1">
        <label
          for="cns"
          class="text-sm block font-medium text-gray-700 cursor-pointer font-normal"
        >
          CNS<span class="text-red-600">*</span>:
        </label>

        <input
          id="cns"
          name="cns"
          v-model="formValues.cns"
          :class="[
            errors.cns ? 'border-red-500' : 'border-gray-300',
            'group w-full px-2 py-2 border rounded'
          ]"
        />
        <span class="text-xs text-red-500">{{ errors.cns }}</span>
      </div>
    </div>

    <div class="flex md:flex-row flex-col">
      <div class="lg:w-1/4 md:w-2/4 w-full mr-6 md:mb-0 mb-6">
        <label
          for="cep"
          class="text-sm block font-medium text-gray-700 cursor-pointer font-normal"
        >
          CEP:
        </label>

        <input
          id="zipcode"
          name="zipcode"
          v-mask="'#####-###'"
          v-model="zipcode"
          @blur="searchAddress"
          class="group w-full px-2 py-2 border rounded border-gray-300"
        />
      </div>

      <div class="lg:w-3/4 md:w-2/4 w-full">
        <label
          for="address"
          class="text-sm block font-medium text-gray-700 cursor-pointer font-normal"
        >
          Endereço Completo<span class="text-red-600">*</span>:
        </label>

        <input
          id="address"
          name="address"
          v-model="formValues.address"
          :class="[
            errors.address ? 'border-red-500' : 'border-gray-300',
            'group w-full px-2 py-2 border rounded'
          ]"
        />
        <span class="text-xs text-red-500">{{ errors.address }}</span>
      </div>
    </div>

    <div class="mt-6">
      <input type="file" ref="fileInput" @change="handleFileInput" />
    </div>

    <div class="text-right">
      <button
        type="submit"
        class="mt-4 w-40 h-10 rounded bg-green-600 text-neutral-50 uppercase hover:bg-green-700 transition"
      >
        {{ submitText }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import * as Yup from "yup";
import axios, { AxiosResponse } from "axios";

import { mask } from "vue-the-mask";

import { Patient } from "@/types/Patient";
import { API_URL } from "@/utils/api";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("O nome completo é obrigatório"),
  full_name_mother: Yup.string().required("O nome da mãe é obrigatório"),
  birth_date: Yup.date().required("A data de nascimento é obrigatória"),
  cpf: Yup.string()
    .required("O CPF é obrigatório")
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "O CPF deve estar no formato xxx.xxx.xxx-xx"
    ),
  cns: Yup.string().required("O CNS é obrigatório"),
  address: Yup.string().required("O endereço é obrigatório")
});

export default defineComponent({
  name: "PatientForm",

  directives: { mask },

  props: {
    initialValues: {
      type: Object,
      default: () => ({})
    },

    submitText: {
      type: String,
      default: "Enviar"
    }
  },

  data() {
    return { zipcode: "", file: null };
  },

  setup(props) {
    const router = useRouter();
    const toast = useToast();

    const formValues = ref<Patient>({
      id: props.initialValues.id || "",
      full_name: props.initialValues.full_name || "",
      full_name_mother: props.initialValues.full_name_mother || "",
      birth_date: props.initialValues.birth_date || "",
      cpf: props.initialValues.cpf || "",
      cns: props.initialValues.cns || "",
      address: props.initialValues.address || ""
    });

    const errors = ref<Record<string, string>>({});

    watch(
      () => props.initialValues,
      (newFormValues) => {
        formValues.value.id = newFormValues.id;
        formValues.value.full_name = newFormValues.full_name;
        formValues.value.full_name_mother = newFormValues.full_name_mother;
        formValues.value.birth_date = newFormValues.birth_date;
        formValues.value.cpf = newFormValues.cpf;
        formValues.value.cns = newFormValues.cns;
        formValues.value.address = newFormValues.address;
      },
      { deep: true }
    );

    const submitForm = async () => {
      const currentId = formValues.value.id;

      const urlPost = currentId
        ? API_URL(`/patients/${currentId}`)
        : API_URL(`/patients`);

      const msgSucess = currentId
        ? "Paciente alterado com sucesso!"
        : "Cadastro efetuado com sucesso!";

      try {
        await validationSchema.validate(formValues.value, {
          abortEarly: false
        });

        if (currentId) {
          await axios.patch(urlPost, formValues.value);
        } else {
          await axios.post(urlPost, formValues.value);
        }

        toast.success(msgSucess);
        router.push("/admin");
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
      errors,
      submitTextButton: props.submitText
    };
  },

  methods: {
    handleFileInput(event: Event) {
      // TODO - Implementar upload da imagem
    },

    searchAddress() {
      axios
        .get(`https://viacep.com.br/ws/${this.zipcode}/json/`)
        .then((response) => {
          const { logradouro, bairro, localidade, uf } = response.data;
          let address = "".split("");

          if (logradouro) {
            address.push(`${logradouro}`);
          }

          if (bairro) {
            address.push(`, ${bairro}`);
          }

          if (localidade && uf) {
            address.push(`, ${localidade}/${uf}`);
          }

          this.formValues.address = address.join("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
});
</script>
