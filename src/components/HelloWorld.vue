<template>
  <v-container tag="section">
    <v-row>
      <v-col cols="12">
        <v-toolbar>
          <div class="text-body-1 font-weight-bold ms-4">分析</div>
          <v-spacer />

          <v-btn prepend-icon="mdi-arrow-expand" variant="tonal" size="small">
            全屏显示
          </v-btn>
        </v-toolbar>
      </v-col>
      <v-col cols="12">
        <v-toolbar>
          <v-btn class="elevation-1 border" prepend-icon="mdi-calendar-check">
            今天
          </v-btn>

          <v-btn class="elevation-1 border" prepend-icon="mdi-calendar-check">
            今天
          </v-btn>
          <v-spacer />
          <v-checkbox hide-details density="compact">
            <template v-slot:label>
              <div class="text-caption font-weight-bold text-black">
                自动刷新
              </div>
            </template>
          </v-checkbox>
        </v-toolbar>
      </v-col>
      <v-col cols="4">
        <v-card height="350" class="border"> </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="350" class="border"> </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="350" class="border"> </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="350" class="border"> </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="350" class="border"> </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="350" class="border"> </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="350" class="border"> </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="350" class="border"> </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="350" class="border"> </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
//
</script>
