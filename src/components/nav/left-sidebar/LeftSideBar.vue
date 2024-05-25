<script setup lang="ts">
import './left-sidebar.scss'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import HouseSvg from '@/components/icons/nav/HouseSvg.vue'
import FolderSvg from '@/components/icons/nav/FolderSvg.vue'
import AddSvg from '@/components/icons/nav/AddSvg.vue'
import ApiSvg from '@/components/icons/nav/ApiSvg.vue'

interface Props {
  collapseNav: () => void
}

const route = useRoute()
const path = ref(route.path)

const { collapseNav } = defineProps<Props>()
</script>

<template>
  <div class="left-sidebar">
    <ul>

      <router-link to="/">
        <li :class="['first', path === '/' ? 'active' : '']">
          <HouseSvg class="icon" />
          <p>Home</p>
        </li>
      </router-link>

      <router-link to="/docs">
        <li :class="[path === '/docs' ? 'active' : '']" @click="collapseNav">
          <FolderSvg class="icon" />
          <p>Docs</p>
        </li>
      </router-link>

      <router-link to="/components">
        <li :class="[path === '/components' ? 'active' : '']" @click="collapseNav">
          <AddSvg class="icon" />
          <p>Components</p>
        </li>
      </router-link>

      <router-link to="/apis">
        <li :class="[path === '/apis' ? 'active' : '']">
          <ApiSvg class="icon" />
          <p>Apis</p>
        </li>
      </router-link>

    </ul>
  </div>
</template>