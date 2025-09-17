<template>
  <NuxtLayout>
    <div
      class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Create a new account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="handleRegistration" @keydown.enter="handleRegistration">
          <UITwInput
            inputId="username"
            inputName="username"
            inputLabel="User name"
            :inputValue="username"
            inputPlaceholder="User name"
            :inputAutocomplete=true
            containerInputClass=""
            containerInputGroupClass=""
            inputClass="block w-full rounded-md px-3 py-1.5 text-base border-[1px] outline-1 -outline-offset-1 outline-black border-indigo-500placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            inputLabelClass="block text-sm/6 font-medium"
            @update:inputValue="(newValue: string) => (form.username = newValue)"
          />
          <UITwInput
            inputId="email"
            inputName="email"
            inputLabel="Email Address"
            :inputValue="email"
            inputPlaceholder="Email"
            :inputAutocomplete=true
            containerInputClass=""
            containerInputGroupClass=""
            inputClass="block w-full rounded-md px-3 py-1.5 text-base border-[1px] outline-1 -outline-offset-1 outline-black border-indigo-500placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            @update:inputValue="(newValue: string) => (form.email = newValue)"
            inputLabelClass="block text-sm/6 font-medium"
          />
          <UITwInput
            inputId="password"
            inputName="password"
            inputLabel="Password"
            :inputValue="password"
                :inputType="passwordType"
            inputPlaceholder="Password"
            :inputAutocomplete=true
            containerInputClass=""
            containerInputGroupClass=""
            inputClass="block w-full rounded-md px-3 py-1.5 text-base border-[1px] outline-1 -outline-offset-1 outline-black border-indigo-500placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
             @update:inputValue="(newValue:string) => (form.password = newValue)"
                @on-click-password="
                  (showPassword:boolean) =>
                    (passwordType = onClickPassword(passwordType, showPassword))
                "
            inputLabelClass="block text-sm/6 font-medium"
          />

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm/6 text-gray-400">
          Already have an account
          {{ " " }}
          <a
            href="/register"
            class="font-semibold text-indigo-400 hover:text-indigo-300"
            >Login here!</a
          >
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/store/auth";
let passwordType = ref("password");

const username = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
interface FormData {
  username: string
  email: string
  password: string
}

const form = ref<FormData>({
  username:'',
  email:'',
  password:''
})
const auth = useAuthStore();
const router = useRouter();

const handleRegistration = async () => {
  console.log(form.value)
};
</script>
