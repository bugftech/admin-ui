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
        <v-col cols="12" v-for="(item, i) in invoiceHeaders" :key="i">
          <v-text-field
            :label="item.title"
            :placeholder="item.title"
            persistent-placeholder
            variant="solo-filled"
            flat
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
const invoiceHeaders = [
  {
    title: "类型",
    value: "",
  },
  {
    title: "抬头",
    value: "",
  },
  {
    title: "类型",
    value: "",
  },
  {
    title: "电子邮箱",
    value: "",
  },
  {
    title: "手机号",
    value: "",
  },
  {
    title: "发票内容",
    value: "",
  },
];
</script>
