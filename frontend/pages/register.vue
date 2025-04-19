<template>
  <div class="p-8 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="register">
      <input v-model="form.name" type="text" placeholder="Name" class="input" />
      <input v-model="form.email" type="email" placeholder="Email" class="input" />
      <input v-model="form.phone" type="text" placeholder="Phone" class="input" />
      <input v-model="form.password" type="password" placeholder="Password" class="input" />
      <button class="btn">Register</button>
    </form>
    <p class="mt-4">Have an account? <NuxtLink to="/login">Login</NuxtLink></p>
  </div>
</template>

<script setup>
const form = reactive({ name: '', email: '', phone: '', password: '' })
const { login } = useAuth()
const config = useRuntimeConfig()

const register = async () => {
  const { data, error } = await useFetch(`${config.public.apiBase}/auth/register`, {
    method: 'POST',
    body: form
  })
  if (data.value) login(data.value)
  if (error.value) alert('Error: ' + error.value.data.msg)
}
</script>

<style scoped>
.input { @apply block w-full mb-4 p-2 border border-gray-300 rounded; }
.btn { @apply w-full bg-blue-600 text-white p-2 rounded; }
</style>
