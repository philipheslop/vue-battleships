<script setup lang="ts">
import PanelItem from '../components/PanelItem.vue'
import { User, Recycle, Bot } from 'lucide-vue-next'
</script>

<template>
  <main>
    <PanelItem>
      <template #icon>
        <User />
      </template>
      <template #heading>Introduction</template>
      <p class="mb-2 font-semibold">Phil Heslop presents:</p>
      Technical test for a Battleships Vue 3 project using TypeScript (and TailwindCSS).
      It is initially based on the Vue project setup app and built from there.
      It was completed over a weekend, about 6 hours in total.
    </PanelItem>

    <PanelItem>
      <template #icon>
        <Recycle />
      </template>
      <template #heading>Reused</template>
      I have reused a few elements from other projects, (some adapted from React):
      <ul class="list-disc list-inside">
        <li>'Terminal' Messaging component - I like to fit this guy into projects for debugging, but its quite nice anyway</li>
        <li>Input restriction with flashing border - lifted from a previous project (adapted to two characters etc.)</li>
      </ul>
    </PanelItem>

    <PanelItem>
      <template #icon>
        <Bot />
      </template>
      <template #heading>AI</template>
      I have used AI in a restricted way during this project (Claude-code and co-pilot). I feel it is realistic to use AI development tools in a real-world scenario, but I have not allowed it to write any of the core game logic. I have used it for:
      <ul class="list-disc list-inside">
        <li>*Limited* Planning</li>
        <li>Generating CI config for github</li>
        <li>To periodically 'review' my code (i.e. as a mock PR reviewer)</li>
        <li>Autocomplete stuff, e.g. TailwindCSS class suggestions, completing TypeScript types</li>
        <li>Finding documentation</li>
        <li>General Vue syntax reminders</li>
        <li>Bug Chasing (build errors etc.)</li>
        <li>Piana - never used before and needed a few pointers (when to use .value!)</li>
        <li>Reactivity - related to above but state consistency between components was tricky</li>
        </ul>
    </PanelItem>
  </main>
</template>
