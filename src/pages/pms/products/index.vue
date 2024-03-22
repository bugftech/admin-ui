<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn
            variant="elevated"
            prepend-icon="mdi-download-circle-outline"
            size="small"
            class="me-2"
          >
            下载CSV
          </v-btn>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                variant="elevated"
                prepend-icon="mdi-dots-horizontal-circle-outline"
                v-bind="props"
                size="small"
              >
                更多的操作
              </v-btn>
            </template>
            <v-list> </v-list>
          </v-menu>
        </AppBreadcrumb>
        <ProductDataTable class="mt-4"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<route lang="yaml">
meta:
  breadcrumb: 查看
</route>
