<script setup>
import { useNotesStore } from '@/stores/notes'
import { useRouter } from 'vue-router'
const store = useNotesStore()
const router = useRouter()
const { note } = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const goToEdit = () => {
  router.push(`/editor/edit/${note.id}`)
}

const removeNote = () => {
  store.removeNote(note.id)
}
</script>

<template>
  <div class="p-4 border rounded shadow-sm">
    <h3 class="text-lg font-semibold">{{ note.title }}</h3>
    <p class="text-gray-700">{{ note.content }}</p>
    <div class="mt-4 flex space-x-2">
      <button
        @click="goToEdit"
        class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Edit
      </button>
      <button
        @click="removeNote"
        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped></style>
