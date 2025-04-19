<template>
  <div class="p-8 max-w-xl mx-auto">
    <h1 class="text-xl font-bold mb-4">Create a Poll</h1>
    <form @submit.prevent="createPoll">
      <input v-model="question" type="text" placeholder="Poll question" class="input" />
      <div v-for="(opt, i) in options" :key="i" class="flex mb-2">
        <input v-model="options[i]" class="flex-1 input" />
        <button @click.prevent="removeOption(i)" class="ml-2 text-red-600">X</button>
      </div>
      <button @click.prevent="addOption" class="text-sm text-blue-600 mb-4">+ Add Option</button>
      <button class="btn">Create Poll</button>
    </form>
  </div>
</template>

<script setup>
const question = ref('')
const options = ref(['', ''])
const config = useRuntimeConfig()
const token = useState('token')

const addOption = () => options.value.push('')
const removeOption = (i) => options.value.splice(i, 1)

const createPoll = async () => {
  const { error } = await useFetch(`${config.public.apiBase}/polls`, {
    method: 'POST',
    headers: { Authorization: token.value },
    body: { question: question.value, options: options.value }
  })
  if (!error.value) alert('Poll created!')
  else alert(error.value.data.msg)
}
</script>

<style scoped>
.input { @apply block w-full mb-2 p-2 border border-gray-300 rounded; }
.btn { @apply w-full bg-purple-600 text-white p-2 rounded; }
</style>
