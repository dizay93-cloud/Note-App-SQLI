import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'

import NoteEditor from '../NoteEditor.vue'
import { useNotesStore } from '@/stores/notes'

vi.mock('axios')
vi.mock('vue-router')
vi.mock('uuid', () => ({ v4: () => 'y4zydyu566' }));

describe('NoteEditor', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: vi.fn(),
      go: vi.fn()
    })
  })
  afterEach(() => {
    useRouter().push.mockReset()
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('renders properly', async () => {
    const mockNote = {
      id: '1',
      content: 'test content',
      title: 'test title'
    }
    const wrapper = mount(NoteEditor, {
      global: {
        stubs: ['RouterLink'],
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              notes: { notes: [mockNote] }
            }
          })
        ]
      }
    })

    expect(wrapper.exists()).toBeTruthy()
  })

  it('dispatch add note properly', async () => {
    const wrapper = mount(NoteEditor, {
      global: {
        stubs: ['RouterLink'],
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true
          })
        ]
      }
    })
    const store = useNotesStore()
    const router = useRouter()
    router.useRoute.mockReturnValueOnce({
        params: { id: undefined }
    });
    await wrapper.get('form').trigger('submit')
    expect(store.addNote).toBeCalledTimes(1)
    expect(store.addNote).toBeCalledWith({ title: '', content: '' })
    expect(router.push).toBeCalledTimes(1)
    expect(router.push).toBeCalledWith({ path: '/noteList' })
  })

  it('dispatch edit note properly', async () => {
    const wrapper = mount(NoteEditor, {
      global: {
        stubs: ['RouterLink'],
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: true
          })
        ]
      }
    })
    const store = useNotesStore()
    const router = useRouter()

    await wrapper.get('form').trigger('submit')
    expect(store.addNote).toBeCalledTimes(1)
    router.useRoute.mockReturnValueOnce({
        params: { id: '1' }
    });
    expect(store.editNote).toBeCalledWith({ title: '', content: '' })
    expect(router.push).toBeCalledTimes(1)
    expect(router.push).toBeCalledWith({ path: '/noteList' })
  })
})