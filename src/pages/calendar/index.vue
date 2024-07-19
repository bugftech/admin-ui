<template>
  <v-toolbar density="compact" rounded="0" color="transparent">
    <v-tabs density="compact">
      <v-tab class="text-caption"> 数据 </v-tab>
    </v-tabs>
  </v-toolbar>
  <v-alert
    closable
    variant="tonal"
    color="red"
    rounded="t-0"
    class="text-caption"
    text="日历处于Alpha阶段。完整的功能待GA后可用"
    icon="mdi-alert"
  >
  </v-alert>
  <v-sheet class="elevation-3 rounded-lg px-4 ma-2">
    <v-toolbar density="compact" color="transparent">
      <v-btn
        theme="dark"
        size="small"
        class="me-2"
        variant="flat"
        append-icon="mdi-plus"
        >添加日历</v-btn
      >
      <v-btn-toggle divided density="compact" v-model="type">
        <v-btn
          size="small"
          prepend-icon="mdi-view-day"
          variant="outlined"
          value="day"
        >
          按天
        </v-btn>
        <v-btn
          size="small"
          prepend-icon="mdi-view-week"
          variant="outlined"
          value="week"
        >
          按周
        </v-btn>
        <v-btn
          value="month"
          size="small"
          prepend-icon="mdi-calendar-month"
          variant="outlined"
        >
          按月
        </v-btn>
      </v-btn-toggle>

      <v-select
        v-model="weekday"
        :items="weekdays"
        class="mx-2"
        label="星期"
        variant="solo-filled"
        flat
        dense
        hide-details
      ></v-select>
    </v-toolbar>
  </v-sheet>
  <v-card flat>
    <v-card-text class="py-0">
      <v-calendar
        text="今天"
        ref="calendar"
        v-model="value"
        :events="events"
        :view-mode="type"
        :weekdays="weekday"
        interval-format="'fullTime24h'"
        color="indigo"
      >
        <template v-slot:event="{ event }">
          <v-dialog max-width="600">
            <template v-slot:activator="{ props }">
              <v-chip
                v-bind="props"
                size="small"
                :color="event.color"
                variant="flat"
              >
                {{ event.title }}
              </v-chip>
            </template>
            <v-card>
              <v-toolbar>
                <v-toolbar-title class="text-subtitle-2">
                  {{ event.title }}
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      readonly
                      label="开始时间"
                      placeholder="开始时间"
                      :value="event.start ? formatDateString(event.start) : ''"
                      variant="solo-filled"
                      flat
                      persistent-placeholder
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      readonly
                      label="开始时间"
                      placeholder="开始时间"
                      :value="event.end ? formatDateString(event.end) : ''"
                      variant="solo-filled"
                      flat
                      persistent-placeholder
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-for="(k, v) in event.note"
                      :key="k"
                      readonly
                      :label="v"
                      :placeholder="v"
                      :value="k ? k : ''"
                      variant="solo-filled"
                      flat
                      persistent-placeholder
                      class="mb-4"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>
      </v-calendar>
    </v-card-text>
  </v-card>
</template>

<script>
import { useDate } from "vuetify";

export default {
  data: () => ({
    type: "month",
    types: [
      { value: "month", title: "月" },
      { value: "week", title: "周" },
      { value: "day", title: "天" },
    ],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { title: "周天 至 周六", value: [0, 1, 2, 3, 4, 5, 6] },
      { title: "周一 至 周天", value: [1, 2, 3, 4, 5, 6, 0] },
      { title: "周一 至 周五", value: [1, 2, 3, 4, 5] },
      { title: "周一, 周三, 周五", value: [1, 3, 5] },
    ],
    value: [new Date()],
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    titles: [
      "三小时陪诊",
      "四小时陪诊",
      "全天陪诊",
      "代办开药",
      "代办取药",
      "出院代办",
      "待送切片",
      "辅助约号",
    ],
  }),
  mounted() {
    const adapter = useDate();
    this.getEvents({
      start: adapter.startOfDay(adapter.startOfMonth(new Date())),
      end: adapter.endOfDay(adapter.endOfMonth(new Date())),
    });
  },
  methods: {
    getEvents({ start, end }) {
      const events = [];

      const min = start;
      const max = end;
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          title: this.titles[this.rnd(0, this.titles.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          allDay: !allDay,
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
