<template>
  <app-toolkit-bar>
    <v-btn size="small" variant="flat" theme="dark" prepend-icon="mdi-plus" to="/referrals/new"
      >添加推荐人</v-btn
    >
    <v-divider vertical class="mx-2 my-3" />
    <v-btn prepend-icon="mdi-sync" size="small" @click="fetch" class="border"
      >刷新数据</v-btn
    >
    <v-spacer />
    <v-text-field
      flat
      density="compact"
      variant="solo-filled"
      placeholder="检索"
      prepend-inner-icon="mdi-magnify"
      v-model="search"
    >
    </v-text-field>
  </app-toolkit-bar>
  <v-data-table
    :search="search"
    class="text-caption"
    :items="items"
    :headers="headers"
    :loading="loading"
  >
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:[`item.invalid`]="{ item }">
      <v-checkbox-btn readonly v-model="item.invalid" />
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        icon="mdi-google-analytics"
        class="me-2"
        @click="onAnalytics(item)"
      ></v-icon>
      <v-icon icon="mdi-pencil" @click="edit(item)" class="me-2"></v-icon>
      <v-icon icon="mdi-multimedia" @click="share(item)"></v-icon>
    </template>
  </v-data-table>
  <v-dialog v-model="dialog" width="324">
    <v-card height="567" id="downPoster" rounded="0">
      <v-img src="@/assets/poster.png" cover>
        <div class="d-flex align-center justify-center flex-column">
          <v-card-title class="mt-4 text-center">
            <div class="text-subtitle-1 font-weight-bold">
              {{ editItem.company }}
            </div>
            <div>X</div>
            <div class="text-subtitle-1 font-weight-bold">席悦健康</div>
          </v-card-title>
          <v-card-subtitle>
            <div class="text-caption">让权威医疗更有温度</div>
          </v-card-subtitle>
          <v-avatar size="64" tile class="my-10">
            <v-img :src="editItem.qrcodeUrl" contain />
          </v-avatar>
          <v-btn rounded="pill" variant="tonal" size="small"
            >长按二维码即可体验</v-btn
          >
        </div>
        <div
          class="d-flex align-center justify-center"
          style="
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 28px;
          "
        >
          <div
            style="
              height: 28px;
              width: 100px;
              line-height: 28px;
              font-size: 10px;
            "
            class="d-flex align-center justify-center"
          >
            <v-img src="@/assets/bugfreed-text-light.svg" contain />
          </div>
        </div>
      </v-img>
    </v-card>
    <div class="mt-2 text-center" @click="savePoster">
      <v-btn icon="mdi-download" variant="outlined" size="small"></v-btn>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { UserReferralInfo } from "@/interfaces/userReferral";
import html2canvas from "html2canvas";

const items = ref<UserReferralInfo[]>([]);
const search = ref("");
const loading = ref(false);
const dialog = ref(false);

const headers: any[] = [
  {
    title: "应用",
    key: "bfAppName",
  },
  {
    title: "用户名",
    key: "userName",
  },
  {
    title: "公司",
    key: "company",
  },
  {
    title: "用户手机号",
    key: "phone",
  },
  {
    title: "推荐码",
    key: "referralCode",
  },
  {
    title: "无效",
    key: "invalid",
  },
  {
    title: "操作",
    key: "actions",
  },
];

const fetch = async () => {
  if (loading.value) return;
  loading.value = true;
  const { data, success } = await BFSDK.getReferrals();
  if (!success) {
    useSnackbar("获取数据失败");
    loading.value = false;
    return;
  }

  items.value = data;
  loading.value = false;
};

onMounted(async () => {
  await fetch();
});

const router = useRouter();

const edit = (item: UserReferralInfo) => {
  const { id } = item;
  router.push({ name: "/referrals/[id]", params: { id: id } });
};

const onAnalytics = (item: UserReferralInfo) => {
  const { id } = item;
  router.push({
    name: "/referrals/analytics",
    query: {
      id: id,
    },
  });
};

const editItem = ref();

const share = (item: UserReferralInfo) => {
  dialog.value = true;
  editItem.value = item;
};

const savePoster = () => {
  const posterElement = document.querySelector<HTMLElement>("#downPoster");
  if (!posterElement) {
    console.error("Element #downPoster not found!");
    return;
  }
  html2canvas(posterElement, {
    useCORS: true,
  }).then((canvas: any) => {
    downloadBase64(canvas.toDataURL(), "下载图片名");
  });
};
/** 下载图片 */
const downloadBase64 = (
  dataUrl: string,
  fileName: string = "download",
  fileExtension: string = "png"
) => {
  // 将 base64 字符串转换为 Blob 对象
  const byteCharacters = atob(dataUrl.split(",")[1]);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 10240) {
    const slice = byteCharacters.slice(offset, offset + 10240);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: "application/octet-stream" });
  const blobUrl = URL.createObjectURL(blob);
  const creatDom = document.createElement("a");
  document.body.appendChild(creatDom);
  creatDom.href = blobUrl;
  creatDom.download = `${fileName}.${fileExtension}`;
  creatDom.click();
  document.body.removeChild(creatDom);
  URL.revokeObjectURL(blobUrl);
};
</script>
