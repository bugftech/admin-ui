<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-toolbar
          color="transparent
        "
        >
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            创建CMS Collection
          </v-toolbar-title>
          <v-spacer />
          <v-btn variant="tonal" size="small" class="me-2"
            >取消</v-btn
          >
          <v-btn variant="elevated" size="small">确定</v-btn>
        </v-toolbar>
      </v-col>

      <v-col cols="12" md="8">
        <v-card>
          <v-text-field> </v-text-field>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
interface table {
  name: string;
  pic: string;
  description: string;
}
</script>
