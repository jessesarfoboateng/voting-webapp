<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">{{ poll?.question }}</h1>
    <div v-if="poll">
      <button
        v-for="(opt, i) in poll.options"
        :key="i"
        @click="castVote(i)"
        class="block w-full mb-2 p-2 border rounded hover:bg-blue-100"
      >{{ opt.text }}</button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const poll = ref(null)
const token = useState('token')

onMounted(async () => {
  const { data } = await useFetch(`${config.public.apiBase}/polls/${route.params.id}`)
  poll.value = data.value
})

const castVote = async (index) => {
  const { error } = await useFetch(`${config.public.apiBase}/polls/${route.params.id}/vote`, {
    method: 'POST',
    headers: { Authorization: token.value },
    body: { optionIndex: index }
  })
  if (!error.value) alert('Vote submitted!')
  else alert(error.value.data.msg)
}
</script>
