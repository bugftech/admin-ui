<template>
  <v-app-bar flat theme="dark">
    <v-spacer />
    <div class="logo">BUGFREED.CO</div>
    <v-spacer />
  </v-app-bar>
  <v-container class="section fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xl="10" lg="6">
        <v-card class="pa-12 text-center" flat>
          <v-card-text class="pb-12">
            <div class="subtitle">websites are under reconstruction</div>
            <div class="text-nowrap title pt-12">coming soon</div>
          </v-card-text>
          <v-card-actions class="justify-center pt-12">
            <v-btn
              prepend-icon="mdi-location-enter"
              variant="flat"
              color="orange-accent-2"
              width="200"
              to="/login"
              >内部开始</v-btn
            >

            <v-btn prepend-icon="mdi-play-network" width="200" variant="tonal"
              >演示环境</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-footer app class="d-flex justify-center" theme="dark" style="height: 56px">
    <div class="text-caption font-weight-medium text-grey">
      ©️ 沪ICP备2023008148号-1
    </div>
  </v-footer>
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
