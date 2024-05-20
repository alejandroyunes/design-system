<script lang="ts" setup>
import './header-component.scss'
import { ref } from 'vue'
import { setDarkMode } from '@/utils/utils'
// import Menu from './menu/MenuComponent.vue'
// import RightNav from '@/components/sliders/right-nav/RightNav.vue'
import SunSvg from '@/components/icons/header/SunSvg.vue'
import MoonSvg from '@/components/icons/header/MoonSvg.vue'
import HamburgerMenu from '@/components/icons/header/HamburgerSvg.vue'
import HamburgerVerticalSvg from '@/components/icons/header/HamburgerVerticalSvg.vue'

const isDarkMode = ref(localStorage.getItem('isDarkMode') === 'true')
const isRightNavOpen = ref<boolean | undefined>(undefined)
const isTopNavOpen = ref<boolean | undefined>(undefined)

setDarkMode(isDarkMode.value)

const handleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  setDarkMode(isDarkMode.value)
}

const toggleRightNav = () => {
  isRightNavOpen.value = !isRightNavOpen.value
}

const toggleTopNav = () => {
  isTopNavOpen.value = !isTopNavOpen.value
}

</script>

<template>
  <nav class="header-container">

    <div class="header-left">
      <HamburgerMenu @click="toggleTopNav" class="icon mobile-only hamburger" />
      <TopNav :toggleTopNav="toggleTopNav" :isTopNavOpen="isTopNavOpen" />

      <router-link to="/" class="link">
        <span class="capital">NorthStar</span>
        <span class="invest mobile-only">DS</span>
        <span class="invest desktop-only">Design System</span>
        <span class="invest desktop-only"></span>
      </router-link>

      <!-- <div>
        <Menu class="desktop-only" />
      </div> -->

    </div>

    <div class="header-right">

      <div class="dark-mode-icons">
        <MoonSvg v-if="!isDarkMode" @click="handleTheme" class="icon sun" />
        <SunSvg v-else @click="handleTheme" class="icon moon" />
      </div>

      <div>
        <HamburgerVerticalSvg @click="toggleRightNav" class="icon desktop-only" />
        <RightNav :toggleRightNav="toggleRightNav" :isRightNavOpen="isRightNavOpen" />
      </div>

    </div>

  </nav>
</template>