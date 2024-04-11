// downloadCSV 下载csv文件
export const downloadCSV = (
  items: any[],
  filename: string,
  headers: { title: string; key: string }[]
) => {
  // 根据 headers 定义的顺序构建标题行
  const headerRow = headers.map((header) => header.title).join(",") + "\n";

  // 根据 headers 定义的顺序构建数据行
  const csvContent = items
    .map((item) => {
      return headers
        .map((header) => {
          const value = item[header.key] !== undefined ? item[header.key] : ""; // 如果属性不存在，则使用空字符串
          return value;
        })
        .join(",");
    })
    .join("\n");

  // 将标题行和数据行合并为 CSV 字符串
  const csvString = headerRow + csvContent;

  // 创建一个 Blob 对象
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

  // 创建一个下载链接
  const link = document.createElement("a");
  if (link.download !== undefined) {
    // 检查浏览器是否支持 download 属性
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.error("浏览器不支持下载功能，请手动复制 CSV 数据并粘贴到文件中。");
  }
};
