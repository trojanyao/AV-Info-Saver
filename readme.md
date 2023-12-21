<p align="center">
  <a href="https://github.com/trojanyao/AV-Info-Saver">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/trojanyao/AV-Info-Saver/blob/master/readme/assets/icon.png">
      <img src="https://github.com/trojanyao/AV-Info-Saver/blob/master/readme/assets/icon.png" height="128">
    </picture>
    <h1 align="center">AV 作品信息一键保存工具</h1>
  </a>
</p>

![hero](https://github.com/trojanyao/AV-Info-Saver/blob/master/readme/assets/hero.png)

<p align="center">
  <a href="https://www.buymeacoffee.com/trojanyao" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
</p>

## 背景

多年以来，自己保存 AV 作品时习惯将厂商、系列、发布日期、演员、番号这些信息直接作为文件名记录在作品封面图文件中，另外再将对应的种子、影片、字幕重命名为同名文件。这样一来，就形成了统一规范；通过按文件名排序，管理起来清晰、方便、一目了然。

![单品](https://github.com/trojanyao/AV-Info-Saver/blob/master/readme/assets/finder-single.png)

![系列作品](https://github.com/trojanyao/AV-Info-Saver/blob/master/readme/assets/finder-series.png)

之前，每次保存时都要手动将每条信息复制粘贴到文件名中——虽然 AV 作品可以带给人愉悦，但不应把生命浪费在这个机械化重复劳动的过程上。因此编写了这个油猴脚本，实现从 AV 厂商官网一键下载作品封面图，并将作品信息按固定格式保存在文件名中。

效率从原来手动保存的 20\~30s 压缩到了 1\~2s 。

https://github.com/trojanyao/AV-Info-Saver/assets/22811809/cf0b8908-6e07-41e3-9ed5-26bd874572ff

## 安装 & 使用

1. **安装油猴脚本浏览器插件**

   此处不赘述，前往官网自行研究安装：https://www.tampermonkey.net/ 。

2. **安装 AV Info Saver 脚本**

   - Greasy Fork【🥇推荐，可以获得更新提醒】

     [AV Info Saver - AV 作品信息一键保存工具](https://greasyfork.org/zh-CN/scripts/482729-av-info-saver-av-作品信息一键保存工具)

     > 由于我主动将该脚本标记为了成人相关，可能需要登录账号才可查看。

   - GitHub 原始脚本地址

     ```
     https://github.com/trojanyao/AV-Info-Saver/raw/master/dist/index.prod.user.js
     ```

3. **打开相应的 AV 厂商官网作品页，点击按钮，一键保存！**

   > 注意：为了不影响各官网原有功能，该脚本 **仅在作品详情页生效**。如果安装后在首页没看到下载面板，别着急，随便点进去一个作品页，适配了的话会出现在右上角。

</details>

适配厂商 & 后续更新

v1.0.0 适配了 12 个常见的主流厂商，包括无码、有码、欧美、素人。详见 [v1.0.0 更新说明](https://github.com/trojanyao/AV-Info-Saver/releases/tag/v1.0.0)，之后适配的也都会在对应的更新说明中列出。

由于 COVID-19 之后各厂商的作品质量出现断崖式下跌，小厂商更是存活艰难，有的甚至关站停更。我现在已经不怎么看新作品和小厂商的作品了，第一批适配的 12 个主流厂商基本能覆盖日常使用。因此短期内可能不会再适配新厂商；除非研究历史作品的过程中，出现某个使用特别频繁的厂商。

当然，如果你特别喜欢某个厂商，可以 fork 本项目自己适配，也欢迎提交 PR 。

## 开发 & 贡献
本项目基于 https://github.com/trim21/webpack-userscript-template 模板，以实现用 Webpack 模块化开发油猴脚本。相关知识请参考 [说明](https://github.com/trojanyao/AV-Info-Saver/tree/master/readme/readme.cn.md) 。

自行适配的请参考以下步骤：

1. 在 [`config/metadata.cjs`](https://github.com/trojanyao/AV-Info-Saver/tree/master/config/metadata.cjs) 中新增 URL 匹配规则，建议仅在作品详情页生效；

   > 注意：每次修改该文件都要 `npm run dev` 重新生成，安装。

2. 在 [`src/makers`](https://github.com/trojanyao/AV-Info-Saver/tree/master/src/makers) 中对应的子目录下新增对应厂商的脚本；

   > 具体业务逻辑可参考已适配的其他厂商。

3. 在 [`index.ts`](https://github.com/trojanyao/AV-Info-Saver/tree/master/src/index.ts) 中导入上一步创建的脚本，并在 `trySwitch()` 方法中根据域名匹配；

4. 测试打包。

   > 建议针对不同情况测试，已适配的厂商格式如下。
   >
   > - 单品
   >
   >   - 单人：`【厂商】（发布日期）演员（番号）作品名 [时长; 大小1-格式1-分辨率1, 大小2-格式2-分辨率2].jpg`
   >
   >   - 多人：`【厂商】（发布日期）演员1 演员2（番号）作品名 [时长; 大小1-格式1-分辨率1, 大小2-格式2-分辨率2].jpg`
   >
   > - 系列作品
   >
   >   - 无编号
   >
   >     - 单人：`【厂商】系列名（发布日期）演员（番号）[时长; 大小1-格式1-分辨率1, 大小2-格式2-分辨率2].jpg`
   >     - 多人：`【厂商】系列名（发布日期）演员1 演员2（番号）[时长; 大小1-格式1-分辨率1, 大小2-格式2-分辨率2].jpg`
   >
   >   - 有编号
   >
   >     - 日期优先
   >
   >       - 单人：`【厂商】系列名（发布日期）编号（番号）演员 [时长; 大小1-格式1-分辨率1, 大小2-格式2-分辨率2].jpg`
   >
   >       - 多人：`【厂商】系列名（发布日期）编号（番号）演员1 演员2 [时长; 大小1-格式1-分辨率1, 大小2-格式2-分辨率2].jpg`
   >
   >     - 编号优先
   >
   >       - 单人：`【厂商】系列名 编号（发布日期）演员（番号）[时长; 大小1-格式1-分辨率1, 大小2-格式2-分辨率2].jpg`
   >
   >       - 多人：`【厂商】系列名 编号（发布日期）演员1 演员2（番号）[时长; 大小1-格式1-分辨率1, 大小2-格式2-分辨率2].jpg`
   >
   > 说明：
   >
   > 1. 时长：因为在下载作品时有的不完整，记录时长信息是为了便于确认作品完整性。由于欧美和素人作品的封面图往往是一张单纯的截图，因此也保存下时长信息。
   > 2. 大小、格式、分辨率：有些厂商（如：東京熱）针对同一个作品会发行不同格式、不同清晰度的版本，记录下这些信息方便在下载时作参考，选择质量最高的版本。
   > 3. 编号优先：有些厂商或系列在发行时并非严格按照日期顺序编号，如果按日期排序就可能出现某个作品编号在其他作品之后，但实际发行日期靠前的情况，看起来有些混乱。因此编号优先让我们完全以编号排序为准，保证正确的顺序。

</details>
