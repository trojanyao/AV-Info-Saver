// 厂商名转换列表
const makerJSON = `{
    "プレステージ": "Prestige"
}`;

export default async function Prestige(url) {
  // 定义页面元素
  let makerName,
    workName,
    seriesName,
    date,
    actress = [],
    code,
    imgUrl,
    duration;
  // 仅在作品页生效
  if (url.includes("https://www.prestige-av.com/goods/")) {
    // 作品名
    const spanText = document.querySelector(".min-h-main h1 span").innerText;
    workName = document
      .querySelector(".min-h-main h1")
      .innerText.replace(spanText, "")
      .trim();
    // console.log('作品名', workName)

    // 作品信息列表
    let keyList = document.querySelectorAll(".text-xl > .hidden > .flex > p");
    let valueList = document.querySelectorAll(
      ".text-xl > .hidden > .flex > div"
    );
    // keyList 是 NodeList，不是数组，先转换为数组，再取出其值
    keyList = [...keyList].map((key) => key.innerText);
    valueList = [...valueList].map((value) => value.innerText);
    // console.log('数据列表', keyList, valueList)

    // 厂商名
    let makerTrans = JSON.parse(makerJSON);
    const makerIndex = keyList.findIndex((key) => key.includes("メーカー"));
    makerName = makerTrans[valueList[makerIndex]] ?? valueList[makerIndex];
    // console.log('厂商名', makerIndex, makerName)

    // 系列名
    const seriesIndex = keyList.findIndex((key) => key.includes("シリーズ"));
    seriesName = seriesIndex > -1 ? valueList[seriesIndex] : null; // 如果包含系列字段，说明有系列名称
    // console.log('系列名', seriesName)

    // 日期
    date = valueList[0];
    console.log("日期", date);

    // 演员列表
    // let aList = infoList[1].querySelectorAll('.spec-content > span')
    // aList.forEach(a => actress.push(a.innerText.trim()))
    // actress[0] = infoList[0].innerText
    const actIndex = keyList.findIndex((key) => key.includes("出演者"));
    actress[0] = valueList[actIndex];
    console.log("演员列表", actress);

    // 番号
    const codeIndex = keyList.findIndex((key) => key.includes("品番"));
    code = valueList[codeIndex];
    // code = infoList[4].innerText.replace('TKT', '')
    // let codeCap = code.match(/[a-z,A-Z]+/)?.[0].toLowerCase()
    // let codeNum = code.match(/[0-9]+/)?.[0]
    console.log("番号", code);

    // 封面地址
    const url = document
      .querySelector(".c-ratio-image img")
      .src.replace("pf", "pb").replace("_p_", "_e_");
    imgUrl = url.match(/^https[\s\S]+\.jpg/)?.[0];
    // const res = await fetch(imgUrl);
    // try {
    //   const blob = await res.blob();
    //   imgUrl = window.URL.createObjectURL(blob);
    // } catch (e) {
    //   console.log("下载图片失败", e);
    // }
    console.log("图片地址", imgUrl);
    // https://www.prestige-av.com/api/media/goods/prestige/ezd/374/pb_e_ezd-374.jpg
    // https://www.prestige-av.com/api/media/goods/prestige/ezd/374/pb_p_ezd-374.jpg

    let av = {
      makerName: makerName,
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      imgUrl: imgUrl,
      duration: duration,
    };
    console.log("Prestige AV 对象", av);
    return av;
  }
}
