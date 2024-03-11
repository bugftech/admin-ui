<template>
  <v-form>
    <v-label class="text-caption font-weight-medium pb-2 text-light"
      >用户名/邮件</v-label
    >
    <v-text-field v-model="username" hide-details="auto"> </v-text-field>

    <v-label class="text-caption font-weight-medium pb-2 text-lightText mt-4"
      >密码</v-label
    >
    <v-text-field v-model="password" type="password" hide-details="auto">
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
      theme="dark"
      prepend-icon="mdi-login"
      variant="flat"
      rounded="pill"
      class="mt-4"
      @click="login"
      >登录</v-btn
    >
    <v-btn
      block
      prepend-icon="mdi-lock-reset"
      variant="tonal"
      rounded="pill"
      class="mt-4"
      >忘记密码？</v-btn
    >
  </v-form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter,useRoute } from "vue-router";
import { setCookie, getCookie } from "@/composables/cookie";
import { encrypt, decrypt } from "@/composables/crypto";

const username = ref("");
const password = ref("");
const rememberMe = ref(false);

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const login = async () => {
  const { success } = await auth.login(username.value, password.value);
  if (success) {
    if (rememberMe.value) {
      // 有效期设置为7天
      setCookie("rememberedUsername", username.value, 7);
      setCookie("rememberedPassword", encrypt(password.value), 7);
      setCookie("rememberMe", "true", 7);
    } else {
      // 如果用户未选择记住我，则移除Cookie中的相关数据
      setCookie("rememberedUsername", "", -1);
      setCookie("rememberedPassword", "", -1);
      setCookie("rememberMe", "", -1);
    }

    const redirect = route.query.redirect || '/home'
    router.push(redirect);
  }
};

onMounted(() => {
  // 获取cookie的值
  const rememberedUsername = getCookie("rememberedUsername");
  const rememberedPassword = getCookie("rememberedPassword");
  const remembered = getCookie("rememberMe");

  if (remembered === "true" && rememberedUsername && rememberedPassword) {
    rememberMe.value = true;
    username.value = rememberedUsername;
    password.value = decrypt(rememberedPassword);
  }
});
</script>
