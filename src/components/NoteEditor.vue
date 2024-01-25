<script setup>
import { ref, watch, onMounted } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useRoute, useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
const store = useNotesStore()
const route = useRoute()
const router = useRouter()
const note = ref({
  title: '',
  content: ''
})
const noteId = route.params.id
onMounted(() => {
  if (noteId) {
    const currentNote = store.getNoteById(noteId)
    if (currentNote) {
      note.value.title = currentNote.title
      note.value.content = currentNote.content
    }
  }
}),
  watch(route, async (r) => {
    if (!r.params.id) {
      note.value.title = ''
      note.value.content = ''
    }
  })
function submitNote() {
  const noteId = route.params.id
  const data = { title: note.value.title, content: note.value.content }
  if (noteId) {
    store.editNote({ id: noteId, ...data })
  } else {
    store.addNote({ id: uuidv4(), ...data })
  }
  router.push({ path: '/noteList' })
}
</script>

<template>
  <div class="p-4 border rounded shadow-lg">
    <form @submit.prevent="submitNote">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          id="title"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.title"
        />
      </div>
      <div class="mb-4">
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
        <textarea
          id="content"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.content"
          rows="4"
        />
      </div>
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
        save
      </button>
    </form>
  </div>
</template>
