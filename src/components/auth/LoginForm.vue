<template>
  <v-form>
    <v-label class="text-caption font-weight-medium pb-2 text-light"
      >用户名/邮件</v-label
    >
    <v-text-field
      v-model="authForm.username"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>

    <v-label class="text-caption font-weight-medium pb-2 text-lightText mt-4"
      >密码</v-label
    >
    <v-text-field
      flat
      v-model="authForm.password"
      type="password"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
    >
    </v-text-field>
    <v-checkbox
      hide-details
      v-model="rememberMe"
      true-icon="fa:fas fa-check-square"
      false-icon="fa:far fa-square"
    >
      <template v-slot:label>
        <div class="text-caption font-weight-medium">记住我</div>
      </template>
    </v-checkbox>
    <v-btn
      block
      prepend-icon="mdi-login"
      variant="flat"
      rounded="lg"
      class="mt-4"
      color="orange-accent-2"
      :loading="loading"
      @click="login"
      >登录账号</v-btn
    >

    <v-divider class="my-8" />
    <v-btn
      block
      prepend-icon="mdi-lock-reset"
      variant="tonal"
      rounded="lg"
      class="mt-4"
      >忘记密码？</v-btn
    >
  </v-form>
</template>

<script setup>
import { setCookie, getCookie } from "@/composables/cookie";
import { encrypt, decrypt } from "@/composables/crypto";
import bugfreed from "@/sdk";
import { Auth } from "@/sdk/index";

const auth = new Auth({ bugfreed });

const authForm = reactive({
  username: "",
  password: "",
});

const rememberMe = ref(false);
const loading = ref(false);
const route = useRoute();
const router = useRouter();

const login = async () => {
  loading.value = true;
  const { success } = await auth.login(authForm);
  if (success) {
    useSnackbar("登录成功");
    if (rememberMe.value) {
      // 有效期设置为7天
      setCookie("rememberedUsername", authForm.username, 7);
      setCookie("rememberedPassword", encrypt(authForm.password), 7);
      setCookie("rememberMe", "true", 7);
    } else {
      // 如果用户未选择记住我，则移除Cookie中的相关数据
      setCookie("rememberedUsername", "", -1);
      setCookie("rememberedPassword", "", -1);
      setCookie("rememberMe", "", -1);
    }

    const redirect = route.query.redirect || "/apps";
    router.push(redirect).catch((err) => {
      console.error(err);
    });
  } else {
    useSnackbar("登录失败");
  }
  loading.value = false;
};

onMounted(() => {
  // 获取cookie的值
  const rememberedUsername = getCookie("rememberedUsername");
  const rememberedPassword = getCookie("rememberedPassword");
  const remembered = getCookie("rememberMe");

  if (remembered === "true" && rememberedUsername && rememberedPassword) {
    rememberMe.value = true;
    authForm.username = rememberedUsername;
    authForm.password = decrypt(rememberedPassword);
  }
});
</script>
