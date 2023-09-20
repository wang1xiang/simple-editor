import { ref } from 'vue'
export type ToolType = {
  label: string
  commandId: string
  value?: string
}

export const tools: ToolType[] = [
  { label: '撤销', commandId: 'undo' },
  { label: '恢复', commandId: 'redo' },
  { label: '加粗', commandId: 'bold' },
  { label: '倾斜', commandId: 'italic' },
  { label: '下划线', commandId: 'underline' },
  { label: '删除线', commandId: 'strikeThrough' },

  { label: '设置字体大小', commandId: 'fontSize', value: '22' },
  { label: '字体背景色', commandId: 'backColor', value: '#FFFF02' },
  { label: '字体颜色', commandId: 'foreColor', value: '#FF0000' },

  { label: '链接', commandId: 'createLink', value: 'https://www.baidu.com/' },
  { label: '有序列表', commandId: 'insertOrderedList' },
  { label: '无序列表', commandId: 'insertUnorderedList' },

  { label: '剪切选中文字', commandId: 'cut' },
  { label: '复制选中文字', commandId: 'copy' },
  { label: '删除选中文字', commandId: 'delete' },

  { label: '清除格式', commandId: 'removeFormat' },
]

export type SelectionToolType = {
  label: string
  action: () => void
}
const selection = window.getSelection()

export const selectionTools: SelectionToolType[] = [
  {
    label: '获取选区文本内容',
    action: () => {
      const text = selection?.toString()
      text ? window.alert(text) : window.alert('未选择任何选区')
    },
  },
  {
    label: '获取选区',
    action: () => {
      if (selection?.rangeCount === 0) {
        window.alert('没有选区存在，无法添加内容')
        return
      }
      const range = selection?.getRangeAt(0)
      console.log(range)
    },
  },
  {
    label: '删除选区',
    action: () => {
      const count = selection?.rangeCount || 0
      for (let i = 0; i < count; i++) {
        const range = selection?.getRangeAt(0) as Range
        selection?.removeRange(range)
      }
      // or
      selection?.removeAllRanges()
    },
  },
  {
    label: '添加选区',
    action: () => {
      const editor = document.querySelector('.editor')!
      const range = document.createRange()
      // selectNode 选中第n个子节点
      // const sizeStr = window.prompt('选择第几个子节点', '1') || '1'
      // const size = parseInt(sizeStr)
      // if (isNaN(size)) return
      // range.selectNode(editor.childNodes[size])

      // setStart/setEnd 选中第n个子节点到第m个子节点
      // const startOffsetStr = window.prompt('从第几个子节点开始', '1') || '1'
      // const endOffsetStr = window.prompt('到第几个子节点结束', '5') || '1'
      // const startOffset = parseInt(startOffsetStr)
      // const endOffset = parseInt(endOffsetStr)
      // if (isNaN(startOffset) || isNaN(endOffset)) return
      // range.setStart(editor, startOffset)
      // range.setEnd(editor, endOffset)

      // setStart/setEnd 选中第n个子节点的开始到结束范围
      // const n = 1
      // const startOffsetStr = window.prompt('从第一个子节点的第几个位置开始', '1') || '1'
      // const endOffsetStr = window.prompt('到第一个子节点的第几个位置结束', '5') || '1'
      // const startOffset = parseInt(startOffsetStr)
      // const endOffset = parseInt(endOffsetStr)
      // if (isNaN(startOffset) || isNaN(endOffset)) return
      // range.setStart(editor.childNodes[n], startOffset)
      // range.setEnd(editor.childNodes[n], endOffset)

      // setStartBefore/setEndBefore 选中第n个子节点到第m个子节点
      const startOffsetStr = window.prompt('从第几个子节点前开始', '1') || '1'
      const endOffsetStr = window.prompt('到第几个子节点末尾结束', '5') || '1'
      const startOffset = parseInt(startOffsetStr)
      const endOffset = parseInt(endOffsetStr)
      if (isNaN(startOffset) || isNaN(endOffset)) return
      range.setStartBefore(editor.childNodes[startOffset])
      range.setEndBefore(editor.childNodes[endOffset])

      selection?.removeAllRanges()
      selection?.addRange(range)
    },
  },
  {
    label: '设置光标位置',
    action: () => {
      // 1. 使用setStart/setStart实现
      const editor = document.querySelector('.editor')!
      const range = document.createRange()
      // range.setStart(editor.childNodes[1], 1)
      // selection?.removeAllRanges()
      // selection?.addRange(range)
      // 2. 使用range.collapse实现
      // range.setStart(editor.childNodes[1], 1)
      // range.setEnd(editor.childNodes[11], 1)
      // selection?.removeAllRanges()
      // selection?.addRange(range)
      // range?.collapse(false);
      // 3. 使用selection.collapse实现
      selection?.collapse(editor.childNodes[1], 12)
    },
  },
  {
    label: '光标聚焦在选区前/后',
    action: () => {
      // 1. 使用collapseToStart
      selection?.collapseToStart()
      // 2. 使用collapseToEnd
      // selection?.collapseToEnd()
    },
  },
  {
    label: '往选区插入内容',
    action: () => {
      if (selection?.rangeCount === 0) {
        window.alert('没有选区存在，无法添加内容')
        return
      }
      const editor = document.querySelector('.editor') as HTMLElement
      const range = selection?.getRangeAt(0)
      const mark = document.createElement('mark')
      mark.innerText = `@xxx`
      mark.contentEditable = 'false'
      mark.className = 'comment-mentions-label'
      range?.deleteContents()
      range?.insertNode(mark)
      range?.setStartAfter(mark)
      editor.focus()
    },
  },
  {
    label: '加粗当前选区',
    action: () => {
      if (selection?.rangeCount === 0) {
        window.alert('没有选区存在，无法添加内容')
        return
      }
      const range = selection?.getRangeAt(0)
      const strong = document.createElement('strong')
      range?.surroundContents(strong)
    },
  },
]
