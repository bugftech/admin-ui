// copyToClipboardFormatted 格式化文字
export function copyToClipboardFormatted(obj: any) {
  let formattedText = "";
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      // 如果是数组，将其转换为以数字索引为键的对象
      obj.forEach((item) => {
        formattedText += item + "\n";
      });
    } else {
      for (const key in obj) {
        formattedText += key + ": " + obj[key] + "\n";
      }
    }
  }

  // 创建一个临时的textarea元素
  const textarea = document.createElement("textarea");
  textarea.value = formattedText;
  document.body.appendChild(textarea);

  // 选择textarea中的文本
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  // 执行复制操作
  const successful = document.execCommand("copy");

  // 移除textarea元素
  document.body.removeChild(textarea);
  // 根据复制操作的成功与否弹出相应提示
  if (successful) {
    alert("文本已成功复制到剪贴板！");
  } else {
    alert("复制失败，请手动复制文本。");
  }
}
