import { ref, computed } from 'vue'
import { useScrollLock } from '@vueuse/core'
import { useApplicationManager } from 'nuxt-desktop/runtime/composables/useApplicationManager'
import { useApplicationEntries } from 'nuxt-desktop/runtime/composables/useApplicationEntries'

const open = ref(false)
const searchQuery = ref('')

function isValidEntry(
  entry: any
): entry is any {
  return Boolean(entry?.application?.id && entry.command)
}

export function useNuxtStartMenu() {
  const applicationManager = useApplicationManager()
  const applicationEntries = useApplicationEntries()

  const bodyScrollLock = useScrollLock(
    typeof document !== 'undefined' ? document.body : null,
  )

  const allEntries = computed(() => {
    return (applicationEntries as any)
      .sortedAppEntries('title', 'primary')
      .value.filter(isValidEntry)
  })

  const filteredEntries = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    const entries = allEntries.value
    if (!q) return entries
    return entries.filter((entry: any) =>
      (entry.title ?? '').toLowerCase().includes(q),
    )
  })

  function syncScrollLock() {
    bodyScrollLock.value = open.value
  }

  function toggle() {
    open.value = !open.value
    searchQuery.value = ''
    syncScrollLock()
  }

  function close() {
    open.value = false
    searchQuery.value = ''
    bodyScrollLock.value = false
  }

  async function launchEntry(entry: any) {
    if (!isValidEntry(entry)) return
    await applicationManager.execAppCommand(
      entry.application.id,
      entry.command,
    )
    close()
  }

  return {
    open,
    searchQuery,
    allEntries,
    filteredEntries,
    toggle,
    close,
    launchEntry,
  }
}
