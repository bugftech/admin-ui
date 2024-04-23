<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card>
        <v-card-title class="text-caption">运费降价金额</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-btn-toggle
                class="border"
                density="compact"
                rounded="lg"
                v-model="editItem.way"
              >
                <v-btn size="small" value="automatic">自动折扣</v-btn>
                <v-btn size="small" value="coupon">折扣码</v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="12">
              <AppLabel>{{
                editItem.way === "automatic" ? "标题" : "折扣码"
              }}</AppLabel>

              <v-text-field
                v-if="editItem.way === 'automatic'"
                variant="solo-filled"
                flat
                persistent-hint
                hint="客户将在购物车中和在结账时看到此内容。"
                v-model="editItem.name"
              >
              </v-text-field>
              <v-text-field
                v-else
                variant="solo-filled"
                flat
                persistent-hint
                hint="客户必须在结账时输入此代码。"
                v-model="editItem.code"
              >
                <template v-slot:append>
                  <v-btn
                    prepend-icon="mdi-refresh-auto"
                    size="small"
                    variant="text"
                    class="border"
                  >
                    自动生成
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mt-4">
        <v-card-title class="text-caption">折扣</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="6">
              <v-select
                hide-details
                variant="solo-filled"
                flat
                class="text-caption"
                :items="discountStrategies"
                item-title="title"
                item-value="value"
                v-model="editItem.priceStrategy"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                hide-details
                variant="solo-filled"
                flat
                persistent-placeholder
                :prefix="editItem.priceStrategy === 'fixed_amount' ? '¥' : undefined"
                min="0"
                step="0.01"
                :suffix="editItem.priceStrategy === 'fixed_amount' ? '元' : '%'"
                v-model.number="editItem.priceStrategyValue"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mt-4">
        <v-card-title class="text-caption">最低购买策略</v-card-title>
        <v-card-text>
          <v-btn-toggle
            class="border rounded-lg"
            density="compact"
            divided
            v-model="editItem.minPurchaseStrategy"
          >
            <v-btn size="small" value="none">无最低要求</v-btn>
            <v-btn size="small" value="min_purchase_amt">最低购买金额</v-btn>
            <v-btn size="small" value="min_purchase_count">最低购买数量</v-btn>
          </v-btn-toggle>

          <v-text-field
            class="mt-2"
            variant="solo-filled"
            flat
            :step="
              editItem.minPurchaseStrategy === 'min_purchase_amt' ? 0.01 : 1
            "
            min="0"
            :placeholder="
              editItem.minPurchaseStrategy === 'min_purchase_amt'
                ? '最低购买金额'
                : '最低购买数量'
            "
            v-model.number="editItem.minPurchaseValue"
            v-if="editItem.minPurchaseStrategy != 'none'"
          >
          </v-text-field>
        </v-card-text>
      </v-card>

      <v-card class="mt-4">
        <v-card-title class="text-caption">客户范围</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-btn-toggle
                class="border rounded-lg"
                density="compact"
                v-model="editItem.customerStrategy"
              >
                <v-btn size="small" value="all">所有客户</v-btn>
                <v-btn size="small" value="segment" disabled>过滤客户</v-btn>
                <v-btn size="small" value="specified">指定客户</v-btn>
              </v-btn-toggle>
              <v-select
                class="mt-2"
                variant="solo-filled"
                flat
                hide-details
                placeholder="选择指定的客户"
                multiple
                v-if="editItem.customerStrategy != 'all'"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mt-4">
        <v-card-title class="text-caption">最大折扣使用次数</v-card-title>
        <v-card-text>
          <AppLabel>限制此折扣最大使用的次数</AppLabel>
          <v-text-field
            suffix="/次"
            hint="0次代表不限制次数"
            persistent-hint
            step="1"
            min="0"
            v-model.number="editItem.maxUsageCount"
            persistent-placeholder
          ></v-text-field>

          <v-checkbox
            hide-details
            density="compact"
            v-model="editItem.oncePerCustomer"
            :true-value="true"
            :false-value="false"
          >
            <template v-slot:label>
              <div class="text-caption">每位客户限使用一次</div>
            </template>
          </v-checkbox>
        </v-card-text>
      </v-card>

      <v-card class="mt-4">
        <v-card-title class="text-caption">折扣时间</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <AppLabel>开始日期</AppLabel>
              <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    prepend-inner-icon="mdi-calendar"
                    variant="solo-filled"
                    flat
                    readonly
                    v-model="startDate"
                  >
                  </v-text-field>
                </template>

                <v-card>
                  <v-date-picker
                    hide-header
                    show-week
                    @update:modelValue="onUpdateDate"
                  >
                  </v-date-picker>
                </v-card>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <AppLabel>开始时间</AppLabel>
              <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    prepend-inner-icon="mdi-calendar"
                    variant="solo-filled"
                    flat
                    readonly
                    v-model="startTime"
                  >
                  </v-text-field>
                </template>
                <v-card>
                  <v-time-picker v-model="startTime" use-seconds full-width />
                </v-card>
              </v-menu>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-checkbox
                hide-details
                density="compact"
                v-model="hasEndTime"
                :true-value="true"
                :false-value="false"
              >
                <template v-slot:label>
                  <div class="text-caption">结束时间</div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row dense v-if="hasEndTime">
            <v-col cols="12" md="6">
              <AppLabel>结束日期</AppLabel>
              <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    prepend-inner-icon="mdi-calendar"
                    variant="solo-filled"
                    flat
                    readonly
                    v-model="startDate"
                  >
                  </v-text-field>
                </template>

                <v-card>
                  <v-date-picker
                    hide-header
                    show-week
                    @update:modelValue="onUpdateDate"
                  >
                  </v-date-picker>
                </v-card>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <AppLabel>结束时间</AppLabel>
              <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    prepend-inner-icon="mdi-calendar"
                    variant="solo-filled"
                    flat
                    readonly
                    v-model="startTime"
                  >
                  </v-text-field>
                </template>
                <v-card>
                  <v-time-picker v-model="startTime" use-seconds full-width />
                </v-card>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card>
        <v-card-title class="text-caption">折扣概览</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <div class="v-label font-weight-bold">
                {{
                  editItem.way === "automatic"
                    ? editItem.name || "尚未设置名称"
                    : editItem.code || "尚未设置折扣码"
                }}
              </div>
            </v-col>
            <v-col cols="12">
              <div class="text-caption font-weight-bold">折扣额</div>
              <div class="v-label text-caption">
                {{ editItem.priceStrategy + ": " + editItem.priceStrategyValue }}
              </div>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold">折扣策略</div>
              <v-list-item>
                <v-list-item-title class="text-caption font-weight-bold">
                  最低购买策略
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{
                    editItem.minPurchaseStrategy +
                    ": " +
                    editItem.minPurchaseValue
                  }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title class="text-caption font-weight-bold">
                  客户范围
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ editItem.customerStrategy }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title class="text-caption font-weight-bold">
                  最大折扣使用次数
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{
                    editItem.maxUsageCount === 0
                      ? "无限制"
                      : editItem.maxUsageCount + "/次"
                  }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title class="text-caption font-weight-bold">
                  每位客户使用一次
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ editItem.oncePerCustomer }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="text-caption font-weight-bold">折扣时间</div>
              <div class="v-label text-caption">
                开始时间: {{ startDate + " " + startTime }}
              </div>
              <div class="v-label text-caption" v-if="hasEndTime">
                结束时间: {{ endDate + " " + endTime }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Discount, DiscountStrategy } from "@/interfaces/discount";

