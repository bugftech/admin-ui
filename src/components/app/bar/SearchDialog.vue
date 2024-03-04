<template>
  <v-dialog
    width="800"
    :scrim="false"
    content-class="overflow-visible align-self-start mt-0"
    max-height="900"
    scrollable
    theme="light"
  >
    <template v-slot:activator="{ props }">
      <v-text-field v-bind="props">
        <template v-slot:prepend-inner>
          <v-icon size="small"> mdi-magnify </v-icon>
        </template>
        <template v-slot:append-inner>
          <v-btn
            size="x-small"
            prepend-icon="mdi-apple-keyboard-command"
            class="border"
          >
            K
          </v-btn>
        </template>
      </v-text-field>
    </template>
    <v-card>
      <v-toolbar density="comfortable">
        <v-text-field
          variant="outlined"
          class="px-4 py-2 text-caption"
          placeholder="搜索"
        >
          <template v-slot:prepend-inner>
            <v-icon size="small"> mdi-magnify </v-icon>
          </template>
          <template v-slot:append-inner>
            <v-btn
              size="x-small"
              prepend-icon="mdi-apple-keyboard-command"
              class="border"
              variant="text"
            >
              K
            </v-btn>
          </template>
        </v-text-field>
      </v-toolbar>

      <v-card-text> </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup></script>

<style>
.mt-0 {
  margin-top: 0px !important;
}
</style>
