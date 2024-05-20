<script lang="ts" setup>
import './home.scss'
import { ref, reactive } from 'vue'
import ArrowDownSvg from '@/components/icons/ArrowDownSvg.vue'
import PlusSquareSvg from '@/components/icons/PlusSquareSvg.vue'
import TitleArrow from '@/components/sections/01-row/title-arrow/TitleArrow.vue'

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

let selectedSection: Section | null = null
let selectedSubmenu: SubSubMenu | null = null
let breadcrumb = ref('')
let prevSelectedSectionIndex: null | number = null
let showMessage = true

const sections: Section[] = reactive([
  {
    name: 'Headers',
    description: 'we will find the different headers for the website',
    welcomeMessage: 'Welcome to Headers!',
    expanded: false,
    submenus: [
      {
        name: '1 row',
        expanded: false,
        subsubmenus: [
          {
            name: 'Title Arrow', content:
              `<template>
                <section>
                  <div class="title-arrow-container">
                    <div class="title">
                      <p>{{ title }}</p>
                    </div>
                    <div class="arrow">
                      <ArrowDownSkinnySvg class="icon" />
                    </div>
                  </div>
                </section>
              </template>`
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
  // if (index !== submenuIndex) {
  // sub.expanded = false
  // }
  // })

  sections.forEach((s, sIndex) => {
    if (sIndex !== sectionIndex) {
      s.submenus.forEach((sub, index) => {
        if (index !== submenuIndex) {
          sub.expanded = false
        }
      })
    }
  })

  selectedSubmenu = null
  showMessage = false
}

function selectSubmenu(section: Section, submenu: SubMenu, subsubmenu: SubSubMenu) {
  selectedSubmenu = subsubmenu
  breadcrumb.value = `${section.name} > ${submenu.name} > ${subsubmenu.name}`
}

</script>

<template>

  <div class="design-system-container">

    <div class="navigation">
      <div class="section" v-for="(section, index) in sections" :key="index">
        <div class="section-header" @click="toggleSection(index)">
          <span class="arrow" :class="{ 'arrow-expanded': section.expanded }">
            <ArrowDownSvg class="icon" />
          </span>
          <span>{{ section.name }}</span>
        </div>

        <ul v-if="section.expanded" class="submenu">
          <li v-for="(submenu, subIndex) in section.submenus" :key="subIndex">
            <div class="submenu-header" @click="toggleSubmenu(index, subIndex)">
              <span class="arrow" :class="{ 'arrow-expanded': submenu.expanded }">
                <ArrowDownSvg class="icon small" />
              </span>
              <span>{{ submenu.name }}</span>
            </div>
            <ul v-if="submenu.expanded" class="sub-submenu">
              <li v-for="(subsubmenu, subsubIndex) in submenu.subsubmenus" :key="subsubIndex"
                @click="selectSubmenu(section, submenu, subsubmenu)">
                <PlusSquareSvg class="icon add" />
                <span>{{ subsubmenu.name }}</span>
              </li>
            </ul>
          </li>
        </ul>

      </div>
    </div>

    <div class="content">
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
</template>