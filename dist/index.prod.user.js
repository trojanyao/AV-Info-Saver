// ==UserScript==
// @name        AV-Info-Quick-Saver
// @namespace
// @version     1.0.1
// @author      TROJAN <ytj1996@sina.com>
// @source
// @match       https://www.madonna-av.com/*
// @match       https://www.naughtyamerica.com/*
// @match       https://www.1pondo.tv/*
// @match       https://www.prestige-av.com/*
// @require     https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/axios@0.26.0/dist/axios.min.js
// @require     https://cdn.jsdelivr.net/npm/axios-userscript-adapter@0.1.11/dist/axiosGmxhrAdapter.min.js
// @grant       GM.xmlHttpRequest
// @grant       GM.download
// @connect     httpbin.org
// @run-at      document-end
// ==/UserScript==


/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/create-btn.ts
function createBtn() {
  // ----- 引用脚本 -----
  let iconify = document.createElement('script');
  iconify.type = 'text/javascript';
  iconify.src = 'https://code.iconify.design/1/1.0.4/iconify.min.js';
  document.querySelector('head').appendChild(iconify); // ----- 读取存储 -----

  var autoSave = localStorage.getItem('autoSave') ? localStorage.getItem('autoSave') : 'no'; // ----- 界面 -----

  let wrapper = document.createElement('div');
  let a = document.createElement('a');
  let menuDiv = document.createElement('div');
  let titleDiv = document.createElement('div');
  let toggleDiv = document.createElement('div');
  let toggleText = document.createElement('div');
  let toggleBtn = document.createElement('div'); // ----- 样式 -----
  // --- 容器 ---

  wrapper.style.position = 'fixed';
  wrapper.style.top = '10px';
  wrapper.style.right = '10px';
  wrapper.style.padding = '15px 20px';
  wrapper.style.background = 'rgba(241, 241, 241, .92)'; //wrapper.style.background = 'rgba(0, 0, 0, .5)';

  wrapper.style.borderRadius = '16px';
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.zIndex = '99999';
  document.querySelector('body').appendChild(wrapper); // *** 下载按钮 ***

  a.style.display = 'flex';
  a.style.justifyContent = a.style.alignItems = 'center';
  a.style.width = a.style.height = '48px';
  a.style.borderRadius = '50%';
  a.style.backgroundColor = '#1E93FF';
  a.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #E7E7E7 100%)';
  a.style.boxShadow = '5px 5px 13px rgba(207, 207, 207, 0.9), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px -5px 10px rgba(207, 207, 207, 0.2), -5px 5px 10px rgba(207, 207, 207, 0.2), inset -1px -1px 2px rgba(207, 207, 207, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.3)';
  wrapper.appendChild(a); // 按钮图标

  let icon = document.createElement('span');
  icon.style.display = 'block';
  icon.classList.add('iconify');
  icon.dataset.inline = 'false';
  icon.dataset.icon = 'icomoon-free:download';
  icon.style.color = '#1E93FF';
  icon.style.fontSize = '24px';
  a.appendChild(icon); // *** 标题 & 菜单 ***

  wrapper.appendChild(menuDiv);
  menuDiv.style.marginLeft = '10px';
  menuDiv.style.display = 'flex';
  menuDiv.style.flexDirection = 'column';
  menuDiv.style.fontFamily = '"PingFang SC", sans-serif'; // ** 标题 **

  titleDiv.id = 'title';
  titleDiv.innerHTML = 'AV 作品信息一键保存工具';
  titleDiv.style.fontSize = '18px';
  titleDiv.style.fontWeight = '600';
  menuDiv.appendChild(titleDiv); // ** 菜单 **

  toggleDiv.style.marginTop = '10px';
  toggleDiv.style.width = document.querySelector('#title').offsetWidth;
  toggleDiv.style.display = 'flex';
  toggleDiv.style.flexDirection = 'row';
  toggleDiv.style.justifyContent = 'space-between';
  toggleDiv.style.alignItems = 'center';
  menuDiv.appendChild(toggleDiv); // 菜单文本

  toggleText.innerHTML = '打开作品页后自动保存';
  toggleText.fontSize = '12px';
  toggleDiv.appendChild(toggleText); // 菜单按钮

  toggleBtn.style.width = '36px';
  toggleBtn.style.height = '18px';
  toggleBtn.style.borderRadius = '18px';

  if (autoSave === 'yes') {
    toggleBtn.style.background = 'linear-gradient(90deg, #1E93FF 0%, #1C8CF2 100%)';
    toggleBtn.style.boxShadow = 'inset -5px -5px 10px rgba(31, 154, 255, 0.9), inset 5px -5px 10px rgba(25, 126, 218, 0.2), inset -5px 5px 10px rgba(25, 126, 218, 0.2)';
  } else if (autoSave === 'no') {
    toggleBtn.style.background = 'linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)';
    toggleBtn.style.boxShadow = '-1px -1px 2px rgba(219, 219, 219, 0.5), 1px 1px 2px rgba(255, 255, 255, 0.3), inset 5px 5px 13px rgba(219, 219, 219, 0.9), inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px -5px 10px rgba(219, 219, 219, 0.2), inset -5px 5px 10px rgba(219, 219, 219, 0.2)';
  }

  toggleBtn.style.border = '1px solid #1E93FF';
  toggleBtn.style.position = 'relative';
  toggleBtn.style.cursor = 'pointer';
  toggleDiv.appendChild(toggleBtn); // 按钮

  let btn = document.createElement('div');
  btn.style.position = 'absolute';
  btn.style.width = btn.style.height = '18px';
  btn.style.borderRadius = '50%';
  btn.style.background = '#F3F3F3';

  if (autoSave === 'yes') {
    btn.style.left = '18px';
    btn.style.boxShadow = '5px 5px 13px rgba(219, 219, 219, 0.9), 5px -5px 10px rgba(219, 219, 219, 0.2), -5px 5px 10px rgba(12, 72, 128, 0.2), inset -1px -1px 2px rgba(219, 219, 219, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.3)';
  } else if (!autoSave === 'no') {
    btn.style.left = '0';
    btn.style.boxShadow = '5px 5px 13px rgba(219, 219, 219, 0.9), -5px -5px 10px rgba(255, 255, 255, 0.25), 5px -5px 10px rgba(219, 219, 219, 0.2), -5px 5px 10px rgba(219, 219, 219, 0.2), inset -1px -1px 2px rgba(219, 219, 219, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.3)';
  }

  btn.style.display = 'flex';
  btn.style.justifyContent = 'center';
  btn.style.alignItems = 'center';
  btn.style.transition = 'all 200ms ease-out';
  toggleBtn.appendChild(btn);
  let dot = document.createElement('div');
  dot.style.width = dot.style.height = '6px';
  dot.style.borderRadius = '50%';
  dot.style.background = 'radial-gradient(50% 50% at 50% 50%, #1E93FF 45.31%, #1B84E6 100%)';
  btn.appendChild(dot); // Toggle

  toggleBtn.onclick = () => {
    if (!localStorage.getItem('autoSave') || localStorage.getItem('autoSave') === 'no') {
      toggleBtn.style.background = 'linear-gradient(90deg, #1E93FF 0%, #1C8CF2 100%)';
      toggleBtn.style.boxShadow = 'inset -5px -5px 10px rgba(31, 154, 255, 0.9), inset 5px -5px 10px rgba(25, 126, 218, 0.2), inset -5px 5px 10px rgba(25, 126, 218, 0.2)';
      btn.style.left = '18px';
      btn.style.boxShadow = '5px 5px 13px rgba(219, 219, 219, 0.9), 5px -5px 10px rgba(219, 219, 219, 0.2), -5px 5px 10px rgba(12, 72, 128, 0.2), inset -1px -1px 2px rgba(219, 219, 219, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.3)';
      localStorage.setItem('autoSave', 'yes');
      console.log('点击按钮');
      a.click();
    } else if (localStorage.getItem('autoSave') === 'yes') {
      toggleBtn.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #E7E7E7 100%)';
      toggleBtn.style.boxShadow = '-1px -1px 2px rgba(219, 219, 219, 0.5), 1px 1px 2px rgba(255, 255, 255, 0.3), inset 5px 5px 13px rgba(219, 219, 219, 0.9), inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px -5px 10px rgba(219, 219, 219, 0.2), inset -5px 5px 10px rgba(219, 219, 219, 0.2)';
      btn.style.left = '0';
      btn.style.boxShadow = '5px 5px 13px rgba(219, 219, 219, 0.9), -5px -5px 10px rgba(255, 255, 255, 0.25), 5px -5px 10px rgba(219, 219, 219, 0.2), -5px 5px 10px rgba(219, 219, 219, 0.2), inset -1px -1px 2px rgba(219, 219, 219, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.3)';
      localStorage.setItem('autoSave', 'no');
    }
  }; // ----- 点击事件 -----
  // 点击按钮


  a.onmousedown = () => {
    a.style.background = 'linear-gradient(135deg, #E7E7E7 0%, #FFFFFF 100%)';
  };

  a.onmouseup = () => {
    a.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #E7E7E7 100%)';
  };

  return a;
}
;// CONCATENATED MODULE: ./src/utils/datify.js
// 発売日 标准化
function datify(date) {
  let newDate; // console.log('传入的日期', date)

  if (/\d{4}\.\d{2}\.\d{2}/.test(date)) {
    // console.log('1')
    newDate = date;
  } else if (/\d+\/\d+\/\d+/.test(date)) {
    // console.log('2')
    newDate = new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replaceAll('/', '.');
  } else {
    // console.log('3')
    let year = date.match(/(\d{4})年/)[1];
    let month = date.match(/(\d{1,2})月/)[1];
    let day = date.match(/(\d{1,2})日/)[1];
    newDate = `${year}.${month.length === 1 ? '0' + month : month}.${day.length === 1 ? '0' + day : day}`;
  } // console.log('处理后的日期', newDate)


  return newDate;
}
;// CONCATENATED MODULE: ./src/utils/codify.ts
// 品番 标准化
function codify(code) {
  if (/[a-z,A-Z]/.test(code)) {
    // 有字母的番号
    // 番号数字位
    let codeNum = code.match(/\d+/);
    let codeCap = code.match(/[A-Z,a-z]+/);
    let newCodeNum; // 处理番号数字位大于3，有多个0的情况

    if (codeNum[0] && codeNum[0].length > 3) {
      newCodeNum = codeNum[0].slice(-3);
      code = code.replace(codeNum[0], newCodeNum);
    }

    return `${codeCap}-${codeNum}`.toUpperCase();
  } else {
    // 纯数字番号
    return code;
  }
}
;// CONCATENATED MODULE: ./src/utils/final.js

 // 拼接最后文件名

