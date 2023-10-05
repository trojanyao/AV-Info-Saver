export function refineTitle(av) {
  // 去头尾演员名
  let startAct = new RegExp("^" + av.actress, "g");
  let endAct = new RegExp(av.actress + "$", "g");
  let temp = startAct.test(av.workName) || endAct.test(av.workName);
  if (temp) {
    av.workName = av.workName.replace(av.actress, "");
  }
  // 头尾去空格
  av.workName = av.workName.trim();
  return av;
}
