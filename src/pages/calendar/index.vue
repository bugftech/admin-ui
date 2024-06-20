<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="transparent" class="mt-4">
            <v-select
              v-model="type"
              :items="types"
              class="ma-2"
              label="模式"
              variant="solo-filled"
              flat
              dense
              item-title="title"
              item-value="value"
              hide-details
            ></v-select>
            <v-select
              v-model="weekday"
              :items="weekdays"
              class="ma-2"
              label="星期"
              variant="solo-filled"
              flat
              dense
              hide-details
            ></v-select>
          </v-toolbar>
          <v-card-text>
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
                            :value="
                              event.start ? formatDateString(event.start) : ''
                            "
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
                            :value="
                              event.end ? formatDateString(event.end) : ''
                            "
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
      </v-col>
    </v-row>
  </v-container>

  <v-dialog> </v-dialog>
</template>

<script>
export default {
  data: () => ({
    type: "week",
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
    events: [
      {
        title: `全天陪诊`,
        start: new Date("2024-06-20 00:00"),
        end: new Date("2024-06-20 23:59"),
        color: "indigo",
        note: {
          联系人: "托尼",
          就诊人: "绿巨人",
          就诊人手机号: "10086",
          就诊人医院: "上海肛肠科",
        },
      },
      {
        title: `三小时陪诊`,
        start: new Date("2024-06-21 00:00"),
        end: new Date("2024-06-21 03:59"),
        color: "orange",
      },
    ],
  }),
  mounted() {},
  methods: {
    onClickEvent(event) {
      alert("test");
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDateString(dateString) {
      const date = new Date(dateString);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${year}/${month}/${day} ${hours}:${minutes}`;
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
