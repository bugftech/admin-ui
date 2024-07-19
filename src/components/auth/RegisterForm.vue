<template>
  <v-form>
    <v-label class="text-caption font-weight-medium pb-2 text-light"
      >用户名/邮件</v-label
    >
    <v-text-field
      v-model="username"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      :rules="nonEmptyRules"
      flat
    >
    </v-text-field>

    <v-label class="text-caption font-weight-medium pb-2 text-lightText mt-4"
      >密码</v-label
    >
    <v-text-field
      flat
      v-model="password"
      type="password"
      hide-details="auto"
      density="compact"
      :rules="nonEmptyRules"
      variant="solo-filled"
    >
    </v-text-field>
    <v-label class="text-caption font-weight-medium pb-2 text-lightText mt-4"
      >再次输入密码</v-label
    >
    <v-text-field
      flat
      v-model="comfirmPassword"
      type="password"
      hide-details="auto"
      density="compact"
      :rules="nonEmptyRules"
      variant="solo-filled"
    >
    </v-text-field>
    <v-btn
      block
      variant="flat"
      rounded="lg"
      class="mt-12"
      color="orange-accent-2"
      :loading="loading"
      @click="signup"
      >注册账号</v-btn
    >

    <v-divider class="my-8" />
    <v-btn
      block
      prepend-icon="mdi-login"
      variant="tonal"
      rounded="lg"
      class="mt-4"
      to="/login"
      >登录</v-btn
    >
  </v-form>
</template>

<script setup>
import { nonEmptyRules } from "@/composables/formRules";
import bugfreed from "@/sdk";
import { Auth } from "@/sdk/index";

const auth = new Auth({ bugfreed });
const username = ref("");
const password = ref("");
const comfirmPassword = ref("");

const router = useRouter();
const route = useRoute();
const loading = ref(false);

const signup = async () => {
  loading.value = true;
  if (password.value !== comfirmPassword.value) {
    useSnackbar("注册失败，两次输入的密码不一致");
    loading.value = false;
    return;
  }
  const { success } = await auth.signup(username.value, password.value);
  if (success) {
    useSnackbar("注册成功");
    const redirect = route.query.redirect || "/login";
    router
      .push(redirect)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    useSnackbar("注册失败");
    loading.value = false;
  }
};

onMounted(() => {});
</script>
