<template>
  <v-container class="fill-height bg" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xl="4" lg="3" md="3">
        <v-card class="rounded-lg" flat color="transparent">
          <h2 class="text-h3 font-weight-semibold mb-2">登录</h2>
          <div class="text-subtitle-1 mb-6">BUGFREED 管理端</div>
          <AuthLoginForm />
          <h6 class="text-caption mt-8 d-flex align-center">
            <div class="text-medium-emphasis">还未拥有账号？</div>
            <div
              href="/register"
              variant="outlined"
              class="text-decoration-underline"
            >
              创建账号
            </div>
          </h6>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
meta:
  layout: bare
  title: "登录Bugfreed"
  breadcrumb: "认证"
</route>

<style>
.bg {
  overflow: hidden;
  /* background: linear-gradient(135deg, #333333, #999999); */
}

.drop-filter {
  backdrop-filter: blur(15px) !important;
  background: rgba(255, 255, 255, 0.9) !important;
}
</style>
