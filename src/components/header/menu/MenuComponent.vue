<script lang="ts" setup>
import './menu-component.scss'
</script>

<template>
  <div class="menu">
    <ul class="menu-list">
      <li class="menu-item">
        <router-link to="/" class="link">
          <span class="menu-span">Home</span>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link to="/docs" class="link">
          <span class="menu-span">Docs</span>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link to="/" class="link">
          <span class="menu-span">APIs</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
