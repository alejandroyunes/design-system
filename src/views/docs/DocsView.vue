<script lang="ts" setup>
import './docs.scss'
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
    breadcrum: 'EC2 + Nginx',
    title: 'Creation of AWS EC2 instance',
    description: 'The following information is intended to help implement an instance of EC2 with Nginx.',
    expanded: false,
    submenus: [
      {
        name: 'Create a EC2 instance',
        expanded: false,
        subsubmenus: [
          {
            name: 'Create Instance',
            content: ["- Create an Amazon Linux 2 instance.", "- Log in to the AWS Management Console and ensure you've selected the desired region before launching the instance."]
          },
          { name: 'Configuration', content: ['- Launch the Amazon Linux server, select the desired memory and disc memory, and finally create the .pem file.'] },
        ]
      },
      {
        name: 'Dev installations',
        expanded: false,
        subsubmenus: [
          {
            name: 'Dependencies', code: true, codeBody: ['- sudo yum install -y nginx-<version>', '- sudo yum install npm -g (bun or pnpm)', '- sudo yum install nvm', '- nvm install 20.1.1', '- bun install pm2']
          }
        ]
      }
    ]
  },
  {
    breadcrum: 'Fast Api',
    title: 'Fast API implementation',
    description: 'Installation instructions',
    expanded: false,
    submenus: [
      {
        name: 'Installation',
        expanded: false,
        subsubmenus: [
          {
            name: 'Python',
            content: ["- Download the official installer from https://www.python.org/downloads/", "- Open a command prompt or terminal window and type 'python --version', you should see the version of python."]
          },
          {
            name: 'Create virtual env',
            code: true,
            codeBody: [`# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows
venv\\Scripts\\activate
# On macOS/Linux
source venv/bin/activate

# Install FastAPI and Uvicorn in the virtual environment
pip install fastapi uvicorn
`]
          },
          { name: 'Typer installation', code: true, codeBody: ['pip install typer'] },
        ]
      },
      {
        name: 'Configuration',
        expanded: false,
        subsubmenus: [
          {
            name: 'Config main app',
            content: ['- Install FastApi', '- Create a file main.py with:'],
            code: true,
            codeBody: [`from typing import Union

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}`]
          },
          { name: 'Run project', code: true, codeBody: ['pip install uvicorn', 'pip show fastapi', 'pip show uvicorn', 'uvicorn main:app --reload'], contentFooter: ["- Verify the port: http://127.0.0.1:8000/"] },
        ]
      },
      {
        name: 'OpenAPI Specification (OAS)',
        expanded: false,
        subsubmenus: [
          {
            name: 'Api Documentation',
            content: ['http://127.0.0.1:8000/docs', '- Here you can see the documentation in OpenAPI Specification (OAS).'],
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
          Documents
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
          <h1 class="title">Documentation</h1>

          <div class="article-title">
            <ArrowDoubleTwoSvg class="icon add-icon" />
            <h3>Installation</h3>
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
