<template>
  <div>
    <TiptapEditorContent :editor="editor" class="editor-frame" />
    <div v-if="editor" class="mt-2 flex justify-between">
      <div class="flex space-x-1">
        <UButton @click="editor.chain().focus().toggleBold().run()" color="gray"
          :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
          icon="ph:text-bolder-bold" />
        <UButton @click="editor.chain().focus().toggleItalic().run()" color="gray"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }" icon="ph:text-italic" />
        <UButton @click="editor.chain().focus().toggleStrike().run()" color="gray"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }" icon="ph:text-strikethrough" />
        <UButton @click="editor.chain().focus().toggleBulletList().run()" color="gray"
          :class="{ 'is-active': editor.isActive('bulletList') }" icon="ph:list-bullets" />
        <UButton @click="editor.chain().focus().toggleOrderedList().run()" color="gray"
          :class="{ 'is-active': editor.isActive('orderedList') }" icon="ph:list-numbers" />
        <UButton @click="editor.chain().focus().toggleBlockquote().run()" color="gray"
          :class="{ 'is-active': editor.isActive('blockquote') }" icon="ph:quotes" />
        <UButton @click="editor.chain().focus().setParagraph().run()" color="gray"
          :class="{ 'is-active': editor.isActive('paragraph') }" icon="ph:paragraph" />
        <UButton @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()"
          color="gray" icon="ph:arrow-arc-left-duotone" />
        <UButton @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()"
          color="gray" icon="ph:arrow-arc-right-duotone" />
      </div>
      <div class="ml-auto flex space-x-2">
        <UButton @click="onPostFlux" color="orange" label="Cancel" icon="ph:x-circle" />
        <UButton @click="onCancelFlux" color="blue" :disabled="isDirty" :label="saveButtonLabel"
          icon="ph:lightning-duotone" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  initialContent: {
    type: String,
    default: '',
  },
  saveButtonLabel: {
    type: String,
    default: 'Flux It',
  },
})
const emit = defineEmits(['postFluxMessage', 'cancelFlux'])

const editor = useEditor({
  autofocus: true,
  content: props.initialContent,
  editorProps: {
    attributes: {
      class:
        'border-2 p-2 prose prose-sm focus:outline-none',
    },
  },
  extensions: [TiptapStarterKit],
});

const isDirty = computed(() => editor.value?.getHTML() !== props.initialContent)

const onPostFlux = () => {
  emit('postFluxMessage', editor.value?.getHTML())
}
const onCancelFlux = () => {
  emit('cancelFlux')
  editor.value?.commands.setContent(props.initialContent)
}

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<style scoped>
.editor-frame {
  overflow-y: scroll;
  max-height: 60vh;
}
</style>
