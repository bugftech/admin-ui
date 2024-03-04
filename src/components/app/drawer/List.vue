<template>
  <v-list nav :lines="false" color="black" density="compact" slim>
    <template v-for="(item, i) in items" :key="i">
      <v-list-item v-if="!item.items" :title="item.title" :to="item.to">
        <template v-slot:prepend="{ isActive }">
          <v-icon
            :icon="isActive ? item.activeIcon : item.inactiveIcon"
            size="small"
          ></v-icon>
        </template>
      </v-list-item>
      <v-list-group v-else :value="item.items">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="item.title">
            <template v-slot:prepend="{ isActive }">
              <v-icon
                :icon="isActive ? item.activeIcon : item.inactiveIcon"
                size="small"
                v-if="item.activeIcon"
              ></v-icon>
            </template>
          </v-list-item>
        </template>

        <v-list-item
          v-for="(child, idx) in item.items"
          :title="child.title ? child.title : child"
          :key="idx"
          :to="child.to"
        >
          <template v-slot:prepend="{ isActive }">
            <v-icon
              :icon="isActive ? child.activeIcon : child.inactiveIcon"
              size="small"
              v-if="child.activeIcon"
            ></v-icon>
          </template>
        </v-list-item>
      </v-list-group>
    </template>
  </v-list>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
  },
});
</script>
