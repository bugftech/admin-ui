<template>
  <v-list nav variant="tonal" density="compact" slim>
    <v-list-item link to="/settings">
      <template v-slot:prepend>
        <v-icon size="small"> mdi-home </v-icon>
      </template>
      <v-list-item-title class="text-caption">项目设置</v-list-item-title>
      <template v-slot:append>
        <v-divider vertical class="me-4 my-2" />
        <v-btn icon="mdi-cog" variant="text" size="small"></v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>
</script>
