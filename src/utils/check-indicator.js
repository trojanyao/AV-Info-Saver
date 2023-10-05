// 编号标识列表
const INDICATORS = ["vol", "Vol", "VOL", "Case", "FILE", "Talk"];

// 检测是否包含编号标识
export function checkIndicator(workName) {
  // 是否包含编号标识
  let indicatorIndex = INDICATORS.findIndex((d) => workName.includes(d));

  if (indicatorIndex > -1) {
    // 包含编号标识：返回标识和编号部分

    // 标识类型
    let indicator = INDICATORS[indicatorIndex];

    // 标识符和编号部分
    let num = workName.match(new RegExp(indicator + "[\\S\\s]*\\d+"))?.[0];

    return num;
  } else {
    // 不包含编号标识：返回 undefined
    return undefined;
  }
}
