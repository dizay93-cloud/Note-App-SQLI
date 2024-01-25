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
})
