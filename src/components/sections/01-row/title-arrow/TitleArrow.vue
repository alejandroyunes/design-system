<script lang="ts" setup>
import './title-arrow.scss'
import ArrowDownSkinnySvg from "@/components/icons/ArrowDownSkinnySvg.vue"

const { title } = defineProps<{
  title: string
}>()

</script>

<template>
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
</template>
