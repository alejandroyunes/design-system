<script lang="ts" setup>
import './right-nav.scss'
import ExitSvg from '@/components/icons/ExitSvg.vue'

import HouseSvg from '@/components/icons/nav/HouseSvg.vue'
import FolderSvg from '@/components/icons/nav/FolderSvg.vue'
import AddSvg from '@/components/icons/nav/AddSvg.vue'
import ApiSvg from '@/components/icons/nav/ApiSvg.vue'

interface Props {
  toggleRightNav: () => void
  isRightNavOpen: boolean | undefined
}

const { toggleRightNav, isRightNavOpen } = defineProps<Props>()

</script>

<template>
  <div
    :class="['right-nav-container', isRightNavOpen ? 'right-slide-in' : '', isRightNavOpen === false ? 'right-slide-out' : '']">
    <div class="right-nav-header">
      <p class="title">NorthStar <span class="title-strong">DS</span></p>

      <div @click="toggleRightNav" class="animation-exit">
        <ExitSvg class="exit-icon" />
      </div>
    </div>

    <div class="right-nav-content">
      <ul class="list">
        <li class="item">
          <span class="svg">
            <HouseSvg class="icon" />
          </span>
          <p class="link">Home</p>
        </li>
        <li class="item">
          <span class="svg">
            <FolderSvg class="icon" />
          </span>
          <p class="link">Docs</p>
        </li>
        <li class="item">
          <span class="svg">
            <AddSvg class="icon" />
          </span>
          <p class="link">Components</p>
        </li>
        <li class="item">
          <span class="svg">
            <ApiSvg class="icon" />
          </span>
          <p class="link">Apis</p>
        </li>
      </ul>

      <div class="contact">
        <p class="contact-tel"><a href="tel:+41787746337">System Admin</a></p>
        <p class="contact-email">
          <a href="mailto:matthias.schulz@estrella-immobilien.ch">admin@northstarbrokers.ca</a>
        </p>
      </div>
    </div>
  </div>

  <div v-if="isRightNavOpen" @click="toggleRightNav" class="right-nav-bg"></div>
</template>