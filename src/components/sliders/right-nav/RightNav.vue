<script lang="ts" setup>
import './right-nav.scss'
import Twitter from '@/components/icons/social-media/TwitterSvg.vue'
import ExitSvg from '@/components/icons/ExitSvg.vue'
import Youtube from '@/components/icons/social-media/YoutubeSvg.vue'
import Facebook from '@/components/icons/social-media/FacebookSvg.vue'
import Instagram from '@/components/icons/social-media/InstagramSvg.vue'

interface Props {
  toggleRightNav: () => void
  isRightNavOpen: boolean | undefined
}

const { toggleRightNav, isRightNavOpen } = defineProps<Props>()

</script>

<template>
  <div :class="['right-nav-container', isRightNavOpen ? 'right-slide-in' : '', isRightNavOpen === false ? 'right-slide-out' : '']">
    <div class="right-nav-header">
      <p class="title">Estrella <span class="title-strong">Immobilien</span></p>

      <div @click="toggleRightNav" class="animation-exit">
        <ExitSvg class="exit-icon" />
      </div>
    </div>

    <div class="right-nav-content">
      <ul class="list">
        <li class="item">
          <span class="svg">
            <Facebook class="icon" />
          </span>
          <p class="link">Facebook</p>
        </li>
        <li class="item">
          <span class="svg">
            <Instagram />
          </span>
          <p class="link">Instagram</p>
        </li>
        <li class="item">
          <span class="svg">
            <Twitter />
          </span>
          <p class="link">Twitter</p>
        </li>
        <li class="item">
          <span class="svg">
            <Youtube />
          </span>
          <p class="link">Youtube</p>
        </li>
      </ul>

      <div class="contact">
        <p class="contact-tel"><a href="tel:+41787746337">+41 78 774 63 37</a></p>
        <p class="contact-email">
          <a href="mailto:matthias.schulz@estrella-immobilien.ch">matthias.schulz@estrella-immobilien.ch</a>
        </p>
      </div>
    </div>
  </div>

  <div v-if="isRightNavOpen" @click="toggleRightNav" class="right-nav-bg" ></div>
</template>