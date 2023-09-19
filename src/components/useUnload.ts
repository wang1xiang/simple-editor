import { Ref, onBeforeMount, onMounted } from 'vue'

const useUnload = (editorRef: Ref<HTMLDivElement | undefined>) => {
  
  const saveEditor = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    const html = editorRef.value?.innerHTML || ''
    localStorage.setItem('editor-content', html)
  }
  onMounted(() => window.addEventListener('beforeunload', saveEditor))
  onBeforeMount(() => window.removeEventListener('beforeunload', saveEditor))

  onMounted(() => {
    const html = localStorage.getItem('editor-content') || ''
    editorRef.value && (editorRef.value.innerHTML = html)
  })
}

export default useUnload
