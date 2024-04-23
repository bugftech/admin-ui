<template>
  <v-card>
    <v-toolbar color="transparent" density="compact">
      <v-toolbar-title class="text-subtitle-2 font-weight-bold">
        服务账号
      </v-toolbar-title>
      <v-spacer />
      <v-btn variant="outlined" size="small">添加新成员</v-btn>
    </v-toolbar>
    <v-divider />
    <v-text-field
      variant="text"
      flat
      class="ms-4"
      placeholder="检索"
      prepend-icon="mdi-magnify"
    >
    </v-text-field>
    <v-divider />
    <v-data-table :headers="headers" class="text-caption" :items="items">
      <template v-slot:[`item.member`]="{ item }">
        <v-list-item class="px-0">
          <template v-slot:prepend>
            <v-avatar>
              <v-img src="" color="grey-lighten-1" />
            </v-avatar>
          </template>
          <v-list-item-title class="text-subtitle-2">
            {{ item.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption">
            {{ item.email }}
          </v-list-item-subtitle>
        </v-list-item>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon="mdi-dots-vertical" variant="text">{{ item.name }}</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
const headers = [
  {
    title: "成员",
    value: "member",
  },
  {
    title: "角色",
    value: "role",
  },
  {
    title: "操作",
    value: "actions",
    align: "end",
  },
];

const items = [
  {
    name: "stark",
    email: "stark.su@gmail.com",
    role: "admin",
  },
];
</script>
