<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            {{ item.name }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal">复制</v-btn>
          <v-btn size="small" variant="elevated" @click="update">更新</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const id = (route.params as { id: string }).id;

</script>
