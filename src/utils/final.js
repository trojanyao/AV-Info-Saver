import { datify } from "./datify";
import { codify } from "./codify";
import { refineTitle } from "./refine-title";
import { refineActress } from "./refine-actress";
import { checkIndicator } from "./check-indicator";
import { checkDigit } from "./check-digit";

const DIGIT_FIRST_SERIES = ["ラグジュTV", "新入社員のお仕事", "社長秘書のお仕事", "職女。"];

// 拼接最后文件名
export default async function final(avObj) {
  // 深拷贝
  let av = JSON.parse(JSON.stringify(avObj));
  let finalName;

  if (av.code) {
    // ---------- 日本作品，有番号 ----------
    // ----- 处理演员名 -----
    av = refineActress(av);

    // ----- 处理标题 -----
    av = refineTitle(av);

    // ----- 处理系列名 -----
    if (av && av.seriesName) {
      av.seriesName = av.seriesName.trim();

      const numType1 = checkIndicator(av.workName); // 是否包含编号标识
      const numType2 = checkDigit(av.workName, av.seriesName); // 是否包含纯数字

      if (numType1 || (!numType1 && numType2)) {
        // 包含编号标识 / 不包含编号标识但包含纯数字：
        // 系列名（日期）编号部分（番号）演员名
        const digitFirstSeries = DIGIT_FIRST_SERIES.find((x) => av.seriesName === x);

        if (digitFirstSeries) {
          finalName = `${av.seriesName} ${numType1 ?? numType2}（${datify(av.date)}）${
            av.actress
          }（${av.code}）${av.actressRealName ?? ""}`;
        } else {
          finalName = `${av.seriesName}（${datify(av.date)}）${numType1 ?? numType2}（${av.code}）${
            av.actress
          }`;
        }
      } else {
        // 不含编号
        // 系列名（日期）演员名（番号）
        finalName = `${av.seriesName}（${datify(av.date)}）${av.actress}（${av.code}）`;
      }

      // /* 不含编号：检测作品名前缀（空格之前的内容）和系列名的关系 */
      // let workPrefix = av.workName?.match(/^(\S+)\s+(\S+)/)
      // console.log('作品名前缀', workPrefix?.[1])
      // // 判断作品名前缀和系列名之间的关系
      // // 作品名包含系列名
      // let workHasSeries = workPrefix?.[0] ? workPrefix[1].trim().replaceAll(' ', '').includes(av.seriesName) : false
      // console.log('作品名前缀中包含系列名', workHasSeries)
      // // 系列名是否包含作品名
      // let seriesHasWork = av.seriesName.includes(workPrefix?.[1].trim().replaceAll(' ', ''))
      // console.log('系列名中包含作品名前缀', seriesHasWork)
      // /* 作品名前缀包含系列名，或系列名包含作品名前缀，说明作品名包含系列名 */
    } else {
      // （日期）演员（番号）作品名
      finalName = `（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName}`;
    }

    finalName = `【${av.makerName}】${finalName}${
      av.duration ? (av.resolution ? `[${av.duration}; ${av.resolution}]` : `[${av.duration}]`) : ""
    }.jpg`;
  } else {
    // ---------- 欧美作品，无番号 ----------
    // 替换半角冒号
    av.workName = av.workName.replace(": ", "-");
    const newActress = [];
    for (const a of av.actress) {
      await newActress.push(a.toLowerCase().replace(/\b(\w)|\s(\w)/g, (s) => s.toUpperCase()));
    }

    finalName = `【${av.makerName}】${av.seriesName || ""}（${datify(av.date)}）${newActress.join(
      ", "
    )} - ${av.workName}${av.duration ? `[${av.duration}; ${av.resolution.join(", ")}]` : ""}.jpg`;
  }

  return finalName;
}
