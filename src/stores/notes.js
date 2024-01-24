import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),
  getters: {
    // getNoteByID
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === id)
    }
  },
  actions: {
    // fetch all notes
    async fetchNotes() {
      try {
        const response = await axios.get('http://localhost:3000/notes')
        this.notes = response.data
      } catch (error) {
        console.error('ERROR Fetching Notes :', error)
      }
    },
    async addNote(note) {
      try {
        await axios.post('http://localhost:3000/notes', note)
        this.notes = this.fetchNotes()
      } catch (error) {
        console.error('ERROR Adding Note :', error)
      }
    },
    async editNote(note) {
      try {
        await axios.put(`http://localhost:3000/notes/${note.id}`, note)
        this.notes = this.fetchNotes()
      } catch (error) {
        console.error('ERROR Editing Note :', error)
      }
    },
    async removeNote(noteId) {
      try {
        await axios.delete(`http://localhost:3000/notes/${noteId}`)
        this.notes = this.fetchNotes()
      } catch (error) {
        console.error('ERROR Deleteing Note :', error)
      }
    }
  }
})
