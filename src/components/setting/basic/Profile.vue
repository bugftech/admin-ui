<template>
  <v-card>
    <v-toolbar color="transparent">
      <v-toolbar-title class="text-subtitle-2 font-weight-bold"
        >基础信息</v-toolbar-title
      >
      <v-spacer />
      <v-btn
        variant="tonal"
        size="small"
        v-if="canEditInfo"
        @click="canEditInfo = !canEditInfo"
        prepend-icon="mdi-close"
      >
        取消
      </v-btn>
      <v-btn
        class="ms-2"
        variant="flat"
        size="small"
        v-if="canEditInfo"
        color="orange-accent-2"
        @click="canEditInfo = !canEditInfo"
        prepend-icon="mdi-check-all"
      >
        保存
      </v-btn>
      <v-btn
        v-if="!canEditInfo"
        icon="mdi-lock"
        @click="canEditInfo = !canEditInfo"
      ></v-btn>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="4">
          <v-label class="text-caption font-weight-medium"> 公司名称 </v-label>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            :readonly="!canEditInfo"
            density="compact"
            variant="solo-filled"
            flat
            v-model="item.name"
            class="text-caption"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-label class="text-caption font-weight-medium"> 域名 </v-label>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            :readonly="!canEditInfo"
            density="compact"
            variant="solo-filled"
            flat
            v-model="item.domain"
            class="text-caption"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-label class="text-caption font-weight-medium"> UUID </v-label>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            readonly
            density="compact"
            variant="solo-filled"
            flat
            v-model="item.uuid"
            class="text-caption"
          >
            <template v-slot:append>
              <v-btn
                color="orange-accent-2"
                variant="flat"
                size="small"
                @click="copy(item.uuid)"
                prepend-icon="mdi-content-copy"
              >
                复制
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { copyToClipboardFormatted } from "@/composables/copy";
const item = {
  uuid: "202401010001",
  name: "席悦健康",
  startTime: "",
  endTime: "",
  domain: "kangyueheng.com",
};

const canEditInfo = ref(false);

const copy = (str) => {
  copyToClipboardFormatted(str);
};
</script>
