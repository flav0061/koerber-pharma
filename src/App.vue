<template>
  <v-container>
    <input-search />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputSearch from './components/InputSearch.vue'
import { VContainer } from 'vuetify/components'

export default defineComponent({
  name: 'App',

  components: {
    VContainer,
    InputSearch,
  },
})
</script>
