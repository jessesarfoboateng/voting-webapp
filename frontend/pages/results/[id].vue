<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">{{ result?.question }}</h1>
    <div v-if="result">
      <div v-for="(opt, i) in result.options" :key="i" class="mb-2">
        <p>{{ opt.text }} - {{ opt.votes }} votes</p>
        <div class="h-2 bg-blue-200 rounded">
          <div
            class="h-full bg-blue-600 rounded"
            :style="{ width: percent(opt.votes) + '%' }"
          ></div>
        </div>
      </div>
      <p class="mt-4 text-sm">Total Votes: {{ result.totalVotes }}</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const result = ref(null)

onMounted(async () => {
  const { data } = await useFetch(`${config.public.apiBase}/polls/${route.params.id}/results`)
  result.value = data.value
})

const percent = (votes) => {
  const total = result.value.totalVotes || 1
  return ((votes / total) * 100).toFixed(1)
}
</script>
