<script setup lang="ts">
import { selectionTools, tools, ToolType } from './constants'
import userRangeSelection from './useRangeSelection'
import { ref, onMounted } from 'vue'
import useUnload from './useUnload';

const handleClick = (item: ToolType) => {
  const { commandId, value } = item
  restoreSelection()
  // editorRef.value?.focus()
  document.execCommand(commandId, false, value)
}

const editorRef = ref<HTMLDivElement>()
const { restoreSelection } = userRangeSelection(editorRef)

useUnload(editorRef)

</script>

<template>
  <div class="btn-group">
    <input
      v-for="item in tools"
      class="btn"
      type="button"
      :value="item.label"
      @click="handleClick(item)"
    />
  </div>
  <div
    class="editor"
    ref="editorRef"
    contenteditable="true"
    width="800px"
    height="500px"
  ></div>
  <input
    v-for="item in selectionTools"
    class="btn"
    type="button"
    :value="item.label"
    @click="item.action"
  />
</template>

<style scoped>
.btn-group {
  margin: 15px 0;
}

.btn {
  color: #494949;
  background-color: #fff;
  border: 1px solid #494949;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 4px;
}

.editor {
  border: 1px solid #424242;
  width: 800px;
  height: 500px;
  padding: 8px 12px;
  border-radius: 6px;
  overflow: auto;
}
a {
  cursor: pointer;
  text-decoration: none;
}
</style>
