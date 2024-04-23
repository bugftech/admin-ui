<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-12 text-center" flat color="transparent">
          <v-card-text class="pb-12 text-center">
            <v-img src="./world.svg" max-height="400" contain />
            <div class="subtitle mt-4">点亮梦想从一个APP开始</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card flat color="transparent">
          <v-card-title class="text-h6"> 立刻加入 </v-card-title>
          <v-card-text>
            <v-btn class="my-4" to="/login" rounded="pill" block variant="tonal"
              >微信注册</v-btn
            >
            <v-btn class="my-4" to="/login" rounded="pill" block variant="tonal"
              >支付宝注册</v-btn
            >
            <v-divider class="my-4" />
            <v-btn
              class="my-4"
              to="/login"
              rounded="pill"
              block
              variant="flat"
              color="orange-accent-2"
              >创建账号</v-btn
            >
          </v-card-text>
        </v-card>
        <v-card flat class="mt-6" color="transparent">
          <v-card-title class="text-body-2"> 已有账号 </v-card-title>
          <v-card-text>
            <v-btn
              variant="tonal"
              prepend-icon="mdi-location-enter"
              to="/login"
              block
              rounded="pill"
              >登录</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<route lang="yaml">
path: "/"
meta:
  layout: bare
  breadcrumb: "BUGFREED"
</route>

<style>
.logo {
  font-size: 0.8rem !important;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: 0.26rem !important;
  font-family: "futura", sans-serif;
  text-transform: uppercase !important;
}

.subtitle {
  font-size: 1rem !important;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: 0.66rem !important;
  font-family: "futura", sans-serif;
  text-transform: uppercase !important;
}

.title {
  font-size: 3rem !important;
  font-weight: 500;
  line-height: 5rem;
  letter-spacing: 1rem !important;
  font-family: "futura", sans-serif;
  text-transform: uppercase !important;
}
</style>
