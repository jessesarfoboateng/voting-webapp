<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Active Polls</h1>
    <div v-for="poll in polls" :key="poll._id" class="mb-4 p-4 border rounded">
      <h2 class="font-semibold">{{ poll.question }}</h2>
      <NuxtLink :to="`/vote/${poll._id}`" class="text-blue-600">Vote</NuxtLink> |
      <NuxtLink :to="`/results/${poll._id}`" class="text-green-600">View Results</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const polls = ref([])
const config = useRuntimeConfig()

onMounted(async () => {
  const { data } = await useFetch(`${config.public.apiBase}/polls`)
  if (data.value) polls.value = data.value
})
</script>
