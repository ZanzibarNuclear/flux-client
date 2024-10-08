<template>
  <header>
    <h1>Nuclear Flux - World of Nuclear</h1>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/explore">Explore</NuxtLink>
      <!-- <NuxtLink to="/notifications">Notifications</NuxtLink>
      <NuxtLink to="/messages">Messages</NuxtLink> -->
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e1e8ed;
}

nav a {
  margin-left: 20px;
  text-decoration: none;
  color: #1da1f2;
}
</style>