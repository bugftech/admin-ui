<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <VBtn size="small" rounded="pill" variant="elevated">创建一个</VBtn>
        </AppBreadcrumb>

        <v-card>
          <v-data-table>

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
meta:
  title: "短链接"
  breadcrumb: "短链接"
</route>
