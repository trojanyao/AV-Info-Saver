import { AVWork } from "../typings";

export async function OnePondo(url: string) {
  // 定义页面元素
  let workName,
    seriesName,
    date,
    actress: string[] = [],
    code,
    imgUrl,
    duration;

  // 仅在作品页生效
  if (url.includes("https://www.1pondo.tv/movies/")) {
    // 展开信息列表
    const showInfo = document.querySelector("button.see-more") as HTMLElement;
    await showInfo.click();

    // 页面数据列表
    const infoList = document.querySelectorAll(".movie-detail > ul > li");

    // 作品名
    workName = (document.querySelector(".movie-overview h1") as HTMLElement).innerText;

    // 系列名
    seriesName = (infoList[2].querySelector(".spec-title") as HTMLElement).innerText.includes(
      "シリーズ"
    )
      ? (infoList[2].querySelector(".spec-content") as HTMLElement).innerText
      : undefined;

    // 日期
    date = (infoList[0].querySelector(".spec-content") as HTMLElement).innerText;

    // 演员列表
    const aList = infoList[1].querySelectorAll(".spec-content > span");
    aList.forEach((a) => actress.push((a as HTMLElement).innerText.trim()));

    // 番号
    code = url.match(/\d+_\d+/)[0];

    // 封面地址
    imgUrl = `https://www.1pondo.tv/assets/sample/${code}/str.jpg`;

    // 时长
    duration = (infoList[3].querySelector(".spec-content") as HTMLElement).innerText.replaceAll(
      ":",
      "."
    );

    let av: AVWork = {
      makerName: "1 Pondo",
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      imgUrl: imgUrl,
      duration: duration,
    };
    return av;
  }
}
