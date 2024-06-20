<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-toolbar extended>
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            订单#<span>{{ id }}</span>
          </v-toolbar-title>

          <v-spacer />
          <v-btn
            prepend-icon="mdi-invoice"
            variant="elevated"
            class="me-2"
            size="small"
            >开发票</v-btn
          >
          <v-btn
            prepend-icon="mdi-content-copy"
            variant="elevated"
            class="me-2"
            size="small"
            @click.stop="copy"
            >复制</v-btn
          >
          <v-btn
            append-icon="mdi-link"
            variant="elevated"
            class="me-2"
            size="small"
            >分享</v-btn
          >

          <template v-slot:extension>
            <v-tabs density="compact" v-model="tab">
              <v-tab class="text-caption" :value="1">基础信息</v-tab>
              <v-tab class="text-caption" :value="2">订单状态</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs-window v-model="tab" class="pa-1">
          <v-tabs-window-item :value="1">
            <v-row>
              <v-col cols="12" md="8">
                <OrderBasicInfoSection :item="order" />
                <OrderNoteSection
                  class="mt-4"
                  :note="order.note"
                  v-if="order?.note"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="elevation-1 mb-4">
                  <v-toolbar color="transparent" density="compact">
                    <v-card-title class="text-caption">订单商品</v-card-title>
                  </v-toolbar>
                  <v-divider />
                  <v-card-text class="pa-0">
                    <template v-if="orderItems">
                      <OrderItemsSection :items="orderItems" />
                    </template>
                  </v-card-text>
                </v-card>
                <OrderPriceSection
                  v-if="order"
                  :totalAmount="order.totalAmount"
                  :payAmount="order.payAmount"
                  :promotionAmount="order.promotionAmount"
                />

                <OrderBillSection class="mt-4" />
              </v-col>
            </v-row>
          </v-tabs-window-item>
          <v-tabs-window-item :value="2">
            <v-row>
              <v-col cols="12" v-if="order">
                <v-card>
                  <v-toolbar color="transparent">
                    <v-spacer> </v-spacer>
                    <v-btn size="small" color="red" variant="tonal"
                      >去退款</v-btn
                    >
                  </v-toolbar>
                  <v-divider />
                  <v-stepper-vertical v-model="step">
                    <template v-slot:default="{ step }">
                      <v-stepper-vertical-item
                        :complete="order.status > 0"
                        subtitle="订单支付信息"
                        value="0"
                        :error="order.status > 3"
                      >
                        <template v-slot:title>
                          <div class="text-subtitle-2 font-weight-bold">
                            支付
                          </div>
                        </template>
                        <v-card variant="flat" class="border" v-if="order">
                          <v-card-text>
                            <v-row dense>
                              <v-col cols="12">
                                <div class="text-caption ml-2 font-weight-bold">
                                  支付方式
                                </div>
                                <v-radio-group
                                  inline
                                  hide-details
                                  v-model="order.payType"
                                  readonly
                                >
                                  <v-radio :value="0">
                                    <template v-slot:label>
                                      <div class="text-caption">微信</div>
                                    </template>
                                  </v-radio>
                                  <v-radio :value="1">
                                    <template v-slot:label>
                                      <div class="text-caption">支付宝</div>
                                    </template>
                                  </v-radio>
                                </v-radio-group>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  label="交易流水号"
                                  placeholder="1-1-20240829001010-100"
                                  persistent-placeholder
                                  variant="solo-filled"
                                  flat
                                  hide-details="auto"
                                  append-inner-icon="mdi-content-copy"
                                  :value="order.outTradeNo"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  label="支付金额"
                                  placeholder="1-1-20240829001010-100"
                                  persistent-placeholder
                                  variant="solo-filled"
                                  flat
                                  hide-details="auto"
                                  :value="order.payAmount / 100"
                                  suffix="/元"
                                  prefix="¥"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  label="支付时间"
                                  placeholder="1-1-20240829001010-100"
                                  persistent-placeholder
                                  variant="solo-filled"
                                  flat
                                  hide-details="auto"
                                  :value="order.paymentTime"
                                >
                                </v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                        <template v-slot:next="{ next }">
                          <v-btn @click="next" size="small">
                            查看收货信息
                          </v-btn>
                        </template>

                        <template v-slot:prev></template>
                      </v-stepper-vertical-item>
                      <v-stepper-vertical-item
                        :complete="order.status < 4 && order.status > 1"
                        subtitle="订单发货信息确认"
                        value="1"
                        :error="order.status > 3"
                      >
                        <template v-slot:title>
                          <div class="text-subtitle-2 font-weight-bold">
                            未发货
                          </div>
                        </template>
                        <v-card>
                          <v-alert
                            icon="mdi-alert"
                            color="red"
                            variant="tonal"
                            density="compact"
                            rounded="0"
                          >
                            <template v-slot:text>
                              <div class="text-caption">
                                虚拟订单不需要发货信息
                              </div>
                            </template>
                          </v-alert>
                          <v-card-text>
                            <v-row dense>
                              <v-col cols="12" md="6" dense>
                                <v-text-field
                                  :value="order.receiverCity"
                                  variant="solo-filled"
                                  flat
                                  label="城市"
                                  placeholder="城市"
                                  persistent-placeholder
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  :value="order.receiverDetailAddress"
                                  variant="solo-filled"
                                  flat
                                  label="详细地址"
                                  hide-details="auto"
                                  placeholder="详细地址"
                                  persistent-placeholder
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  :value="order.receiverName"
                                  variant="solo-filled"
                                  flat
                                  label="收货人姓名"
                                  hide-details="auto"
                                  placeholder="收货人姓名"
                                  persistent-placeholder
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  :value="order.receiverPhone"
                                  variant="solo-filled"
                                  flat
                                  label="收货人电话"
                                  hide-details="auto"
                                  placeholder="收货人电话"
                                  persistent-placeholder
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  :value="order.receiverPostCode"
                                  variant="solo-filled"
                                  flat
                                  label="邮编"
                                  placeholder="邮编"
                                  hide-details="auto"
                                  persistent-placeholder
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  :value="order.receiverProvince"
                                  variant="solo-filled"
                                  flat
                                  label="省份"
                                  placeholder="省份"
                                  hide-details="auto"
                                  persistent-placeholder
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  value="中国大陆"
                                  variant="solo-filled"
                                  flat
                                  label="地区"
                                  placeholder="地区"
                                  hide-details="auto"
                                  persistent-placeholder
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                        <template v-slot:prev="{ prev }">
                          <v-btn @click="prev" size="small"> 支付信息 </v-btn>
                        </template>
                        <template v-slot:next="{ next }">
                          <v-btn @click="next" size="small"> 去发货 </v-btn>
                        </template>
                      </v-stepper-vertical-item>
                      <v-stepper-vertical-item
                        :complete="order.status < 4 && order.status > 2"
                        subtitle="物流信息"
                        value="2"
                        :error="order.status > 3"
                      >
                        <template v-slot:title>
                          <div class="text-subtitle-2 font-weight-bold">
                            已发货
                          </div>
                        </template>
                        <v-card>
                          <v-alert
                            icon="mdi-alert"
                            density="compact"
                            rounded="0"
                          >
                            <template v-slot:text>
                              <div class="text-caption">
                                虚拟订单默认为<strong>已收货</strong>
                              </div>
                            </template>
                          </v-alert>
                          <v-card-text>
                            <v-checkbox
                              hide-details
                              :value="order.confirmStatus"
                              :true-value="1"
                              :false-value="0"
                            >
                              <template v-slot:label>
                                <div class="text-caption">已收货</div>
                              </template>
                            </v-checkbox>
                            <v-text-field
                              label="收货时间"
                              variant="solo"
                              flat
                              density="comfortable"
                              persistent-placeholder
                              placeholder="收货时间"
                              :value="order.receiveTime"
                            ></v-text-field>
                          </v-card-text>
                        </v-card>
                        <template v-slot:prev="{ prev }">
                          <v-btn @click="prev" size="small"> 发货信息 </v-btn>
                        </template>
                        <template v-slot:next="{ next }">
                          <v-btn @click="next" size="small"> 提交完成 </v-btn>
                        </template>
                      </v-stepper-vertical-item>
                      <v-stepper-vertical-item
                        :complete="order.status < 4 && order.status > 3"
                        subtitle="订单服务已完成"
                        value="3"
                        :error="order.status > 3"
                        hide-actions
                      >
                        <template v-slot:title>
                          <div class="text-subtitle-2 font-weight-bold">
                            已完成
                          </div>
                        </template>
                      </v-stepper-vertical-item>
                      <v-stepper-vertical-item
                        :complete="order.status === 4"
                        subtitle="订单全额退款"
                        value="4"
                        hide-actions
                      >
                        <template v-slot:title>
                          <div class="text-subtitle-2 font-weight-bold">
                            已关闭
                          </div>
                        </template>
                        <v-alert icon="mdi-alert" density="compact">
                          <template v-slot:text>
                            <div class="text-caption">
                              虚拟订单默认为<strong>已收货</strong>
                            </div>
                          </template>
                        </v-alert>
                      </v-stepper-vertical-item>
                      <v-stepper-vertical-item
                        hide-actions
                        :complete="order.status === 5"
                        subtitle="支付失败或订单超时"
                        value="5"
                        color="indigo"
                      >
                        <template v-slot:title>
                          <div class="text-subtitle-2 font-weight-bold">
                            无效订单
                          </div>
                        </template>
                      </v-stepper-vertical-item>
                    </template>
                  </v-stepper-vertical>
                </v-card>
                <!--
                <OrderStatusStepper
                  v-if="order"
                  :status="order.status"
                  :orderId="order.id"
                  :bfAppId="order.bfAppId"
                />
              -->
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { copyOrderInfo } from "@/composables/order";
import { Order, OrderItem } from "@/sdk/order/types";
import bugfreed from "@/sdk";
import { OrderService } from "@/sdk/order/order";

const route = useRoute();
const id = (route.params as { id: number }).id;
const api = new OrderService({ bugfreed });
const order = ref<Order>();
const orderItems = ref<OrderItem[]>([]);
const tab = ref(0);
const step = computed(()=>{
  return order.value?.status || 0
})
const copy = () => {
  if (order) {
    copyOrderInfo({
      ...order.value,
      items: orderItems.value,
    });
  }
};

onMounted(async () => {
  if (!id) return;
  const { success, data } = await api.get(id, true);
  if (success) {
    order.value = data.order;
    orderItems.value = data.orderItems;
  }
});
</script>

<route lang="yaml">
meta:
  title: "编辑订单"
  breadcrumb: "查看"
</route>
