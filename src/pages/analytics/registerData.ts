function getLast7Days(): string[] {
  const today = new Date();
  const last7Days: string[] = [];

  for (let i = 1; i <= 7; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    last7Days.push(pastDate.toISOString().split("T")[0]);
  }

  return last7Days;
}

// registerData 注册人数数据
export const registerData = {
  labels: getLast7Days().reverse(),
  datasets: [
    {
      label: "注册数",
      backgroundColor: "#3F51B5",
      borderColor: "#3F51B5",
      borderWidth: 3,
      data: [5, 10, 8, 6, 7, 12, 9], // 示例注册数据
    },
  ],
};

// registerOptions 图表配置
export const registerOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
    },
  },
};
