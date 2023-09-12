export type ToolType = {
  label: string,
  commandId: string,
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
