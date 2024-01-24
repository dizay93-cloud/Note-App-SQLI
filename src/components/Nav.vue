<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div>
    <RouterLink active-class="active" to="/">Home</RouterLink>
    <RouterLink active-class="active" to="/editor/new">New Note</RouterLink>
    <RouterLink active-class="active" to="/noteList">Notes</RouterLink>
  </div>
</template>

<style scoped>
.active {
  font-weight: 900;
  color: rgb(50, 81, 153);
}
</style>
Z
