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
const hasSelection = () => {
  if (selection?.rangeCount === 0) {
    window.alert('没有选区存在')
    return false
  }
  return true
}
export type SelectionToolType = {
  label: string
  isWrapLine?: boolean
  action: () => void
}
const selection = window.getSelection()

export const selectionTools: SelectionToolType[] = [
  {
    label: '获取选区',
    action: () => {
      if (!hasSelection()) return
      const range = selection?.getRangeAt(0)
      console.log(range)
    },
  },
  {
    label: '获取选区文本内容',
    action: () => {
      const text = selection?.toString()
      text ? window.alert(text) : window.alert('未选择任何选区')
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
    isWrapLine: true
  },
  {
    label: '添加选区：单个子节点',
    action: () => {
      const editor = document.querySelector('.editor')!
      const range = document.createRange()
      // selectNode 选中第n个子节点
      const sizeStr = window.prompt('选择第几个子节点', '1') || '1'
      const size = parseInt(sizeStr)
      if (isNaN(size)) return
      range.selectNode(editor.childNodes[size])
      selection?.removeAllRanges()
      selection?.addRange(range)
    },
  },
  {
    label: '添加选区：子节点',
    action: () => {
      const editor = document.querySelector('.editor')!
      const range = document.createRange()
      // setStart/setEnd 选中第n个子节点到第m个子节点
      const startOffsetStr = window.prompt('从第几个子节点开始', '1') || '1'
      const endOffsetStr = window.prompt('到第几个子节点结束', '5') || '1'
      const startOffset = parseInt(startOffsetStr)
      const endOffset = parseInt(endOffsetStr)
      if (isNaN(startOffset) || isNaN(endOffset)) return
      range.setStart(editor, startOffset)
      range.setEnd(editor, endOffset)

      selection?.removeAllRanges()
      selection?.addRange(range)
    },
  },
  {
    label: '添加选区：文本节点',
    action: () => {
      const editor = document.querySelector('.editor')!
      const range = document.createRange()
      // setStart/setEnd 选中第n个子节点的开始到结束范围
      const n = 2
      const child = editor.childNodes[n] as any
      const startOffsetStr =
        window.prompt('从第一个子节点的第几个位置开始', '2') || '1'
      const endOffsetStr =
        window.prompt('到第一个子节点的第几个位置结束', '5') || '1'
      const startOffset = parseInt(startOffsetStr)
      const endOffset = parseInt(endOffsetStr)
      if (isNaN(startOffset) || isNaN(endOffset)) return
      range.setStart(child?.firstChild, startOffset)
      range.setEnd(child?.firstChild, endOffset)

      selection?.removeAllRanges()
      selection?.addRange(range)
    },
  },
  {
    label: '添加选区：子节点范围',
    action: () => {
      const editor = document.querySelector('.editor')!
      const range = document.createRange()
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
    isWrapLine: true
  },
  {
    label: '向左修改选区',
    action: () => {
      if (!hasSelection()) return
      selection?.modify('extend', 'left', 'character')
    },
  },
  {
    label: '向右修改选区',
    action: () => {
      if (!hasSelection()) return
      selection?.modify('extend', 'right', 'word')
    },
    isWrapLine: true
  },
  {
    label: '设置光标特定位置',
    action: () => {
      // 1. 使用setStart/setStart实现
      const editor = document.querySelector('.editor')!
      const range = document.createRange()
      const startNodeStr = window.prompt('第几个子节点', '2') || '1'
      const startOffsetStr = window.prompt('节点第几个位置', '5') || '1'
      const startOffset = parseInt(startOffsetStr)
      const startNode = parseInt(startNodeStr)
      if (isNaN(startOffset) || isNaN(startNode)) return
      // @ts-ignore
      range.setStart(editor.childNodes[startNode]?.firstChild, startOffset)
      selection?.removeAllRanges()
      selection?.addRange(range)
      // 2. 使用selection.collapse实现
      // selection?.collapse(editor.childNodes[startNode], startOffset)
    },
  },
  {
    label: '向左移动光标',
    action: () => {
      if (!hasSelection()) return
      selection?.modify('move', 'left', 'character')
    },
  },
  {
    label: '向右移动光标',
    action: () => {
      if (!hasSelection()) return
      selection?.modify('move', 'right', 'word')
    },
  },
  {
    label: '使光标聚焦在选区前',
    action: () => {
      if (!hasSelection()) return
      const editor = document.querySelector('.editor') as HTMLElement
      const range = selection?.getRangeAt(0)
      // 1. 使用range.collapse实现
      range?.collapse(true)
      // 2. 使用collapseToStart
      // selection?.collapseToStart()
      editor.focus()
    },
  },
  {
    label: '使光标聚焦在选区后',
    action: () => {
      if (!hasSelection()) return
      const editor = document.querySelector('.editor') as HTMLElement
      const range = selection?.getRangeAt(0)
      // 1. 使用range.collapse实现
      range?.collapse(false)
      // 2. 使用collapseToEnd
      // selection?.collapseToEnd()
      editor.focus()
    },
    isWrapLine: true
  },
  {
    label: '往选区插入内容',
    action: () => {
      if (!hasSelection()) return
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
      if (!hasSelection()) return
      const range = selection?.getRangeAt(0)
      const strong = document.createElement('strong')
      range?.surroundContents(strong)
    },
  },
]

/** 默认内容 */
export const DEFAULT_CONTENT =
  '<p style="box-sizing: inherit; margin: 0px;">软件开发最大的麻烦事之一，就是环境配置。用户计算机的环境都不相同，你怎么知道自家的软件，能在那些机器跑起来？</p><p style="box-sizing: inherit; margin: 0px;"><br></p><p style="box-sizing: inherit; margin: 0px;">用户必须保证两件事：操作系统的设置，各种库和组件的安装。只有它们都正确，软件才能运行。举例来说，安装一个 Python 应用，计算机必须有 Python 引擎，还必须有各种依赖，可能还要配置环境变量。</p><p style="box-sizing: inherit; margin: 0px;"><br></p><p style="box-sizing: inherit; margin: 0px;">如果某些老旧的模块与当前环境不兼容，那就麻烦了。开发者常常会说："它在我的机器可以跑了"（It works on my machine），言下之意就是，其他机器很可能跑不了。</p><p style="box-sizing: inherit; margin: 0px;"><br></p><p style="box-sizing: inherit; margin: 0px;">环境配置如此麻烦，换一台机器，就要重来一次，旷日费时。很多人想到，能不能从根本上解决问题，软件可以带环境安装？也就是说，安装的时候，把原始环境一模一样地复制过来。</p>'
