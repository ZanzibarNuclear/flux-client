<template>
  <div v-if="fluxStore.hasProfile" class="flux-composer">
    <TiptapEditor @post-flux-message="handlePostFlux" @cancel-flux="cancelReply" :initial-content="initialContent"
      :placeholder="placeholder" :save-button-label="saveButtonLabel" />
  </div>
  <div v-else>
    <p>Please log in to flux.</p>
  </div>
</template>

<script setup>
import { useFluxStore } from '@/stores/flux'
const props = defineProps({
  replyingTo: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['cancelReply'])

const fluxStore = useFluxStore()
const { createFlux } = useFluxService()

const initialContent = ref('')
const placeholder = computed(() =>
  props.replyingTo ? "Write your reaction..." : "What's nu(-clear)?"
)
const saveButtonLabel = computed(() => props.replyingTo ? 'React' : 'Flux it')

async function handlePostFlux(contentToPost) {

  if (!contentToPost || contentToPost.length === 0) {
    alert('You have to write something to flux it.')
    return
  }
  const newFlux = await createFlux(contentToPost, props.replyingTo?.id)
  if (props.replyingTo) {
    fluxStore.addReply(newFlux)
  } else {
    fluxStore.addToTimeline(newFlux)
  }
}

function cancelReply() {
  emit('cancelReply')
}
</script>

<style scoped>
.flux-composer {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.replying-to {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 0.9em;
}

.cancel-reply {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>