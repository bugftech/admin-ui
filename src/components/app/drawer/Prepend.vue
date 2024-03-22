<template>
  <v-list nav density="compact" slim>
    <v-list-item to="/apps">
      <template v-slot:prepend>
        <v-icon size="small"> mdi-home </v-icon>
      </template>
      <v-list-item-title class="text-caption">项目设置</v-list-item-title>
      <template v-slot:append>
        <v-divider vertical class="me-4 my-2" />
        <v-btn icon="mdi-cog" variant="text" size="small" to="/settings/basic"></v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>
</script>
