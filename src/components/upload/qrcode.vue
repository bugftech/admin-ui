<template>
  <v-card>
    <v-toolbar density="compact" color="transparent">
      <v-toolbar-title class="text-caption font-weight-bold"
        >二维码</v-toolbar-title
      >
      <v-spacer />
      <v-btn icon="mdi-cogs" size="small"></v-btn>
    </v-toolbar>
    <v-divider />
    <v-card-text class="justif-center d-flex">
      <v-img :src="localUrl" width="150" height="150" />
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn size="small" color="indigo" @click="downloadQRCode">下载</v-btn>
      <v-btn size="small" color="indigo" @click="generateQRCode"
        >点击生成</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import QRCode from "qrcode";
import { toRefs } from "vue";
import BFSDK from "@/api/sdk";

const props = defineProps({
  url: {
    type: String,
    required: true,
    value: "",
  },
  code: {
    type: String,
    required: true,
    value: "",
  },
  uid: {
    type: String,
    required: true,
    value: "",
  },
});

const localUrl = ref(props.url);

const { code, uid } = toRefs(props);
const generateQRCode = () => {
  if (!code?.value || !uid?.value) {
    console.error("请输入二维码内容");
    return;
  }

  const opts: QRCode.QRCodeToDataURLOptions = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    margin: 1,
    color: {
      dark: "#212121",
      light: "#FFFFFF",
    },
  };

  const codeUrl = `https://apiv4.beta.bugfreed.com/${uid.value}/referral?code=${code.value}`;

  // const codeUrl = `http://localhost:8080/referral?code=${code.value}`;
  // 使用 QRCode.toDataURL 生成二维码的 Data URL，
  // 重载函数 可能会导致ts检查错误
  // @ts-ignore
  QRCode.toDataURL(
    codeUrl,
    opts,
    function (err: Error | null, dataURL: string) {
      if (err) {
        console.error("生成QR码失败:", err);
        return;
      }
      // 将生成的 Data dataURL 赋值给 editItem.qrcodeUrl
      localUrl.value = dataURL;
    }
  );
};

const dataURLToBlob = (dataURL: string): Blob => {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

const downloadQRCode = () => {
  // 创建一个虚拟的链接元素
  const link = document.createElement("a");
  link.href = localUrl.value;
  link.download = code.value + ".png";

  // 模拟用户点击链接以下载文件
  document.body.appendChild(link);
  link.click();

  // 清理链接元素
  document.body.removeChild(link);
};

const UploadQrcode = () => {
  if (props.code === "" || !localUrl.value) return;
  var file = dataURLToBlob(localUrl.value);
  const formData = new FormData();
  formData.append("uploadfile", file);
  return BFSDK.uploadQrcodeFile(props.code, formData);
};

watch(
  [() => props.code, () => props.uid],
  (newValues, oldValues) => {
    generateQRCode();
  }
);

defineExpose({
  UploadQrcode,
});
</script>