async function final_final(av) {
  let finalName;
  console.log('传入的 AV 对象', av); // ***** 处理标题 *****
  // 去末尾演员名

  let endAct = new RegExp(av.actress[0] + '$', 'g');

  if (endAct.test(av.workName)) {
    av.workName = av.workName.replace(av.actress[0], '');
  } // 头尾去空格


  av.workName = av.workName.trim();

  if (av.code) {
    // ---------- 日本作品，有番号 ----------
    // 处理演员列表（拼接）
    av.actress.map(a => {
      a = a.trim().replace(' ', '');
    });
    av.actress = av.actress.join(' ');

    if (av && av.seriesName) {
      // *** 系列作品 ***
      let subName; // 除系列名外剩下的名称

      if (av.workName.includes('vol')) {
        // if (av.workName.includes(av.seriesName.trim())) {
        // 作品名包含系列名
        finalName = `【${av.makerName}】${av.seriesName}（${datify(av.date)}）${av.workName.replace(av.seriesName, '').trim()}（${codify(av.code)}）${av.actress}${av.duration ? ` [${av.duration}]` : ``}.jpg`; // } else if (!av.workName.includes(av.seriesName.trim())) {
        //     // 作品名不含系列名
        //     finalName = `【${av.makerName}】${av.seriesName}（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.duration ? `[${av.duration}]` : ``}.jpg`
        // }
      } else {
        if (av.workName.includes(av.seriesName.trim())) {
          // 作品名包含系列名
          finalName = `【${av.makerName}】${av.seriesName}（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName.replace(av.seriesName, '').trim()}${av.duration ? ` [${av.duration}]` : ``}.jpg`;
        } else if (!av.workName.includes(av.seriesName.trim())) {
          // 作品名不含系列名
          finalName = `【${av.makerName}】${av.seriesName}（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.duration ? `[${av.duration}]` : ``}.jpg`;
        }
      }
    } else {
      // *** 单体作品 ***
      finalName = `【${av.makerName}】（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName}${av.duration ? ` [${av.duration}]` : ``}.jpg`;
    }
  } else {
    // ---------- 欧美作品，无番号 ----------
    // 替换半角冒号
    av.workName = av.workName.includes(': ') ? av.workName.replace(': ', '-') : av.workName;
    let newActress = [];

    for (let a of av.actress) {
      await newActress.push(a.toLowerCase().replace(/\b(\w)|\s(\w)/g, s => s.toUpperCase()));
    }

    console.log('修改后的演员列表', newActress);
    finalName = `【${av.makerName}】${av.seriesName || ''}（${datify(av.date)}）${newActress.join(', ')} - ${av.workName} [${av.duration}; ${av.resolution.join(', ')}].jpg`;
  }

  console.log('最后拼接的文件名', finalName);
  return finalName;
}
;// CONCATENATED MODULE: ./src/makers/madonna.js

