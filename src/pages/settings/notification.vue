<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <v-list v-if="webhooks.length">
            <v-list-subheader class="text-caption font-weight-regular"
              >webhook</v-list-subheader
            >
            <v-list-item
              v-for="(wh, i) in webhooks"
              :key="i"
              color="indigo"
              active=""
              prepend-icon="mdi-wechat"
            >
              <v-list-item-title class="text-subtitle-2"></v-list-item-title>
              <v-list-item-subtitle class="text-caption">
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
        <v-divider vertical />
        <v-col cols="12" md="8" class="px-4"> </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
const webhooks = [{

}];
</script>
