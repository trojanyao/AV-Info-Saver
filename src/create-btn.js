export function createBtn() {
  // ----- 引用脚本 -----
  let iconify = document.createElement("script");
  iconify.type = "text/javascript";
  iconify.src = "https://code.iconify.design/1/1.0.4/iconify.min.js";
  document.querySelector("head").appendChild(iconify);

  // ----- 读取存储 -----
  var autoSave = localStorage.getItem("autoSave") ? localStorage.getItem("autoSave") : "no";

  // ----- 界面 -----
  let wrapper = document.createElement("div");
  let a = document.createElement("a");
  let menuDiv = document.createElement("div");
  let titleDiv = document.createElement("div");
  let toggleDiv = document.createElement("div");
  let toggleText = document.createElement("div");
  let toggleBtn = document.createElement("div");

  // ----- 样式 -----
  // --- 容器 ---
  wrapper.style.position = "fixed";
  wrapper.style.top = "10px";
  wrapper.style.right = "10px";
  wrapper.style.padding = "15px 20px";
  wrapper.style.boxSizing = "content-box";
  wrapper.style.background = "rgba(241, 241, 241, .92)";
  wrapper.style.borderRadius = "16px";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.zIndex = "99999";
  document.querySelector("body").appendChild(wrapper);
  // *** 下载按钮 ***
  a.target = "_blank";
  a.style.display = "flex";
  a.style.justifyContent = a.style.alignItems = "center";
  a.style.width = a.style.height = "48px";
  a.style.borderRadius = "50%";
  a.style.backgroundColor = "#1E93FF";
  a.style.background = "linear-gradient(135deg, #FFFFFF 0%, #E7E7E7 100%)";
  a.style.boxShadow =
    "5px 5px 13px rgba(207, 207, 207, 0.9), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px -5px 10px rgba(207, 207, 207, 0.2), -5px 5px 10px rgba(207, 207, 207, 0.2), inset -1px -1px 2px rgba(207, 207, 207, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.3)";
  wrapper.appendChild(a);
  // 按钮图标
  let icon = document.createElement("span");
  icon.style.display = "block";
  icon.classList.add("iconify");
  icon.dataset.inline = "false";
  icon.dataset.icon = "icomoon-free:download";
  icon.style.color = "#1E93FF";
  icon.style.fontSize = "24px";
  a.appendChild(icon);
  // *** 标题 & 菜单 ***
  wrapper.appendChild(menuDiv);
  menuDiv.style.marginLeft = "10px";
  menuDiv.style.display = "flex";
  menuDiv.style.flexDirection = "column";
  menuDiv.style.color = "#333333";
  menuDiv.style.fontFamily = '"PingFang SC", sans-serif';
  menuDiv.style.lineHeight = "1";
  // ** 标题 **
  titleDiv.id = "title";
  titleDiv.innerHTML = "AV 作品信息一键保存工具";
  titleDiv.style.fontSize = "18px";
  titleDiv.style.fontWeight = "600";
  menuDiv.appendChild(titleDiv);
  // ** 菜单 **
  toggleDiv.style.marginTop = "10px";
  toggleDiv.style.width = document.querySelector("#title").offsetWidth;
  toggleDiv.style.display = "flex";
  toggleDiv.style.flexDirection = "row";
  toggleDiv.style.justifyContent = "space-between";
  toggleDiv.style.alignItems = "center";
  menuDiv.appendChild(toggleDiv);
  // 菜单文本
  toggleText.innerHTML = "打开作品页后自动保存";
  toggleText.style.fontSize = "14px";
  toggleDiv.appendChild(toggleText);
  // 菜单按钮
  toggleBtn.style.width = "36px";
  toggleBtn.style.height = "20px";
  toggleBtn.style.borderRadius = "18px";
  toggleBtn.style.position = "relative";
  if (autoSave === "yes") {
    toggleBtn.style.background = "linear-gradient(90deg, #1E93FF 0%, #1C8CF2 100%)";
    toggleBtn.style.boxShadow =
      "inset -5px -5px 10px rgba(31, 154, 255, 0.9), inset 5px -5px 10px rgba(25, 126, 218, 0.2), inset -5px 5px 10px rgba(25, 126, 218, 0.2)";
  } else if (autoSave === "no") {
    toggleBtn.style.background = "linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)";
    toggleBtn.style.boxShadow =
      "-1px -1px 2px rgba(219, 219, 219, 0.5), 1px 1px 2px rgba(255, 255, 255, 0.3), inset 5px 5px 13px rgba(219, 219, 219, 0.9), inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px -5px 10px rgba(219, 219, 219, 0.2), inset -5px 5px 10px rgba(219, 219, 219, 0.2)";
  }
  toggleBtn.style.border = "1px solid #1E93FF";
  toggleBtn.style.position = "relative";
  toggleBtn.style.cursor = "pointer";
  toggleDiv.appendChild(toggleBtn);
  // 按钮
  let btn = document.createElement("div");
  btn.style.position = "absolute";
  btn.style.width = btn.style.height = "18px";
  btn.style.borderRadius = "50%";
  btn.style.background = "#F3F3F3";
  if (autoSave === "yes") {
    btn.style.right = "0";
    btn.style.boxShadow =
      "5px 5px 13px rgba(219, 219, 219, 0.9), 5px -5px 10px rgba(219, 219, 219, 0.2), -5px 5px 10px rgba(12, 72, 128, 0.2), inset -1px -1px 2px rgba(219, 219, 219, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.3)";
  } else if (!autoSave === "no") {
    btn.style.left = "0";
    btn.style.boxShadow =
      "5px 5px 13px rgba(219, 219, 219, 0.9), -5px -5px 10px rgba(255, 255, 255, 0.25), 5px -5px 10px rgba(219, 219, 219, 0.2), -5px 5px 10px rgba(219, 219, 219, 0.2), inset -1px -1px 2px rgba(219, 219, 219, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.3)";
  }
  btn.style.display = "flex";
  btn.style.justifyContent = "center";
  btn.style.alignItems = "center";
  btn.style.transition = "all 200ms ease-out";
  toggleBtn.appendChild(btn);
  let dot = document.createElement("div");
  dot.style.width = dot.style.height = "6px";
  dot.style.borderRadius = "50%";
  dot.style.background = "radial-gradient(50% 50% at 50% 50%, #1E93FF 45.31%, #1B84E6 100%)";
  btn.appendChild(dot);

  // Toggle
  toggleBtn.onclick = () => {
    if (!localStorage.getItem("autoSave") || localStorage.getItem("autoSave") === "no") {
      toggleBtn.style.background = "linear-gradient(90deg, #1E93FF 0%, #1C8CF2 100%)";
      toggleBtn.style.boxShadow =
        "inset -5px -5px 10px rgba(31, 154, 255, 0.9), inset 5px -5px 10px rgba(25, 126, 218, 0.2), inset -5px 5px 10px rgba(25, 126, 218, 0.2)";
      btn.style.left = "16px";
      btn.style.boxShadow =
        "5px 5px 13px rgba(219, 219, 219, 0.9), 5px -5px 10px rgba(219, 219, 219, 0.2), -5px 5px 10px rgba(12, 72, 128, 0.2), inset -1px -1px 2px rgba(219, 219, 219, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.3)";
      localStorage.setItem("autoSave", "yes");
      a.click();
    } else if (localStorage.getItem("autoSave") === "yes") {
      toggleBtn.style.background = "linear-gradient(135deg, #FFFFFF 0%, #E7E7E7 100%)";
      toggleBtn.style.boxShadow =
        "-1px -1px 2px rgba(219, 219, 219, 0.5), 1px 1px 2px rgba(255, 255, 255, 0.3), inset 5px 5px 13px rgba(219, 219, 219, 0.9), inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px -5px 10px rgba(219, 219, 219, 0.2), inset -5px 5px 10px rgba(219, 219, 219, 0.2)";
      btn.style.left = "0";
      btn.style.boxShadow =
        "5px 5px 13px rgba(219, 219, 219, 0.9), -5px -5px 10px rgba(255, 255, 255, 0.25), 5px -5px 10px rgba(219, 219, 219, 0.2), -5px 5px 10px rgba(219, 219, 219, 0.2), inset -1px -1px 2px rgba(219, 219, 219, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.3)";
      localStorage.setItem("autoSave", "no");
    }
  };

  // ----- 点击事件 -----
  // 点击按钮
  a.onmousedown = () => {
    a.style.background = "linear-gradient(135deg, #E7E7E7 0%, #FFFFFF 100%)";
  };
  a.onmouseup = () => {
    a.style.background = "linear-gradient(135deg, #FFFFFF 0%, #E7E7E7 100%)";
  };

  return a;
}
