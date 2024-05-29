<template>
  <v-menu location="bottom" :close-on-content-click="false" v-model="menu">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        size="small"
        prepend-icon="mdi-calendar"
        variant="elevated"
        >{{ filterDays[dayIndex].title }}</v-btn
      >
    </template>
    <v-card>
      <div class="d-flex flex-row">
        <v-sheet>
          <v-list density="compact">
            <v-list-item
              :value="i"
              @click="onSelected(i)"
              v-for="(item, i) in filterDays"
              :key="i"
            >
              <v-list-item-title class="text-caption font-weight-medium"
                >{{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
        <v-divider vertical />
        <v-card class="rounded-0 elevation-0">
          <v-toolbar color="transparent" density="comfortable">
            <v-text-field
              flat
              variant="solo-filled"
              class="mx-4 text-caption"
              prepend-inner-icon="mdi-clock-start"
              persistent-placeholder
              label="开始时间:"
              :value="startTime ? formatted(startTime) : ''"
              readonly
            ></v-text-field>
            <v-icon>mdi-arrow-right</v-icon>
            <v-text-field
              flat
              prepend-inner-icon="mdi-clock-end"
              label="结束时间:"
              persistent-placeholder
              variant="solo-filled"
              class="mx-4"
              :value="endTime ? formatted(endTime) : ''"
              readonly
            ></v-text-field>
          </v-toolbar>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-locale-provider locale="zhHans">
                  <v-date-picker
                    hide-header
                    v-model="startTime"
                    :key="startTime"
                  />
                </v-locale-provider>
              </v-col>
              <v-col cols="12" md="6">
                <v-locale-provider locale="zhHans">
                  <v-date-picker hide-header v-model="endTime" :key="endTime" />
                </v-locale-provider>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn variant="tonal" size="small" @click="cancel">取消</v-btn>
            <v-btn variant="flat" color="indigo" size="small" @click="save"
              >确定</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup>
import { formatDateTime } from "@/composables/time";
const now = new Date();

const startTime = ref(now);
const endTime = ref(now);
const menu = ref(false);
const dayIndex = ref(0);

const formatted = (str) => {
  return str ? formatDateTime(str).substr(0, 11) : "";
};

const filterDays = [
  {
    title: "今天",
    days: 0,
  },
  {
    title: "过去7天",
    days: 7,
  },
  {
    title: "过去30天",
    days: 30,
  },
  {
    title: "过去90天",
    days: 90,
  },
];

const onSelected = (id) => {
  const { days } = filterDays[id];
  endTime.value = now;
  dayIndex.value = id
  startTime.value = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
};

const cancel = () => {
  menu.value = false;
};

const emit = defineEmits(["change"]);
const save = () => {
  emit("change", { startTime: startTime.value, endTime: endTime.value });
  menu.value = false;
};
</script>
