export const nameRules = [
  (v: any) => !!v || "名字是必须的",
  (v: any) => (v && v.length <= 10) || "名字不能低于10个字符",
];

export const nonEmptyRules = [(v: any) => !!v || "该选项不允许为空"];


export const emailRules = [
  (value: any) => {
    if (value) return true;

    return "邮件不允许为空";
  },
  (value: any) => {
    if (/.+@.+\..+/.test(value)) return true;

    return "无效的邮件格式";
  },
];
