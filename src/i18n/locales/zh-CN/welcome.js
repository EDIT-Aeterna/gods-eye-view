/** Simplified Chinese pack — first-launch welcome launcher. */
export default {
  kicker: '任务控制 · 首次启动',
  title: '选择你的首个视角',
  description:
    '它看起来像一座禁止进入的驾驶舱——然后你会意识到：数据源全部公开，数据都是真实的。',
  missions: {
    contacts: {
      label: '实时目标',
      subcopy: '飞机、船舶与附近情报',
    },
    spaceMissions: {
      label: '太空任务',
      subcopy: '发射、航天器与轨道态势',
    },
    environmental: {
      label: '环境监测',
      subcopy: '来自 USGS 与 NASA 的实时地震和活跃火点',
      choices: {
        environmental: '环境监测',
        earthWatch: '地球观察',
        activeEvents: '活跃事件',
      },
    },
    explore: {
      label: '自行探索',
      subcopy: '从干净的地球开始',
    },
  },
  suppress: '不再显示',
  escToDismiss: '按 ESC 关闭',
  tip: '提示： dock 中的 GEV MIC 按钮可以让你与地图对话。',
  busy: {
    contacts: '正在启动实时目标…',
    spaceMissions: '正在打开太空任务…',
    environmental: '正在扫描活跃事件…',
    fallback: '正在处理…',
  },
  failure: {
    missionOpen: '无法打开该任务{detail}。请重试或自行探索。',
    storageBlocked: '该浏览器正在阻止存储，因此未能保存此项设置。',
  },
};
