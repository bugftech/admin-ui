// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@fortawesome/fontawesome-free/css/all.css";
import { VTimePicker } from "vuetify/labs/VTimePicker";
import { VStepperVertical } from 'vuetify/labs/VStepperVertical';
import { VCalendar } from 'vuetify/labs/VCalendar';


import DateFnsAdapter from "@date-io/date-fns";
import zhCN from "date-fns/locale/zh-CN";
import enUS from "date-fns/locale/en-US";

// Icon Font
import { mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa-svg";

import defaults from "./vuetify_defaults";
// Composables
import { createVuetify } from "vuetify";

export default createVuetify({
  defaults,
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
      fa,
    },
  },
  components: {
    VTimePicker,
    VStepperVertical,
    VCalendar,
  },
  date: {
    adapter: DateFnsAdapter,
    locale: {
      zhHans: zhCN,
      en: enUS,
    },
  },
});
