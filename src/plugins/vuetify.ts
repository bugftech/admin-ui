// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@fortawesome/fontawesome-free/css/all.css";
import { VSparkline } from "vuetify/labs/VSparkline";
import DateFnsAdapter from "@date-io/date-fns";
import zhCN from "date-fns/locale/zh-CN";
import enUS from "date-fns/locale/en-US";

// Icon Font
import { mdi } from "vuetify/iconsets/mdi";
import { aliases, fa } from 'vuetify/iconsets/fa-svg'

import defaults from "./vuetify_defaults";
// Composables
import { createVuetify } from "vuetify";

export default createVuetify({
  defaults,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  components: {
    VSparkline,
  },
  date: {
    adapter: DateFnsAdapter,
    locale: {
      zhHans: zhCN,
      en: enUS,
    },
  },
});
