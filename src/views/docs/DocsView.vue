<script lang="ts" setup>
import './docs.scss'
import { ref, reactive } from 'vue'
import ArrowDownSvg from '@/components/icons/ArrowDownSvg.vue'
import ArrowDoubleTwoSvg from '@/components/icons/ArrowDoubleTwoSvg.vue'
import HouseSvg from '@/components/icons/nav/HouseSvg.vue'
import FolderSvg from '@/components/icons/nav/FolderSvg.vue'
import AddSvg from '@/components/icons/nav/AddSvg.vue'
import ApiSvg from '@/components/icons/nav/ApiSvg.vue'
import TitleArrow from '@/components/sections/01-row/title-arrow/TitleArrow.vue'
import { useRoute } from 'vue-router'

interface SubSubMenu {
  name: string;
  content: string;
}

interface SubMenu {
  name: string;
  expanded: boolean;
  subsubmenus: SubSubMenu[];
}

interface Section {
  name: string;
  description: string;
  welcomeMessage: string;
  expanded: boolean;
  submenus: SubMenu[];
}

const route = useRoute()

const path = ref(route.path)
const navToggle = ref<boolean | undefined>(undefined)

let selectedSection: Section | null = null
let selectedSubmenu: SubSubMenu | null = null
let breadcrumb = ref('')
let prevSelectedSectionIndex: null | number = null
let showMessage = true

const sections: Section[] = reactive([
  {
    name: 'EC2 + Nginx',
    description: 'The following information is intended to help implement an instance of EC2 with Nginx.',
    welcomeMessage: 'Welcome to EC2 + Nginx!',
    expanded: false,
    submenus: [
      {
        name: 'Creating EC2 instance',
        expanded: false,
        subsubmenus: [
          {
            name: 'Installation',
            content: `- yum install nginx
- configure nginx.confi file
- start nginx <sudo systemctl start nginx`
          },
          { name: 'Header Logo Left', content: 'Console.log(hello)' },
        ]
      },
      {
        name: '2 row',
        expanded: false,
        subsubmenus: [
          { name: 'Text Title', content: 'console.log(hello)' },
          { name: 'Logo Title Hamburger', content: 'console.log(hello)' }
        ]
      },
      {
        name: '3 row',
        expanded: false,
        subsubmenus: [
          { name: 'Logo centered', content: 'console.log(hello)' },
          { name: 'Top Fixed Hamburger', content: 'console.log(hello)' }
        ]
      }
    ]
  },
  {
    name: 'Billboards',
    description: 'lorem ipsum dolor sit amet consectetur adipiscing elit.',
    welcomeMessage: 'Welcome to Billboards!',
    expanded: false,
    submenus: [
      {
        name: '1 row',
        expanded: false,
        subsubmenus: [
          { name: 'Image Left Top', content: 'console.log(hello)' },
          { name: 'Right Text Image', content: 'console.log(hello)' }
        ]
      }
    ]
  },
  {
    name: 'Sections',
    description: 'Here you can find all the sections widgets.',
    welcomeMessage: 'Welcome to Section Widgets!',
    expanded: false,
    submenus: [
      {
        name: '1 row',
        expanded: false,
        subsubmenus: [
          { name: 'cookies-compliance', content: 'console.log(hello)' },
          { name: 'partners', content: 'console.log(hello)' }
        ]
      },
      {
        name: '2 row',
        expanded: false,
        subsubmenus: [
          { name: 'get-in-touch', content: 'console.log(hello)' },
          { name: 'mission-vission', content: 'console.log(hello)' }
        ]
      },
      {
        name: '3 row',
        expanded: false,
        subsubmenus: [
          { name: 'ceo-description', content: 'console.log(hello)' },
          { name: 'main-link-icons', content: 'console.log(hello)' }
        ]
      }
    ]
  },
  {
    name: 'Sliders',
    description: 'Description for Sliders',
    welcomeMessage: 'lorem ipsum dolor sit amet consectetur adipiscing elit.',
    expanded: false,
    submenus: [
      {
        name: '1 row',
        expanded: false,
        subsubmenus: [
          { name: 'Image Right', content: 'console.log(hello)' },
          { name: 'Header Logo Left', content: 'Console.log(hello)' },
        ]
      },
      {
        name: '2 row',
        expanded: false,
        subsubmenus: [
          { name: 'Text Title', content: 'console.log(hello)' },
          { name: 'Logo Title Hamburger', content: 'console.log(hello)' }
        ]
      },
      {
        name: '3 row',
        expanded: false,
        subsubmenus: [
          { name: 'Logo centered', content: 'console.log(hello)' },
          { name: 'Top Fixed Hamburger', content: 'console.log(hello)' }
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
  breadcrumb.value = section.name
  showMessage = false
}

function toggleSubmenu(sectionIndex: number, submenuIndex: number) {

  const section = sections[sectionIndex]
  const submenu = section.submenus[submenuIndex]

  if (submenu.expanded) {
    submenu.expanded = false
    breadcrumb.value = section.name
  } else {
    submenu.expanded = true
    breadcrumb.value = `${section.name} > ${submenu.name}`
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
  breadcrumb.value = `${section.name} > ${submenu.name} > ${subsubmenu.name}`
}

function collapseNav() {
  navToggle.value = !navToggle.value
}

</script>

<template>

  <div class="docs-container">

    <div class="left-nav">
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
          <li :class="[path === '/components' ? 'active' : '']">
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

    <div :class="['navigation', navToggle ? 'nav-hide' : '', navToggle === false ? 'nav-show' : '']">

      <div class="nav-header">

        <div class="header-title">
          Docs
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

          <span>{{ section.name }}</span>

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

    <div :class="['content', navToggle ? 'content-full' : '', navToggle === false ? 'content-half' : '']">

      <div class="content-items">
        <div v-if="showMessage">
          <h2>Welcome Message</h2>
          <p>This is the new message in the right row for the first render.</p>
        </div>

        <div v-if="selectedSection">
          <h2 class="breadcrumb">{{ breadcrumb }}</h2>
          <h2>{{ selectedSection.name }}</h2>
          <p>{{ selectedSection.description }}</p>
          <p v-if="!selectedSubmenu">{{ selectedSection.welcomeMessage }}</p>
        </div>

        <div v-if="selectedSubmenu">
          <!-- <h3>{{ (selectedSubmenu as any).content }}</h3> -->
          <pre><code>{{ (selectedSubmenu as any).content }}</code></pre>
          <div>
            <TitleArrow title="about us" />

          </div>

        </div>
      </div>

    </div>

  </div>

</template>