function Madonna(url) {
  // 定义页面元素
  let workName,
      seriesName,
      date,
      actress = [],
      code,
      imgUrl; // 仅在作品页生效

  if (url.includes('https://www.madonna-av.com/works/detail/')) {
    // 页面数据列表
    let infoList = document.querySelectorAll('.works-detail-info > li');
    console.log('数据列表', infoList); // 作品名

    workName = document.querySelector('.page-main-title-tx').innerHTML; // 系列名

    seriesName = infoList[4].querySelector('a') ? infoList[4].querySelector('a').innerHTML : undefined; // 日期

    date = infoList[2].querySelector('a').innerHTML; // 演员列表

    let aList = infoList[0].querySelectorAll('li');
    actress = [];
    aList.forEach(a => actress.push(a.innerText)); // 番号

    code = infoList[7].innerHTML.match(/[a-z,A-Z]+\d+/)[0];
    code = codify(code); // 封面地址

    imgUrl = `https://www.madonna-av.com/contents/works/${code.replace('-', '').toLowerCase()}/${code.replace('-', '').toLowerCase()}-pl.jpg`;
    let av = {
      makerName: 'Madonna',
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      imgUrl: imgUrl
    }; // console.log('Madonna AV 对象', av)

    return av;
  }
}
;// CONCATENATED MODULE: ./src/makers/naughty-america.js
async function NA(url) {
  // 定义页面元素
  let workName,
      seriesName,
      date,
      actress = [],
      code,
      duration,
      resolution = [],
      imgUrl; // 仅在作品页生效

  if (url.includes('https://www.naughtyamerica.com/scene/')) {
    // 页面数据列表
    let infoList = document.querySelector('.scene-info');
    console.log('数据列表', infoList); // 作品名

    workName = document.querySelector('.scene-title').innerText; // 系列名

    seriesName = document.querySelector('.site-title').innerHTML; // 日期

    date = new Date(infoList.querySelector('.entry-date').innerText).toLocaleDateString('zh-CN'); // 演员列表

    let aList = infoList.querySelectorAll('.performer-list > a');
    aList.forEach(a => actress.push(a.innerText));
    console.log('演员列表', actress); // 番号
    // code = infoList[7].innerHTML.match(/[a-z,A-Z]+\d+/)[0]
    // code = codify(code)
    // 封面地址

    imgUrl = `https:${document.querySelector('.play-trailer > picture > source').dataset.srcset}`.replace('webp', 'jpg');
    const res = await fetch(imgUrl);

    try {
      const blob = await res.blob();
      imgUrl = window.URL.createObjectURL(blob);
    } catch (e) {} // 时长


    duration = infoList.querySelector('.duration').innerText.match(/\d+\ min/g)[0].replace(' ', '');
    let label = infoList.querySelectorAll('.flag-bg');
    label.forEach(l => {
      if (l.innerText === '4K') {
        resolution.push('4K');
      } else if (l.innerText === 'HD') {
        resolution.push('1080p');
      }
    });
    console.log('清晰度', resolution);
    let av = {
      makerName: 'Naughty America',
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      duration: duration,
      resolution: resolution,
      imgUrl: imgUrl
    };
    console.log('NA AV 对象', av);
    return av;
  }
}
;// CONCATENATED MODULE: ./src/makers/1pondo.js

