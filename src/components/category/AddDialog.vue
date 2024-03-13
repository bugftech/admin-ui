<template>
  <!--eager 强制内容渲染。要不然无法引入ref获取子组件的状态-->
  <v-dialog max-width="800" v-model="dialog" eager scrollable>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="elevated"
        rounded="lg"
        color="grey-darken-4"
        size="small"
      >
      新增分类
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="black">
        <v-toolbar-title class="text-body-1 font-weight-bold">
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" @click="onClose" />
      </v-toolbar>
      <v-card-text> </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn variant="tonal" size="small">取消</v-btn>
        <v-btn variant="flat" size="small" color="black">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script steup>
import { ref } from "vue";

const dialog = ref(false);
const onClose = () =>{
}
</script>
