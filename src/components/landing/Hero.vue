<template>
  <div
    class="section"
    id="hero"
    style="position: relative; background: #0e0c15e6"
  >
    <div style="position: absolute; top: 0; left: 0; right: 0">
      <v-card class="pa-12 text-center" flat color="transparent">
        <v-card-text class="pb-12">
          <div class="subtitle">
            websites are under reconstruction
            <span style="position: relative; display: inline-block"
              >Bugfreed
              <v-img
                style="position: absolute"
                src="https://jsm-brainwave.com/assets/curve-DplsLMf8.png"
                width="100%"
                height="28"
              />
            </span>
          </div>
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
    </div>
    <div class="mx-auto" style="position: relative">
      <div style="position: relative" class="bg-conic-gradient">
        <v-card height="400"> </v-card>
      </div>
    </div>

    <div style="position: absolute; top: 56px;"></div>
  </div>
</template>

<script setup></script>

<style>
.bg-conic-gradient {
  background-image: conic-gradient(
    from 225deg,
    #ffc876,
    #79fff7,
    #9f53ff,
    #ff98e2,
    #ffc876
  );
}
</style>
