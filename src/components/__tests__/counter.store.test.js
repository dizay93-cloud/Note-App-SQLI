// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../../stores/counter'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('increments', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(2)
    counter.increment()
    expect(counter.count).toBe(3)
  })

  // it('doubleCount', () => {
  //   const counter = useCounterStore()
  //   expect(counter.count).toBe(2)
  //   expect(counter.doubleCount)
  //   expect(counter.count).toBe(4)
  // })
})
