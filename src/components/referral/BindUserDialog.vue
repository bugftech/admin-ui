<template>
  <v-dialog width="auto">
    <template v-slot:activator="{ props }">
      <v-btn
        size="small"
        prepend-icon="mdi-link"
        variant="elevated"
        class="me-2 rounded-lg"
        v-bind="props"
        >绑定用户</v-btn
      >
    </template>
    <v-card min-width="400">
      <v-card-item>
        <v-card-title class="text-subtitle-2"> 绑定用户 </v-card-title>
        <v-card-subtitle class="text-caption">
          将用户绑定到推荐
        </v-card-subtitle>
      </v-card-item>
      <v-text-field
        append-icon="mdi-magnify"
        placeholder="输入用户手机号"
        hide-details
        class="mx-4"
      >
      </v-text-field>
      <v-divider />
      <v-card-text> </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn size="small">取消</v-btn>
        <v-btn size="small">提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script setup lang="ts">
</script>