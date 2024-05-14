<template>
  <v-container class="fill-height bg" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xl="4" lg="3" md="3">
        <v-card class="rounded-lg" flat color="transparent">
          <h2 class="text-h3 font-weight-semibold mb-2">创建你的账号</h2>
          <div class="text-subtitle-1 mb-6">开启全新之旅</div>
          <AuthRegisterForm />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>

</script>


<route lang="yaml">
  meta:
    layout: bare
    title: "注册Bugfreed"
    breadcrumb: "注册"
  </route>
