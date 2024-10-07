<template>
  <div class="flux-thread">
    <div class="original-flux">
      <p>{{ flux.content }}</p>
      <div class="flux-actions">
        <button @click="toggleReplyForm">Reply</button>
        <button @click="boostFlux">Boost ({{ flux.boost_count }})</button>
      </div>
    </div>
    <Composer v-if="showReplyForm" :replyingTo="flux" @reply-posted="handleReplyPosted"
      @cancel-reply="showReplyForm = false" />
    <div v-if="flux.replies && flux.replies.length > 0" class="replies">
      <div v-for="reply in flux.replies" :key="reply.id" class="reply">
        <p>{{ reply.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Composer from './Composer.vue'

const props = defineProps({
  flux: {
    type: Object,
    required: true
  }
})

const showReplyForm = ref(false)

function toggleReplyForm() {
  showReplyForm.value = !showReplyForm.value
}

function handleReplyPosted() {
  showReplyForm.value = false
  // Here you would typically refresh the flux thread to show the new reply
}

function boostFlux() {
  // Implement boost functionality
}
</script>

<style scoped>
.flux-thread {
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.original-flux {
  margin-bottom: 15px;
}

.flux-actions {
  margin-top: 10px;
}

.replies {
  margin-top: 15px;
  padding-left: 20px;
  border-left: 2px solid #e1e8ed;
}

.reply {
  margin-bottom: 10px;
}
</style>