async function OnePondo(url) {
  // 定义页面元素
  let workName,
      seriesName,
      date,
      actress = [],
      code,
      imgUrl,
      duration; // 仅在作品页生效

  if (url.includes('https://www.1pondo.tv/movies/')) {
    // 展开信息列表
    let showInfo = document.querySelector('button.see-more');
    console.info('展开按钮', showInfo);
    await showInfo.click(); // 页面数据列表

    let infoList = document.querySelectorAll('.movie-detail > ul > li');
    console.log('数据列表', infoList); // 作品名

    workName = document.querySelector('.movie-overview h1').innerText; // 系列名

    seriesName = infoList[2].querySelector('.spec-title').innerText.includes('シリーズ') ? infoList[2].querySelector('.spec-content').innerText : undefined; // 日期

    date = infoList[0].querySelector('.spec-content').innerText; // 演员列表

    let aList = infoList[1].querySelectorAll('.spec-content > span');
    aList.forEach(a => actress.push(a.innerText.trim())); // 番号

    code = url.match(/\d+_\d+/)[0]; // 封面地址

    imgUrl = `https://www.1pondo.tv/assets/sample/${code}/str.jpg`; // 时长

    duration = infoList[3].querySelector('.spec-content').innerText.replaceAll(':', '.');
    let av = {
      makerName: '1 Pondo',
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      imgUrl: imgUrl,
      duration: duration
    };
    console.log('1 Pondo AV 对象', av);
    return av;
  }
}
;// CONCATENATED MODULE: ./src/makers/prestige.js
// 厂商名转换列表
const makerJSON = `{
    "プレステージ": "Prestige"
}`;
async function Prestige(url) {
  // 定义页面元素
  let makerName,
      workName,
      seriesName,
      date,
      actress = [],
      code,
      imgUrl,
      duration; // 仅在作品页生效

  if (url.includes('https://www.prestige-av.com/goods/')) {
    var _code$match, _code$match2;

    // 作品信息列表
    let keyList = document.querySelectorAll('dl.spec_layout > dt');
    let infoList = document.querySelectorAll('dl.spec_layout > dd'); // keyList 是 NodeList，不是数组，先转换为数组，再取出其值

    keyList = [...keyList].map(key => {
      return key.innerText;
    });
    console.log('数据列表', keyList, infoList); // 厂商名

    let makerTrans = JSON.parse(makerJSON);
    makerName = makerTrans[infoList[3].innerText] ?? infoList[3].innerText; // 作品名

    workName = document.querySelector('.product_title_layout_01 > h1').innerText.replace(/\＋\S+/, ''); // 系列名

    seriesName = keyList.includes('シリーズ：') ? infoList[6].innerText : null; // 如果包含系列字段，说明有系列名称
    // 日期

    date = infoList[2].innerText; // 演员列表
    // let aList = infoList[1].querySelectorAll('.spec-content > span')
    // aList.forEach(a => actress.push(a.innerText.trim()))

    actress[0] = infoList[0].innerText.trim(); // 番号

    code = infoList[4].innerText;
    let codeCap = (_code$match = code.match(/[a-z,A-Z]+/)) === null || _code$match === void 0 ? void 0 : _code$match[0].toLowerCase();
    let codeNum = (_code$match2 = code.match(/[0-9]+/)) === null || _code$match2 === void 0 ? void 0 : _code$match2[0];
    console.log('番号', codeCap, codeNum); // 封面地址

    imgUrl = document.querySelector('.package_layout > a > img').src.replace('pf_p', 'pb_e'); // 时长
    // duration = infoList[3].querySelector('.spec-content').innerText.replaceAll(':', '.')

    let av = {
      makerName: makerName,
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      imgUrl: imgUrl,
      duration: duration
    };
    console.log('Prestige AV 对象', av);
    return av;
  }
}
;// CONCATENATED MODULE: ./src/index.ts
// import { get } from './utils'
// import './style/main.less'
// import { add } from './example'







async function main() {
  // 创建按钮
  let a = createBtn(); // 核心功能

  let domain = document.domain,
      url = document.URL;
  let av = {};
  console.log('域名', domain, url);

  async function trySwitch() {
    switch (domain) {
      case 'www.madonna-av.com':
        av = Madonna(url);
        break;

      case 'www.naughtyamerica.com':
        try {
          av = await NA(url);
        } catch (e) {}

        ;
        break;

      case 'www.1pondo.tv':
        try {
          av = await OnePondo(url);
        } catch (e) {}

        ;
        break;

      case 'www.prestige-av.com':
        try {
          av = await Prestige(url);
        } catch (e) {}

        ;
        break;
    }
  }

  await trySwitch();

  if (av) {
    console.log('AV对象', av);

    try {
      a.download = await final_final(av);
      a.href = av.imgUrl;
    } catch (e) {}
  } // if (autoSave === 'yes') {
  // 	a.click();
  // }

}

window.onload = () => {
  main().catch(e => {
    console.log(e);
  });
};
/******/ })()
;