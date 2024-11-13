<!-- app.vue -->
<template>
  <div class="max-w-lg mx-auto bg-gray-50 min-h-screen">
    <!-- Fixed Header -->
    <header class="app-header fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtImg src="/images/logo-sq-smooth.jpg" alt="World of Nuclear Logo" class="w-12 h-12 -mt-4" />
        <h1 class="text-x3l font-bold text-[nuclear-blue]">Flux on World of Nuclear</h1>
        <UButton icon="i-heroicons-bars-3" color="white" />
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="mt-[75px] mb-16">
      <slot />
      <!-- Post Composer -->
      <!-- <div>
        <div class="p-4 border-b border-gray-200 bg-white">
          <div class="flex gap-4">
            <UAvatar src="" alt="User avatar" class="w-10 h-10" />
            <UTextarea placeholder="What's happening?" rows="1" class="flex-1" auto-size />
          </div>
        </div> -->

      <!-- Posts Feed -->
      <!-- <div class="divide-y divide-gray-200">
          <article v-for="post in posts" :key="post.id" class="p-4 bg-white">
            <div class="flex gap-3">
              <UAvatar :alt="post.author" class="w-10 h-10 flex-shrink-0" />
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="font-bold">{{ post.author }}</span>
                  <span class="text-gray-500">{{ post.handle }}</span>
                  <span class="text-gray-500">· {{ post.time }}</span>
                </div>
                <p class="mt-1">{{ post.content }}</p>
                <div class="flex justify-between mt-3 text-gray-500">
                  <UButton variant="ghost" :icon="post.liked ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                    @click="toggleLike(post)">
                    {{ post.likes }}
                  </UButton>
                  <UButton variant="ghost" icon="i-heroicons-arrow-path-rounded-square">
                    {{ post.reposts }}
                  </UButton>
                  <UButton variant="ghost" icon="i-heroicons-share" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div> -->
    </main>

    <!-- Fixed Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div class="max-w-lg mx-auto px-4 py-3 flex justify-around">
        <UButton v-for="item in navigationItems" :key="item.label" :icon="item.icon" variant="ghost" class="flex-1" />
      </div>
    </nav>
  </div>
</template>

<script setup>
const posts = ref([
  {
    id: 1,
    author: 'John Doe',
    handle: '@johndoe',
    content: 'Just launched my new app! #excited',
    likes: 42,
    reposts: 12,
    time: '2h',
    liked: false
  },
  {
    id: 2,
    author: 'Jane Smith',
    handle: '@janesmith',
    content: 'Amazing sunset today 🌅',
    likes: 89,
    reposts: 24,
    time: '3h',
    liked: false
  },
  {
    id: 3,
    author: 'Tech News',
    handle: '@technews',
    content: 'Breaking: New framework released!',
    likes: 156,
    reposts: 45,
    time: '4h',
    liked: false
  }
])

const navigationItems = [
  { label: 'Home', icon: 'i-heroicons-home' },
  { label: 'Notifications', icon: 'i-heroicons-bell' },
  { label: 'Messages', icon: 'i-heroicons-envelope' },
  { label: 'Profile', icon: 'i-heroicons-user' }
]

const toggleLike = (post) => {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}
</script>

<style scoped>
.app-header {
  transition: top 0.3s;
  position: fixed;
  top: 0;
  width: 100%;
  height: 75px;
  /* Match the image height */
  z-index: 10;

  /* Add background image */
  /* background-image: url('/images/lush-landscape-1024x75.jpg'); */
  background-image: url('/images/electric-sky-banner-768x100.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>