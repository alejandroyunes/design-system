<script lang="ts" setup>
import './top-nav.scss'
import { useRouter } from 'vue-router'
import Twitter from '@/components/icons/social-media/TwitterSvg.vue'
import ExitSvg from '@/components/icons/ExitSvg.vue'
import Youtube from '@/components/icons/social-media/YoutubeSvg.vue'
import Facebook from '@/components/icons/social-media/FacebookSvg.vue'
import Instagram from '@/components/icons/social-media/InstagramSvg.vue'

const router = useRouter()

interface Props {
  toggleTopNav: () => void
  isTopNavOpen: boolean | undefined
}

const { toggleTopNav, isTopNavOpen } = defineProps<Props>()

const handleClick = (url: string) => {
  router.push(url)
  toggleTopNav()
}

</script>

<template>

  <div
    :class="['top-nav-container', isTopNavOpen ? 'top-slide-in' : '', isTopNavOpen === false ? 'top-slide-out' : '']">
    <div class="top-nav-header">
      <p class="title">Estrella <span class="title-strong">Immobilien</span></p>

      <div @click="toggleTopNav" class="animation-exit">
        <ExitSvg class=" exit-icon" />
      </div>
    </div>

    <div class="top-nav-content">
      <ul class="list">
        <li class="item" @click="handleClick('/')">
          Home
        </li>
        <li class="item" @click="handleClick('about')">
          About
        </li>
        <li class="item" @click="handleClick('services')">
          Services
        </li>
        <li class="item" @click="handleClick('contact')">
          Contact
        </li>
      </ul>

      <div class="contact">

        <div class="social-list">
          <span class="svg">
            <Facebook />
          </span>

          <span class="svg">
            <Instagram />
          </span>

          <span class="svg">
            <Twitter />
          </span>

          <span class="svg">
            <Youtube />
          </span>
        </div>

        <p class="contact-tel"><a href="tel:+41787746337">+41 78 774 63 37</a></p>
        <p class="contact-email">
          <a href="mailto:matthias.schulz@estrella-immobilien.ch">matthias.schulz@estrella-immobilien.ch</a>
        </p>
      </div>
    </div>
  </div>

  <div v-if="isTopNavOpen" @click="toggleTopNav" class="top-nav-bg"></div>
</template>