const discountStrategies = [
  {
    title: "百分比",
    value: "percentage_amount",
  },
  {
    title: "固定金额",
    value: "fixed_amount",
  },
];

const startDate = ref("2018-03-02");
const startTime = ref("00:00:00");

const endDate = ref("2018-03-02");
const endTime = ref("00:00:00");
const hasEndTime = ref(false);

const onUpdateDate = (e: unknown) => {
  if (e instanceof Date) {
    const year = e.getFullYear();
    const month = String(e.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以需要加1，并且保证两位数格式
    const day = String(e.getDate()).padStart(2, "0"); // 保证两位数格式
    const dateString = `${year}-${month}-${day}`;
    startDate.value = dateString;
  }
};

const editItem = reactive<Discount>({
  id: 0,
  uid: "",
  name: "",
  type: "moneyOffOrder",
  way: "automatic",
  code: "8NYH4Q83ES9W",
  description: "",
  priceStrategy: "percentage_amount", // 默认百分比
  priceStrategyValue: 0,
  priceStrategyPercent: 0,
  minPurchaseStrategy: "none",
  minPurchaseValue: 0,
  maxUsageCount: 0,
  oncePerCustomer: false,
  oncePerOrder: false,
  customerStrategy: "all",
  published: false,
  products: [],
  startDate: 0,
  customers: [],
});
</script>
