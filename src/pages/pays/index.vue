<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn size="small" variant="elevated" v-bind="props"
                >添加支付</v-btn
              >
            </template>
            <v-list nav density="compact" slim>
              <v-list-item link to="/pays/wechat/new">
                <template v-slot:prepend>
                  <v-icon>mdi-wechat</v-icon>
                </template>
                <v-list-item-title>微信支付</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-cellphone</v-icon>
                </template>
                <v-list-item-title>支付宝</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </AppBreadcrumb>

        <PayDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
</script>

<route lang="yaml">
meta:
  title: "支付中心"
  breadcrumb: "支付"
</route>
