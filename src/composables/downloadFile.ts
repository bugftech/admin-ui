// downloadCSV 下载csv
export function downloadCSV(data: any[][], fileName: string) {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    data.map((row) => row.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);
  document.body.appendChild(link); // 必须添加到DOM树中才能触发下载
  link.click();
  document.body.removeChild(link); // 下载完成后移除
}
