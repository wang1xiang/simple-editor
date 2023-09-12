import { Ref, onBeforeMount, onMounted } from 'vue'

const userRangeSelection = (inputRef: Ref<HTMLDivElement | undefined>) => {
  let saveRange: Range | null = null
  const saveSelection = () => {
    const sel = window.getSelection()!
    if (sel.getRangeAt && sel.rangeCount) {
      saveRange = sel.getRangeAt(0)
    }
  }

  const restoreSelection = () => {
    if (!saveRange) return
    const sel = window.getSelection()!
    sel.removeAllRanges()
    sel.addRange(saveRange)
  }
  onMounted(() => {
    const editorDOM = inputRef.value
    editorDOM?.addEventListener('blur', saveSelection)
  })
  onBeforeMount(() => {
    const editorDOM = inputRef.value
    editorDOM?.removeEventListener('blur', saveSelection)
  })
  return {
    restoreSelection,
  }
}

export default userRangeSelection
