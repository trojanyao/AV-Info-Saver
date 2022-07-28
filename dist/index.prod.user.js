// ==UserScript==
// @name        AV-Info-Quick-Saver
// @namespace
// @version     1.0.1
// @author      TROJAN <ytj1996@sina.com>
// @source
// @match       https://madonna-av.com/*
// @match       https://s1s1s1.com/*
// @match       https://moodyz.com/*
// @match       https://honnaka.jp/*
// @match       https://ideapocket.com/*
// @match       https://attackers.net/*
// @match       https://premium-beauty.com/*
// @match       https://mvg.jp/*
// @match       https://www.naughtyamerica.com/*
// @match       https://www.1pondo.tv/*
// @match       https://www.prestige-av.com/*
// @match       https://*.tokyo-hot.com/*
// @match       https://www.brazzers.com/*
// @match       https://www.caribbeancom.com/*
// @match       https://ec.sod.co.jp/*
// @match       https://www.mgstage.com/*
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

;// CONCATENATED MODULE: ./src/create-btn.js
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

  a.target = '_blank';
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
  menuDiv.style.color = '#333333';
  menuDiv.style.fontFamily = '"PingFang SC", sans-serif'; // ** 标题 **

  titleDiv.id = 'title';
  titleDiv.innerHTML = 'AV 作品信息一键保存工具';
  titleDiv.style.fontSize = '18px';
  titleDiv.style.fontWeight = '600';
  menuDiv.appendChild(titleDiv); // ** 菜单 **
  // toggleDiv.style.marginTop = '10px';

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
  }

  console.log('处理后的日期', newDate);
  return newDate;
}
;// CONCATENATED MODULE: ./src/utils/codify.js
// 品番 标准化
function codify(code) {
  console.log('处理前番号', code);

  if (/n\d+/.test(code)) {
    // 東京熱番号
    return code;
  } else if (/-/.test(code)) {
    // 包含连字符的番号无需处理
    return code;
  } else if (/[a-z,A-Z]/.test(code)) {
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
;// CONCATENATED MODULE: ./src/utils/refine-title.js
function refineTitle(av) {
  // 去头尾演员名
  let startAct = new RegExp('^' + av.actress, 'g');
  let endAct = new RegExp(av.actress + '$', 'g');
  let temp = startAct.test(av.workName) || endAct.test(av.workName);
  console.log('头尾是否包含演员名', temp);

  if (temp) {
    console.log('演员名字符串', av.actress);
    av.workName = av.workName.replace(av.actress, '');
  } // 头尾去空格


  av.workName = av.workName.trim();
  console.log('去头尾演员名后的标题', av.workName);
  return av;
}
;// CONCATENATED MODULE: ./src/utils/refine-actress.js
function refineActress(av) {
  av.actress = av.actress.map(a => {
    // 先剔除头尾空格
    let newA = a.trim();

    if (!newA.match(/[a-zA-Z]+/g)) {
      // 仅作用于非英文演员、非素人演员：剔除内部空格
      if (!av.actressRealName) {
        newA = newA.replaceAll(/\s/g, '');
      }
    }

    return newA;
  });
  console.log('去空格后的演员列表', av.actress);
  av.actress = av.actress.join(' ');
  return av;
}
;// CONCATENATED MODULE: ./src/utils/check-indicator.js
// 编号标识列表
const INDICATORS = ['vol', 'Vol', 'VOL', 'Case', 'FILE', 'Talk']; // 检测是否包含编号标识

function checkIndicator(workName) {
  console.log('传入的作品名', workName); // 是否包含编号标识

  let indicatorIndex = INDICATORS.findIndex(d => workName.includes(d));
  console.log('编号标识数组位置', indicatorIndex);

  if (indicatorIndex > -1) {
    var _workName$match;

    // 包含编号标识：返回标识和编号部分
    // 标识类型
    let indicator = INDICATORS[indicatorIndex];
    console.log('编号标识', indicator); // 标识符和编号部分

    let num = (_workName$match = workName.match(new RegExp(indicator + '[\\S\\s]*\\d+'))) === null || _workName$match === void 0 ? void 0 : _workName$match[0];
    console.log('标识符和编号部分', num);
    return num;
  } else {
    // 不包含编号标识：返回 undefined
    return undefined;
  }
}
;// CONCATENATED MODULE: ./src/utils/check-digit.js
// 检测是否包含纯数字
function checkDigit(workName, seriesName) {
  // 有纯数字编号也肯定是在标题中的系列名后跟着纯数字，所以先提取出后面跟着纯数字的子字符串的多种可能
  let matches = workName.matchAll(/\s*(?<substr>\S+)\d+/g);
  let subStrs = [];

  for (let match of matches) {
    let substr = match.groups.substr.replace(/\d/g, '');
    subStrs.push(substr);
  }

  console.log('########## 后面有数字的子字符串 ##########', subStrs); // 然后和系列名比对，查找出真正和系列名相关的子字符串

  let trueStr = subStrs.filter(substr => {
    if (substr.includes(seriesName) || seriesName.includes(substr)) {
      return true;
    } else {
      return false;
    }
  });
  console.log('真正的子串', trueStr);

  if (trueStr.length > 0) {
    var _workName$match;

    // 符合条件的字串数 > 0：包含纯数字
    // 查找纯数字
    let num = (_workName$match = workName.match(new RegExp(trueStr[0] + '\\s*(\\d+)'))) === null || _workName$match === void 0 ? void 0 : _workName$match[1];
    console.log('纯数字编号', num);
    return num;
  } else {
    // 符合条件的字串数 <= 0：不包含纯数字
    return undefined;
  }
}
;// CONCATENATED MODULE: ./src/utils/final.js






const DIGIT_FIRST_SERIES = ['ラグジュTV']; // 拼接最后文件名

async function final_final(avObj) {
  // 深拷贝
  let av = JSON.parse(JSON.stringify(avObj));
  let finalName;
  console.log('传入的 AV 对象', av);

  if (av.code) {
    // ---------- 日本作品，有番号 ----------
    // ----- 处理演员名 -----
    av = refineActress(av); // ----- 处理标题 -----

    av = refineTitle(av); // ----- 处理系列名 -----

    if (av && av.seriesName) {
      console.log('***** 系列作品 *****');
      av.seriesName = av.seriesName.trim(); // 是否包含编号标识

      let numType1 = checkIndicator(av.workName); // 是否包含纯数字

      let numType2 = checkDigit(av.workName, av.seriesName);

      if (numType1 || !numType1 && numType2) {
        // 包含编号标识 / 不包含编号标识但包含纯数字：
        // 系列名（日期）编号部分（番号）演员名
        let digitFirstSeries = DIGIT_FIRST_SERIES.find(x => av.seriesName === x);
        console.log('是否属于编号在前日期在后的特殊系列', digitFirstSeries);

        if (digitFirstSeries) {
          finalName = `${av.seriesName} ${numType1 ?? numType2}（${datify(av.date)}）${av.actress}（${av.code}）${av.actressRealName ?? ''}`;
        } else {
          finalName = `${av.seriesName}（${datify(av.date)}）${numType1 ?? numType2}（${av.code}）${av.actress}`;
        }

        console.log('有编号的作品剩余部分', finalName);
      } else {
        // 不含编号
        // 系列名（日期）演员名（番号）
        finalName = `${av.seriesName}（${datify(av.date)}）${av.actress}（${av.code}）`;
      } // /* 不含编号：检测作品名前缀（空格之前的内容）和系列名的关系 */
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
      console.log('***** 单体作品 *****'); //（日期）演员（番号）作品名

      finalName = `（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName}`;
      console.log('单体作品', finalName);
    }

    finalName = `【${av.makerName}】${finalName}${av.duration ? av.resolution ? ` [${av.duration}; ${av.resolution}]` : ` [${av.duration}]` : ''}.jpg`;
  } else {
    // ---------- 欧美作品，无番号 ----------
    // 替换半角冒号
    av.workName = av.workName.replace(': ', '-');
    let newActress = [];

    for (let a of av.actress) {
      await newActress.push(a.toLowerCase().replace(/\b(\w)|\s(\w)/g, s => s.toUpperCase()));
    }

    console.log('修改后的演员列表', newActress);
    finalName = `【${av.makerName}】${av.seriesName || ''}（${datify(av.date)}）${newActress.join(', ')} - ${av.workName}${av.duration ? `[${av.duration}; ${av.resolution.join(', ')}]` : ''}.jpg`;
  }

  console.log('最后拼接的文件名', finalName);
  return finalName;
}
;// CONCATENATED MODULE: ./src/makers/ca_group.js

async function CA(url) {
  console.log('传入 URL', url); // 定义页面元素

  let makerName,
      workName,
      seriesName,
      date,
      actress = [],
      code,
      imgUrl; // 仅在作品页生效

  if (url.includes('detail')) {
    // 厂商名
    switch (document.domain) {
      case 'attackers.net':
        makerName = 'Attackers';
        break;

      case 'ideapocket.com':
        makerName = 'Idea Pocket';
        break;

      case 'madonna-av.com':
        makerName = 'Madonna';
        break;

      case 'moodyz.com':
        makerName = 'MOODYZ';
        break;

      case 'premium-beauty.com':
        makerName = 'Premium';
        break;

      case 's1s1s1.com':
        makerName = 'S1';
        break;

      case 'honnaka.jp':
        makerName = '本中';
        break;

      case 'mvg.jp':
        makerName = 'MVG';
        break;
    }

    console.log('厂商名', makerName); // 作品名

    workName = document.querySelector('h2.p-workPage__title').innerText;
    console.log('作品名', workName); // 页面数据列表

    let keyList = document.querySelectorAll('.p-workPage__table .th');
    let valueList = document.querySelectorAll('.p-workPage__table .th + div');
    console.log('数据列表', keyList, valueList); // 系列名

    seriesName = valueList[2].innerText;
    console.log('系列名', seriesName); // 日期

    date = valueList[1].innerText;
    console.log('日期', date); // 演员列表

    let aList = valueList[0].querySelectorAll('.item');
    actress = [];
    aList.forEach(a => actress.push(a.innerText));
    console.log('演员列表', actress); // 番号

    let codePropIndex = Array.from(keyList).findIndex(key => key.innerText === '品番');
    console.log('番号索引', codePropIndex);
    let codePrefix = valueList[codePropIndex].querySelector('span').innerText;
    code = valueList[codePropIndex].querySelector('p').innerText.replace(codePrefix, '');
    code = codify(code);
    console.log('番号', code); // 封面地址

    imgUrl = document.querySelectorAll('.swiper-wrapper img')[1].dataset.src; // 跨域获取

    const res = await fetch(imgUrl);

    try {
      const blob = await res.blob();
      imgUrl = window.URL.createObjectURL(blob);
    } catch (e) {
      console.log('下载图片失败', e);
    }

    console.log('封面地址', imgUrl);
    let av = {
      makerName: makerName,
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      imgUrl: imgUrl
    };
    console.log(`${makerName} AV 对象`, av);
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
    } catch (e) {
      console.log('下载图片失败', e);
    } // 时长


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

    actress[0] = infoList[0].innerText;
    console.log('演员列表', actress); // 番号

    code = infoList[4].innerText.replace('TKT', '');
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
;// CONCATENATED MODULE: ./src/makers/tokyo-hot.js
// 厂商名转换列表
const seriesList = ['Wカン', '東熱激情 淫乱女教師中出授業 特集'];
async function TokyoHot(url) {
  // 定义页面元素
  let makerName,
      workName,
      seriesName,
      date,
      actress = [],
      code,
      imgUrl,
      duration; // 仅在作品页生效

  if (url.includes('https://my.tokyo-hot.com/product/')) {
    var _url$match, _url$match2, _sizeInfo$querySelect, _sizeInfo$querySelect2, _sizeInfo$querySelect3;

    // 作品信息列表
    let keyList = document.querySelectorAll('dl.info > dt');
    let infoList = document.querySelectorAll('dl.info > dd'); // keyList 是 NodeList，不是数组，先转换为数组，再取出其值

    keyList = Array.from(keyList);
    console.log('数据列表', infoList); // 作品名

    workName = document.querySelector('.contents > h2').innerText;
    console.log('作品名', workName); // 系列名

    for (let series of seriesList) {
      let reg = new RegExp(series, 'g');

      if (reg.test(workName)) {
        console.log('系列名', series);
        seriesName = series;
        break;
      }
    } // 日期


    let dateIndex = keyList.findIndex(key => key.innerText.includes('配信開始日'));
    date = infoList[dateIndex].innerText;
    console.log('日期索引', dateIndex, '日期', date); // 演员列表

    let aList = infoList[0].querySelectorAll('a');
    aList.forEach(a => actress.push(a.innerText.trim()));
    console.log('演员列表', aList, actress); // 番号

    let codeIndex = keyList.findIndex(key => key.innerText.includes('作品番号'));
    code = infoList[codeIndex].innerText;
    console.log('番号', codeIndex, code); // 封面地址

    let pdNum = ((_url$match = url.match(/n\d+/g)) === null || _url$match === void 0 ? void 0 : _url$match[0]) || ((_url$match2 = url.match(/\d+/g)) === null || _url$match2 === void 0 ? void 0 : _url$match2[0]);
    imgUrl = `https://my.cdn.tokyo-hot.com/media/${pdNum}/jacket/${code}.jpg`;
    console.log('封面原始地址', imgUrl);
    const res = await fetch(imgUrl);

    try {
      const blob = await res.blob();
      imgUrl = window.URL.createObjectURL(blob);
    } catch (e) {} // 时长


    let durIndex = keyList.findIndex(key => key.innerText.includes('収録時間'));
    duration = infoList[durIndex].innerText.replaceAll(':', '.');
    console.log('时长', durIndex, duration); // 清晰度和大小

    let sizeInfo = document.querySelectorAll('.download')[1].querySelector('.dbox');
    let format = (_sizeInfo$querySelect = sizeInfo.querySelector('h4').innerText.match(/MP4|WMV/g)) === null || _sizeInfo$querySelect === void 0 ? void 0 : _sizeInfo$querySelect[0];
    let size = (_sizeInfo$querySelect2 = sizeInfo.querySelector('h4').innerText.match(/\d+.\d+/g)) === null || _sizeInfo$querySelect2 === void 0 ? void 0 : _sizeInfo$querySelect2[0];
    let resolution = (_sizeInfo$querySelect3 = sizeInfo.querySelector('p').innerText.match(/x(\d+)/)) === null || _sizeInfo$querySelect3 === void 0 ? void 0 : _sizeInfo$querySelect3[1];
    console.log('大小', '格式', parseFloat(size).toFixed(1), format, resolution);
    resolution = `${parseFloat(size).toFixed(1)}GB-${format}-${resolution}p`;
    let av = {
      makerName: '東京熱',
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      imgUrl: imgUrl,
      duration: duration,
      resolution: resolution
    };
    console.log('TokyoHot AV 对象', av);
    return av;
  }
}
;// CONCATENATED MODULE: ./src/makers/brazzers.js
async function Brazzers(url) {
  // 定义页面元素
  let workName,
      seriesName,
      date,
      actress = [],
      code,
      imgUrl,
      duration,
      resolution;
  console.log('传入的链接', url, '页面状态', document.readyState); // setTimeout(async () => {
  // 仅在作品页生效

  if (url.includes('https://www.brazzers.com/video/')) {
    var _imgUrl$match;

    // 页面数据列表
    let info = document.querySelector('#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div'); // let keyList = document.querySelectorAll('dl.info > dt')
    // keyList 是 NodeList，不是数组，先转换为数组，再取出其值
    // keyList = Array.from(keyList)

    console.log('数据区域', info); // 作品名

    workName = info.querySelector('h2').innerText;
    console.log('作品名', workName); // 系列名
    // seriesName = 
    // console.log('系列名', seriesName)
    // 日期

    date = new Date(document.querySelector('h2').previousElementSibling.innerText).toLocaleDateString('zh-CN');
    console.log('日期', date); // 演员列表

    let aList = document.querySelectorAll('h2 + div > span');
    aList.forEach(a => actress.push(a.innerText.replace(', ', '')));
    console.log('演员列表', actress); // 番号
    // code = 
    // code = codify(code)

    console.log('番号', code); // 封面地址

    imgUrl = document.querySelector('video + div').style['background-image'];
    imgUrl = (_imgUrl$match = imgUrl.match(/"(\S+)"/)) === null || _imgUrl$match === void 0 ? void 0 : _imgUrl$match[1]; // 跨域获取

    const res = await fetch(imgUrl);

    try {
      const blob = await res.blob();
      imgUrl = window.URL.createObjectURL(blob);
    } catch (e) {
      console.log('下载图片失败', e);
    }

    console.log('封面地址', imgUrl); // 时长
    // duration = 

    console.log('时长', duration); // 清晰度和大小
    // resolution = 

    console.log('清晰度', resolution);
    console.log('大小', '格式');
    let av = {
      makerName: 'Brazzers',
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      imgUrl: imgUrl,
      duration: duration,
      resolution: resolution
    };
    console.log('传出 AV 对象', av);
    return av;
  } // }, 2000)

}
;// CONCATENATED MODULE: ./src/makers/caribbean.js
async function Caribbean(url) {
  // 定义页面元素
  let workName,
      seriesName,
      date,
      actress = [],
      code,
      imgUrl,
      duration,
      resolution; // 仅在作品页生效

  if (url.includes('https://www.caribbeancom.com/moviepages/')) {
    var _url$match;

    // 页面数据列表
    let infoList = document.querySelectorAll('.movie-info > ul > li'); // let keyList = document.querySelectorAll('dl.info > dt')
    // keyList 是 NodeList，不是数组，先转换为数组，再取出其值
    // keyList = Array.from(keyList)

    console.log('数据列表', infoList); // 作品名

    workName = document.querySelector('.heading > h1').innerText;
    console.log('作品名', workName); // 系列名

    seriesName = infoList[3].querySelector('span').innerText === 'シリーズ' ? infoList[3].querySelector('span:last-child').innerText : undefined;
    console.log('系列名', seriesName); // 日期

    date = infoList[1].querySelector('span:last-child').innerText;
    console.log('日期', date); // 演员列表

    let aList = infoList[0].querySelectorAll('a');
    aList.forEach(a => actress.push(a.innerText));
    console.log('演员列表', actress); // 番号

    code = (_url$match = url.match(/\d{6}-\d{3}/g)) === null || _url$match === void 0 ? void 0 : _url$match[0];
    console.log('番号', code); // 封面地址

    imgUrl = document.querySelector('.vjs-poster').style.backgroundImage;
    imgUrl = `https://www.caribbeancom.com${imgUrl.replace('url("', '').replace('")', '')}`; // 跨域获取
    // const res = await fetch(imgUrl)
    // try {
    //     const blob = await res.blob()
    //     imgUrl = window.URL.createObjectURL(blob)
    // } catch (e) {
    //     console.log('下载图片失败', e)
    // }

    console.log('封面地址', imgUrl); // 时长

    duration = infoList[2].querySelector('span:last-child').innerText;
    duration = duration.replace(/^00:/, '').replaceAll(':', '.');
    console.log('时长', duration); // 清晰度和大小
    // resolution = 

    console.log('清晰度', resolution);
    console.log('大小', '格式');
    let av = {
      makerName: '加勒比',
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      imgUrl: imgUrl,
      duration: duration,
      resolution: resolution
    };
    console.log('传出 AV 对象', av);
    return av;
  }
}
;// CONCATENATED MODULE: ./src/makers/sod.js
async function SOD(url) {
  console.log('作品页链接', url); // 定义页面元素

  let workName,
      seriesName,
      date,
      actress = [],
      code,
      imgUrl,
      duration,
      resolution; // 仅在作品页生效

  if (url.includes('https://ec.sod.co.jp/prime/videos/')) {
    // 作品名
    workName = document.querySelector('#videos_head > h1 + h1').innerText;
    console.log('作品名', workName); // 页面数据列表

    let infoList = document.querySelectorAll('#v_introduction tr > td:last-child'); // let keyList = document.querySelectorAll('dl.info > dt')
    // keyList 是 NodeList，不是数组，先转换为数组，再取出其值
    // keyList = Array.from(keyList)

    console.log('数据列表', infoList); // 系列名

    seriesName = infoList[2].innerText;
    console.log('系列名', seriesName); // 日期

    date = infoList[1].innerText.replaceAll(' ', '');
    console.log('日期', date); // 演员列表

    let aList = infoList[4].querySelectorAll('a');
    aList.forEach(a => actress.push(a.innerText));
    console.log('演员列表', actress); // 番号

    code = infoList[0].innerText;
    console.log('番号', code); // 封面地址

    imgUrl = document.querySelector('.videos_samimg > a').href.replace('http:', 'https:'); // 跨域获取

    const res = await fetch(imgUrl);

    try {
      const blob = await res.blob();
      imgUrl = window.URL.createObjectURL(blob);
    } catch (e) {
      console.log('下载图片失败', e);
    }

    console.log('封面地址', imgUrl); // 时长
    // duration = 

    console.log('时长', duration); // 清晰度和大小
    // resolution = 

    console.log('清晰度', resolution);
    console.log('大小', '格式');
    let av = {
      makerName: 'SODクリエイト',
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      code: code,
      imgUrl: imgUrl,
      duration: duration,
      resolution: resolution
    };
    console.log('传出 AV 对象', av);
    return av;
  }
}
;// CONCATENATED MODULE: ./src/makers/mgstage.js
// 厂商名转换列表
const MAKER_TRANS = {};
async function MGS(url) {
  // 定义页面元素
  let makerName,
      workName,
      seriesName,
      date,
      actress = [],
      code,
      imgUrl,
      duration; // 仅在作品页生效

  if (url.includes('https://www.mgstage.com/product/product_detail/')) {
    // 作品名
    workName = document.querySelector('.common_detail_cover h1').innerText;
    console.log('作品名', workName); // 作品信息列表

    let keyList = document.querySelectorAll('.detail_data > table:last-child th');
    let valueList = document.querySelectorAll('.detail_data > table:last-child td'); // keyList 是 NodeList，不是数组，先转换为数组，再取出其值

    keyList = [...keyList].map(key => {
      return key.innerText;
    });
    console.log('数据列表', keyList, valueList); // 厂商名

    makerName = MAKER_TRANS[valueList[1].innerText] ?? valueList[1].innerText;
    console.log('厂商名', makerName); // 系列名

    let seriesIndex = keyList.findIndex(key => key === 'シリーズ：');
    seriesName = valueList[seriesIndex].innerText; // 如果包含系列字段，说明有系列名称

    console.log('系列名', seriesIndex, seriesName); // 日期

    date = valueList[4].innerText;
    console.log('日期', date); // 演员列表
    // let aList = infoList[1].querySelectorAll('.spec-content > span')
    // aList.forEach(a => actress.push(a.innerText.trim()))

    actress[0] = valueList[0].innerText;
    console.log('演员列表', actress); // 番号

    code = valueList[3].innerText; // let codeCap = code.match(/[a-z,A-Z]+/)?.[0].toLowerCase()
    // let codeNum = code.match(/[0-9]+/)?.[0]

    console.log('番号', code); // 封面地址

    imgUrl = document.querySelector('.detail_photo h2 img').src.replace('pf_o1', 'pb_e');
    const res = await fetch(imgUrl);

    try {
      const blob = await res.blob();
      imgUrl = window.URL.createObjectURL(blob);
    } catch (e) {
      console.log('下载图片失败', e);
    }

    console.log('封面地址', imgUrl); // 时长

    duration = valueList[2].innerText;
    console.log('时长', duration);
    let av = {
      makerName: makerName,
      workName: workName,
      seriesName: seriesName,
      date: date,
      actress: actress,
      actressRealName: 'xxx',
      code: code,
      imgUrl: imgUrl,
      duration: duration
    };
    console.log('MGS AV 对象', av);
    return av;
  }
}
;// CONCATENATED MODULE: ./src/index.ts












async function main() {
  // 创建按钮
  let a = createBtn(); // 核心功能

  let domain = document.domain,
      url = document.URL,
      av = {};
  console.log('域名', domain, url);

  async function trySwitch() {
    switch (domain) {
      // ----- CA 集团厂商 -----
      case 'madonna-av.com':
      case 's1s1s1.com':
      case 'moodyz.com':
      case 'honnaka.jp':
      case 'ideapocket.com':
      case 'attackers.net':
      case 'premium-beauty.com':
      case 'mvg.jp':
        av = await CA(url);
        break;

      case 'www.naughtyamerica.com':
        try {
          av = await NA(url);
        } catch {}

        ;
        break;

      case 'www.1pondo.tv':
        try {
          av = await OnePondo(url);
        } catch {}

        ;
        break;

      case 'www.prestige-av.com':
        try {
          av = await Prestige(url);
        } catch {}

        ;
        break;

      case 'my.tokyo-hot.com':
        try {
          av = await TokyoHot(url);
        } catch {}

        ;
        break;

      case 'www.brazzers.com':
        try {
          setTimeout(async () => {
            av = await Brazzers(url);

            if (av) {
              console.log('AV对象', av);

              try {
                a.download = await final_final(av);
                a.href = av.imgUrl;
              } catch (e) {}
            }
          }, 2000);
        } catch (e) {}

        ;
        break;

      case 'www.caribbeancom.com':
        try {
          av = await Caribbean(url);
        } catch {}

        ;
        break;

      case 'ec.sod.co.jp':
        try {
          av = await SOD(url);
        } catch {}

        ;
        break;

      case 'www.mgstage.com':
        try {
          av = await MGS(url);
        } catch {}

        ;
        break;
    }
  }

  trySwitch().then(async () => {
    if (av) {
      console.log('AV对象', av);

      try {
        a.download = 'test';
        a.download = await final_final(av);
        a.href = av.imgUrl;
      } catch (e) {}
    }
  }); // if (autoSave === 'yes') {
  // 	a.click();
  // }
}

window.onload = async () => {
  try {
    await main();
  } catch (e) {
    console.log(e);
  }
};
/******/ })()
;