"nodejs";
const { launchApp } = require("app");
const { showToast } = require("toast");
const { showSingleChoiceDialog, showMultiChoiceDialog } = require("dialogs");
// 默认配置
const defualtOptions = {
  positive: "确定",
  cancelable: true,
  negative: "取消",
};
// 默认主任务
const mainItems = ["日常", "打boss"];
// 默认任务列表
const taskItems = [
  "战备任务",
  "家族种植",
  "英雄帖",
  "刺探敌情",
  "太庙搬砖",
  "先皇古墓",
  "万宝宫",
  "试炼塔",
];
// 默认boss列表
const bossItems = ["蓝", "黄", "绿"];
// 选择主任务
async function selectMainTask() {
  const result = await showSingleChoiceDialog(
    "请选择要做的任务",
    mainItems,
    0,
    defualtOptions
  );
  return result;
}
// 选择子任务
async function selectChildTasks(_taskIndex) {
  if (_taskIndex >= 0) {
    // 选了日常，则开始选择要做什么任务
    let title = "请选择要做的任务";
    let items = taskItems;
    // 如果i = 1，则是选择了打boss
    if (_taskIndex == 1) {
      title = "请选择要打的boss";
      items = bossItems;
    }
    const result = await showMultiChoiceDialog(
      title,
      items,
      [],
      defualtOptions
    );
    return result;
  }
  return null;
}
// 主函数
async function main() {
  // 先选择要做的任务
  const taskIndex = await selectMainTask();
  if (taskIndex === undefined || taskIndex < 0) {
    showToast("停止执行");
    return;
  }
  // 选择子任务
  const tasks = await selectChildTasks(taskIndex);
  if (tasks === undefined || tasks === null || (tasks && tasks.length === 0)) {
    showToast("停止执行");
    return;
  }
  // 启动征途
  const startFlag = launchApp("征途2手游");
  if (startFlag) {
    showToast(`开始执行【${mainItems[taskIndex]}】`);
    showToast("请登录游戏，并选择您的角色", { duration: 5000 });
    
  } else {
    showToast("未找到【征途2手游】应用，请核实");
  }
}
// 执行
main();