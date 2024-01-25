// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useNotesStore } from '../../stores/notes'
import { describe, it, expect, beforeEach, test, vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

describe('notes Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('initial notes state', () => {
    const noteStore = useNotesStore()
    expect(noteStore.notes).length(0)
  })

  test('makes a GET request to fetch notes', async () => {
    const noteStore = useNotesStore()
    const usersMock = [
      {
        id: '9a9c3e27-fb1a-4cca-8f28-395906d1b926',
        title: 'Gym',
        content: 'Gym at 8PM'
      },
      {
        id: 'ff87f2c1-cbf2-46ff-83a3-743167a77f32',
        title: 'Metting',
        content: 'Tomorrow 10 AM to 12 AM'
      }
    ]

    axios.get.mockResolvedValue({
      data: usersMock
    })

    const notes = await noteStore.fetchNotes()
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/notes')
    expect(notes).toStrictEqual(usersMock)
  })

  test('makes a POST request to create a new note', async () => {
    const noteStore = useNotesStore()
    const newNoteMock = {
      id: vi.mock('uuid', () => ({ v4: () => '12335556' })),
      title: 'Football',
      content: 'Football at 6PM'
    }

    axios.post.mockResolvedValue({
      data: newNoteMock
    })

    const newNote = await noteStore.addNote(newNoteMock)

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/notes', newNoteMock)
    expect(newNote).toStrictEqual(newNoteMock)
  })

  test('makes a Put request to edit a note', async () => {
    const noteStore = useNotesStore()
    const editedNote = {
      id: 'ff87f2c1-cbf2-46ff-83a3-743167a77f32',
      title: 'Metting',
      content: 'Tomorrow 10 AM to 12 AM'
    }

    axios.post.mockResolvedValue({
      data: editedNote
    })

    const editNote = await noteStore.edit(editedNote)

    expect(axios.put).toHaveBeenCalledWith(
      `http://localhost:3000/notes/${editedNote.id}`,
      editedNote
    )
    expect(editNote).toStrictEqual(editedNote)
  })

  test('makes a DELETE request to delete a note', async () => {
    const noteStore = useNotesStore()
    const noteId = 'ff87f2c1-cbf2-46ff-83a3-743167a77f32'

    axios.delete.mockResolvedValue()

    const deleteResult = await noteStore.removeNote(noteId)
    const notes = await noteStore.fetchNotes()
    expect(axios.put).toHaveBeenCalledWith(`http://localhost:3000/notes/${noteId}`)
    expect(notes).not().toEqual(deleteResult)
  })
})
