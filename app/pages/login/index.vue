<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-900">
    <body class="h-full">
    ```
  -->
  <NuxtLayout>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight ">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-sm/6 font-medium ">Email address</label>
          <div class="mt-2">
            <input v-model="email"
                type="email"
                name="email"
                id="email" autocomplete="email" required="" class="block w-full rounded-md  px-3 py-1.5 text-base border-[1px]  outline-1 -outline-offset-1 outline-black border-indigo-500placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium ">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input v-model="password"
                type="password"
                name="password"
                id="password" autocomplete="current-password" required="" class="block w-full rounded-md  px-3 py-1.5 text-base border-[1px]  outline-1 -outline-offset-1 outline-black border-indigo-500placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold  hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
        </div>
      </form>

    
    </div>
  </div>
  </NuxtLayout>
</template>
<script setup lang="ts">

const { login } = useAuth();
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  try {
    console.log(email.value)
    await login({ email: email.value, password: password.value })
    // redirigir al dashboard o home
    await navigateTo('/')
  } catch (err: any) {
    error.value = err?.statusMessage || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>