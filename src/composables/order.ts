import { copyToClipboardFormatted } from "./copy";

// Translation 翻译类型
interface Translation {
  [key: string]: string;
}

// BasicTranslation 基础信息翻译
export const BasicTranslation: Translation = {
  bfAppId: "应用ID",
  memberUsername: "会员用户名",
  id: "ID",
  autoConfirmDay: "自动确认天数",
  confirmStatus: "确认状态",
  deleteStatus: "删除状态",
  orderSn: "订单编号",
  orderType: "订单类型",
  payType: "支付类型",
  sourceType: "来源类型",
  commentTime: "评论时间",
  modifyTime: "修改时间",
  createTime: "创建时间",
  paymentTime: "支付时间",
};

// NoteTranslation 备注翻译
export const NoteTranslation: Translation = {
  hospital: "就诊医院",
  department: "科室",
  expectedTreatmentTime: "期望就诊时间",
  patientName: "就诊人",
  patientContactPerson: "联系人",
  patientContactPersonPhone: "联系人手机号",
  others: "其他的服务要求",
  inquiryHospital: "代问诊医院",
  expectedInquiryTime: "期望代问诊时间",
  medicineHospital: "代办开药/取药医院",
  drugDetail: "药品名称及规格",
  drugNumber: "药品数量",
  agencyTime: "代办时间",
  receiverAddress: "收货地址",
  testHospital: "期望检查的医院",
  testProject: "检查项目",
  expectedTestTime: "代约时间",
  agencyHospital: "代办医院",
  agencyDepartment: "代办科室",
};

// ProductTranslation 商品翻译
export const ProductTranslation: Translation = {
  productName: "商品",
  productSubTitle: "商品副标题",
  productQuantity: "数量",
  productPrice: "单价",
  realAmount: "折后价格",
};

const copyBasicKeys: (keyof Translation)[] = ["memberUsername", "orderSn"];
const copyProductKeys: (keyof Translation)[] = [
  "productName",
  "productSubTitle",
  "productQuantity",
  "productPrice",
  "realAmount",
];

// copyOrderInfo 复制订单信息
export function copyOrderInfo(obj: any) {
  const arr: string[] = [];
  // 复制基础信息
  for (const key of copyBasicKeys) {
    if (obj[key] != undefined) {
      const str = BasicTranslation[key] + ": " + obj[key];
      arr.push(str);
    }
  }

  // 复制备注
  if (obj["note"] != undefined) {
    let parsedObject: Translation | string = "";
    try {
      parsedObject = JSON.parse(obj["note"]);
    } catch (error) {
      // 解析失败，返回原始字符串
      parsedObject = obj["note"];
    }
    if (typeof parsedObject === "object") {
      Object.keys(parsedObject).forEach((key) => {
        // 获取键对应的值
        const value = (parsedObject as Translation)[key];
        const translatedKey = NoteTranslation[key];
        const str = translatedKey + ": " + value;
        arr.push(str);
      });
    } else {
      arr.push("备注信息: " + parsedObject);
    }
  }

  if (Array.isArray(obj["items"])) {
    obj["items"].forEach((item, index) => {
      arr.push(`\n------ 商品${index + 1} ------\n`);
      for (const key of copyProductKeys) {
        if (item[key] != undefined) {
          const str = ProductTranslation[key] + ": " + item[key];
          arr.push(str);
        }
      }
    });
  }

  copyToClipboardFormatted(arr);
}
