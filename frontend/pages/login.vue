<template>
  <div class="p-8 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="loginUser">
      <input v-model="form.email" type="email" placeholder="Email" class="input" />
      <input v-model="form.password" type="password" placeholder="Password" class="input" />
      <button class="btn">Login</button>
    </form>
    <p class="mt-4">No account? <NuxtLink to="/register">Register</NuxtLink></p>
  </div>
</template>

<script setup>
const form = reactive({ email: '', password: '' })
const { login } = useAuth()
const config = useRuntimeConfig()
const router = useRouter()

const loginUser = async () => {
  const { data, error } = await useFetch(`${config.public.apiBase}/auth/login`, {
    method: 'POST',
    body: form
  })
  if (data.value) {
    login(data.value)
    router.push('/polls')
  }
  if (error.value) alert('Error: ' + error.value.data.msg)
}
</script>

<style scoped>
.input { @apply block w-full mb-4 p-2 border border-gray-300 rounded; }
.btn { @apply w-full bg-green-600 text-white p-2 rounded; }
</style>
