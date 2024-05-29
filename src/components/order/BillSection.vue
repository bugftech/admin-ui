<template>
  <v-card>
    <v-toolbar color="transparent" density="compact">
      <v-card-title class="text-caption">发票信息</v-card-title>
      <v-spacer></v-spacer>
      <v-btn size="small" color="indigo">开发票</v-btn>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-row dense>
        <v-col cols="12" class="d-flex justify-space-between">
          <v-label class="text-caption ">类型</v-label>
          <div class="text-caption " style="max-width: 80%">
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-space-between">
          <v-label class="text-caption ">抬头</v-label>
          <div class="text-caption " style="max-width: 80%">
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-space-between">
          <v-label class="text-caption ">接收电子邮箱</v-label>
          <div class="text-caption " style="max-width: 80%">
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-space-between">
          <v-label class="text-caption ">手机号</v-label>
          <div class="text-caption " style="max-width: 80%">
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-space-between">
          <v-label class="text-caption ">发票内容</v-label>
          <div class="text-caption " style="max-width: 80%">
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
</script>
