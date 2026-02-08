<template>
  <div class="markdown-editor">
    <!-- Toolbar for mobile-friendly buttons -->
    <div class="toolbar mb-2 flex flex-wrap gap-2">
      <button
        type="button"
        @click="insertMarkdown('**', '**')"
        class="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        @click="insertMarkdown('*', '*')"
        class="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
      >
        <i>I</i>
      </button>
      <button
        type="button"
        @click="insertMarkdown('`', '`')"
        class="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
      >
        Code
      </button>
      <button
        type="button"
        @click="insertMarkdown('## ', '')"
        class="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
      >
        H2
      </button>
      <button
        type="button"
        @click="insertMarkdown('- ', '')"
        class="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
      >
        List
      </button>
      <button
        type="button"
        @click="insertMarkdown('> ', '')"
        class="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
      >
        Quote
      </button>
    </div>

    <!-- Editor/Preview Toggle -->
    <div class="mb-2 flex gap-2">
      <button
        @click="viewMode = 'edit'"
        :class="[
          'rounded px-4 py-2 text-sm font-medium',
          viewMode === 'edit'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]"
      >
        Edit
      </button>
      <button
        @click="viewMode = 'preview'"
        :class="[
          'rounded px-4 py-2 text-sm font-medium',
          viewMode === 'preview'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]"
      >
        Preview
      </button>
    </div>

    <!-- Editor -->
    <div v-if="viewMode === 'edit'" class="editor-container">
      <textarea
        :value="modelValue"
        @input="
          $emit(
            'update:modelValue',
            ($event.target as HTMLTextAreaElement).value,
          )
        "
        class="min-h-[400px] w-full rounded border border-gray-300 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your markdown here..."
        :style="{ fontSize: '16px' }"
      ></textarea>
    </div>

    <!-- Preview -->
    <div v-else class="preview-container">
      <div
        class="prose prose-sm min-h-[400px] max-w-none rounded border border-gray-300 bg-white p-4"
        v-html="renderedMarkdown"
      ></div>
    </div>

    <!-- Character count -->
    <div class="mt-2 text-right text-sm text-gray-500">
      {{ modelValue.length }} characters
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const viewMode = ref<'edit' | 'preview'>('edit')

// Simple markdown renderer (you can replace with a library like marked or markdown-it)
const renderedMarkdown = computed(() => {
  const markdown = props.modelValue || ''

  // Convert markdown to HTML (simple implementation)
  return (
    markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.+?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/gim, '<em>$1</em>')
      // Code
      .replace(/`(.+?)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
      // Lists
      .replace(/^- (.+)$/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      // Blockquotes
      .replace(/^> (.+)$/gim, '<blockquote>$1</blockquote>')
      // Paragraphs
      .split('\n\n')
      .map(p => (p.trim() ? `<p>${p}</p>` : ''))
      .join('')
      // Line breaks
      .replace(/\n/gim, '<br>')
  )
})

function insertMarkdown(before: string, after: string) {
  const textarea = document.querySelector('textarea') as HTMLTextAreaElement
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = props.modelValue.substring(start, end)
  const newText =
    props.modelValue.substring(0, start) +
    before +
    selectedText +
    after +
    props.modelValue.substring(end)

  emit('update:modelValue', newText)

  // Restore focus and cursor position
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(
      start + before.length,
      start + before.length + selectedText.length,
    )
  }, 0)
}
</script>

<style scoped>
.prose {
  @apply text-gray-800;
}

.prose h1 {
  @apply mb-2 mt-4 text-2xl font-bold;
}

.prose h2 {
  @apply mb-2 mt-3 text-xl font-bold;
}

.prose h3 {
  @apply mb-1 mt-2 text-lg font-semibold;
}

.prose p {
  @apply mb-2;
}

.prose ul {
  @apply mb-2 list-inside list-disc;
}

.prose li {
  @apply mb-1;
}

.prose code {
  @apply rounded bg-gray-100 px-1 py-0.5 font-mono text-sm;
}

.prose blockquote {
  @apply my-2 border-l-4 border-gray-300 pl-4 italic;
}

.prose a {
  @apply text-blue-600 underline;
}
</style>
