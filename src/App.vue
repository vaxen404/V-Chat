<script setup>
</script>

<template>
  <div class="app-container">
    <header class="top-bar">
      <div class="dots">...</div>
      <div class="logo">V | ⚙️</div>
      <div class="profile">👤</div>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #1e1e1e; 
  font-family: sans-serif;
  overflow: hidden; 
}

#app {
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.top-bar {
  height: 45px;
  background-color: #252525;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #333;
  color: #888;
}

.dots { letter-spacing: 2px; font-weight: bold; }

.main-content {
  flex: 1; 
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>