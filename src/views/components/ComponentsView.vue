<script lang="ts" setup>
import './components-view.scss'
import { ref, reactive } from 'vue'

import ArrowDownSvg from '@/components/icons/ArrowDownSvg.vue'
import ArrowDoubleTwoSvg from '@/components/icons/ArrowDoubleTwoSvg.vue'
import LeftSideBar from '@/components/nav/left-sidebar/LeftSideBar.vue'

interface SubSubMenu {
  name: string
  content?: string[]
  codeBody?: string[]
  contentFooter?: string[]
  code?: boolean
}

interface SubMenu {
  name: string
  expanded: boolean
  subsubmenus: SubSubMenu[]
}

interface Section {
  breadcrum: string
  title: string
  description: string
  expanded: boolean
  submenus: SubMenu[]
}

const navToggle = ref<boolean | undefined>(undefined)

let selectedSection: Section | null = null
let selectedSubmenu: SubSubMenu | null = null
let breadcrumb = ref('')
let prevSelectedSectionIndex: null | number = null
let showMessage = true

const sections: Section[] = reactive([
  {
    breadcrum: 'Headers',
    title: 'NavBars',
    description: 'Here we can find the code for all navigation.',
    expanded: false,
    submenus: [
      {
        name: 'Two Row Header',
        expanded: false,
        subsubmenus: [
          {
            name: 'Vue Code',
            code: true,
            content: ['hello'],
            codeBody: [`import './header-component.scss'
import { ref } from 'vue'
import { setDarkMode } from '@/utils/utils'
import RightNav from '@/components/sliders/right-nav/RightNav.vue'
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
</template>`]
          },
          { name: 'View Component', content: ['- coming soon'] },
        ]
      },
      {
        name: 'Three Row Header',
        expanded: false,
        subsubmenus: [
          {
            name: 'Dependencies', code: true, codeBody: ['- sudo yum install -y nginx-<version>', '- sudo yum install npm -g (bun or pnpm)', '- sudo yum install nvm', '- nvm install 20.1.1', '- bun install pm2']
          }
        ]
      }
    ]
  },
])

function toggleSection(index: number) {
  sections[index].expanded = !sections[index].expanded;

  if (index !== prevSelectedSectionIndex) {
    selectedSection = sections[index]
    selectedSubmenu = null
  }
  prevSelectedSectionIndex = index

  const section = sections[index]

  selectedSection = section
  selectedSubmenu = null
  breadcrumb.value = section.breadcrum
  showMessage = false
}

function toggleSubmenu(sectionIndex: number, submenuIndex: number) {

  const section = sections[sectionIndex]
  const submenu = section.submenus[submenuIndex]

  if (submenu.expanded) {
    submenu.expanded = false
    breadcrumb.value = section.breadcrum
  } else {
    submenu.expanded = true
    breadcrumb.value = `${section.breadcrum} > ${submenu.name}`
  }

  // Reset other submenus
  // section.submenus.forEach((sub, index) => {
  //   if (index !== submenuIndex) {
  //     sub.expanded = false
  //   }
  // })

  // sections.forEach((s, sIndex) => {
  //   if (sIndex !== sectionIndex) {
  //     s.submenus.forEach((sub, index) => {
  //       if (index !== submenuIndex) {
  //         sub.expanded = false
  //       }
  //     })
  //   }
  // })

  selectedSubmenu = null
  showMessage = false
}

function selectSubmenu(section: Section, submenu: SubMenu, subsubmenu: SubSubMenu) {
  selectedSubmenu = subsubmenu
  breadcrumb.value = `${section.breadcrum} > ${submenu.name} > ${subsubmenu.name}`
}

function collapseNav() {
  navToggle.value = !navToggle.value
}

</script>

<template>

  <div class="docs-container">

    <LeftSideBar :collapseNav="collapseNav" />

    <div :class="['navigation', navToggle ? 'nav-hide' : '', navToggle === false ? 'nav-show' : '']">

      <div class="nav-header">
        <div class="header-title">
          Components
        </div>

        <div class="icon-bg" @click="collapseNav">
          <ArrowDownSvg class="icon collapse" />
        </div>
      </div>

      <div class="nav" v-for="(section, index) in sections" :key="index">

        <div class="title" @click="toggleSection(index)">

          <span class="arrow" :class="{ 'arrow-expanded': section.expanded }">
            <ArrowDownSvg class="icon" />
          </span>

          <span>{{ section.breadcrum }}</span>

        </div>

        <ul v-if="section.expanded" class="items">
          <li v-for="(submenu, subIndex) in section.submenus" :key="subIndex">

            <div class="item" @click="toggleSubmenu(index, subIndex)">
              <span class="arrow" :class="{ 'arrow-expanded': submenu.expanded }">
                <ArrowDownSvg class="icon small" />
              </span>
              <span>{{ submenu.name }}</span>
            </div>

            <ul v-if="submenu.expanded" class="sub-item">

              <li v-for="(subsubmenu, subsubIndex) in submenu.subsubmenus" :key="subsubIndex"
                @click="selectSubmenu(section, submenu, subsubmenu)">
                <ArrowDoubleTwoSvg class="icon add-icon" />
                <span>{{ subsubmenu.name }}</span>
              </li>

            </ul>

          </li>
        </ul>

      </div>

    </div>

    <div :class="['content', navToggle ? 'content-open' : '', navToggle === false ? 'content-closed' : '']">

      <div class="content-items">

        <h1 v-if="selectedSection" class="breadcrumb">{{ breadcrumb }}</h1>

        <div v-if="showMessage" class="home">
          <h1 class="title">Components Docs</h1>

          <div class="article-title">
            <ArrowDoubleTwoSvg class="icon add-icon" />
            <h3>Code</h3>
          </div>

          <p class="description">
            The documentation will is instended to guide the installation of our infraestructure services.
          </p>

          <div class="article-title">
            <ArrowDoubleTwoSvg class="icon add-icon" />
            <h3>Tools</h3>
          </div>

          <p class="description">Detail information of all of our Vue.js installation processes.</p>
          <br />
          <p class="description">Create consistent, intuitive interfaces ensures a unified user experience across all
            your
            products, making
            interactions familiar and frictionless for your users.</p>

          <div class="article-title">
            <ArrowDoubleTwoSvg class="icon add-icon" />
            <h3>Resources</h3>
          </div>

          <p>External information</p>

        </div>

        <div v-if="selectedSection" class="title">
          <h1>{{ selectedSection.title }}</h1>
          <p>{{ selectedSection.description }}</p>
        </div>

        <div v-if="selectedSubmenu" class="description">

          <div v-if="!selectedSubmenu.code">
            <p v-for="(item, index) in selectedSubmenu.content" :key="index"> {{ item }}</p>
          </div>

          <code v-if="selectedSubmenu.code">
            <pre>
              <span v-for="(item, index) in selectedSubmenu.codeBody" :key="index">
                {{ item }}
              </span>
            </pre>
          </code>

          <div v-if="selectedSubmenu.contentFooter">
            <p v-for="(item, index) in selectedSubmenu.contentFooter" :key="index"> {{ item }}</p>
          </div>
        </div>

      </div>

    </div>

  </div>

</template>
