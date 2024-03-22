<template>
  <v-card>
    <v-card-text>
      <AppLabel>轮播图</AppLabel>
      <v-row>
        <v-col v-for="(pic, i) in items" :key="i" cols="3">
          <v-sheet
            class="border rounded-lg overflow-hidden"
            height="100px"
            style="position: relative"
          >
            <v-img
              :src="pic"
              cover
              style="top: 0; left: 0; position: absolute; right: 0"
            ></v-img>
            <div class="d-flex">
              <v-spacer />
              <v-btn
                icon="mdi-close"
                size="x-small"
                variant="flat"
                @click="removeImage(i)"
                color="orange-accent-2"
              ></v-btn>
            </div>
          </v-sheet>
        </v-col>
        <v-col cols="12" :md="items.length > 0 ? 6 : 12">
          <UploadImage @change="onChangeAlbumPics" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {  ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const items = ref(props.modelValue);

const onChangeAlbumPics = (e) => {
  items.value.push(e);
};

const removeImage = (index) => {
  items.value.splice(index, 1);
};

// 监听 props 的变化，同步更新内部的 items
watchEffect(() => {
  items.value = props.modelValue;
});
</script>
