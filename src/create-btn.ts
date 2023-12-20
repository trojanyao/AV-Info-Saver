export function createBtn() {
  /* ========== 界面 ========== */
  // === 容器 ===
  const wrapper = document.createElement('div')
  wrapper.style.background = 'rgba(255, 255, 255, 0.60)'
  wrapper.style.borderRadius = '16px'
  wrapper.style.border = '1px solid #F1F1F1'
  wrapper.style.padding = '16px'
  wrapper.style.backdropFilter = 'blur(18px)'
  wrapper.style.boxShadow = '0px 2px 24px 0px rgba(0, 0, 0, 0.03)'

  wrapper.style.position = 'fixed'
  wrapper.style.top = '120px'
  wrapper.style.right = '16px'

  wrapper.style.display = 'flex'
  wrapper.style.alignItems = 'center'
  wrapper.style.gap = '8px'
  wrapper.style.zIndex = '99999'

  document.querySelector('body').appendChild(wrapper)

  // === 下载按钮 ===
  const a = document.createElement('a')
  a.target = '_blank'

  a.style.width = a.style.height = '48px'
  a.style.background = 'linear-gradient(180deg, #F7F7F7 0%, #F0F0F0 100%)'
  a.style.borderRadius = '50%'
  a.style.boxShadow =
    '-1px -1px 2px 0px rgba(207, 207, 207, 0.25) inset, 1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset'

  a.style.display = 'flex'
  a.style.justifyContent = a.style.alignItems = 'center'

  // 按钮按下
  a.onmousedown = () => {
    a.style.background = 'linear-gradient(0, #F7F7F7 0%, #F0F0F0 100%)'
    a.style.boxShadow =
      '-1px -1px 2px 0px rgba(219, 219, 219, 0.50) inset, 1px 1px 2px 0px rgba(229, 229, 229, 0.30) inset'
  }
  // 按钮释放
  a.onmouseup = () => {
    a.style.background = 'linear-gradient(180deg, #F7F7F7 0%, #F0F0F0 100%)'
    a.style.boxShadow =
      '-1px -1px 2px 0px rgba(207, 207, 207, 0.25) inset, 1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset'
  }

  wrapper.appendChild(a)

  // 图标
  const SVG_NS = 'http://www.w3.org/2000/svg'
  const svgIcon = document.createElementNS(SVG_NS, 'svg')
  svgIcon.setAttribute('width', '24px')
  svgIcon.setAttribute('height', '24px')
  svgIcon.setAttribute('viewBox', '0 0 24 24')
  svgIcon.setAttribute('fill', 'none')

  const path = document.createElementNS(SVG_NS, 'path')
  path.setAttribute(
    'd',
    'M12 13.5L18 7.5H13.5V1.5H10.5V7.5H6L12 13.5ZM17.454 11.046L15.7725 12.7275L21.8685 15L12 18.6795L2.1315 15L8.2275 12.7275L6.546 11.046L0 13.5V19.5L12 24L24 19.5V13.5L17.454 11.046Z'
  )
  path.setAttribute('fill', '#58CB5C')
  svgIcon.appendChild(path)

  a.appendChild(svgIcon)

  // === 标题 & 菜单 ===
  const menuDiv = document.createElement('div')
  menuDiv.style.display = 'flex'
  menuDiv.style.flexDirection = 'column'
  menuDiv.style.gap = '8px'
  wrapper.appendChild(menuDiv)

  // 标题
  const titleDiv = document.createElement('div')
  titleDiv.innerText = 'AV 作品信息一键保存工具'
  titleDiv.style.color = '#282828'
  titleDiv.style.fontSize = '16px'
  titleDiv.style.fontFamily = '"PingFang SC", sans-serif'
  titleDiv.style.fontWeight = '600'
  titleDiv.style.lineHeight = '1'
  menuDiv.appendChild(titleDiv)

  // 菜单容器
  const toggleDiv = document.createElement('div')
  toggleDiv.style.display = 'flex'
  toggleDiv.style.justifyContent = 'space-between'
  toggleDiv.style.alignItems = 'center'
  menuDiv.appendChild(toggleDiv)

  // 文本
  const toggleText = document.createElement('div')
  toggleText.innerText = '打开作品页后自动保存'
  toggleText.style.color = '#515151'
  toggleText.style.fontSize = '14px'
  toggleText.style.fontFamily = '"PingFang SC", sans-serif'
  toggleText.style.fontWeight = '450'
  toggleText.style.lineHeight = '1'
  toggleDiv.appendChild(toggleText)

  // === 开关 ===
  const autoSave = localStorage.getItem('av-info-saver-auto-save') // 自动保存开关状态
  const toggleBtnBgNormal = 'linear-gradient(180deg, #FFF 0%, #F1F1F1 100%)' // 开关默认的背景
  const toggleBtnBgActived = 'linear-gradient(90deg, #4CAF50 0%, #2DE035 100%)' // 开关打开时的背景
  const toggleBtnShadowNormal =
    '5px 5px 13px 0px rgba(219, 219, 219, 0.60) inset, -5px -5px 10px 0px rgba(255, 255, 255, 0.90) inset, 5px -5px 10px 0px rgba(219, 219, 219, 0.20) inset, -5px 5px 10px 0px rgba(219, 219, 219, 0.20) inset' // 开关默认的内阴影
  const toggleBtnShadowActived =
    '-5px -5px 10px 0px rgba(33, 201, 39, 0.90) inset, 5px -5px 10px 0px rgba(88, 203, 92, 0.20) inset, -5px 5px 10px 0px rgba(88, 203, 92, 0.20) inset' // 开关打开时的内阴影

  const toggleBtn = document.createElement('div')
  toggleBtn.style.width = '32px'
  toggleBtn.style.height = '16px'
  toggleBtn.style.background = autoSave ? toggleBtnBgActived : toggleBtnBgNormal
  toggleBtn.style.borderRadius = '100px'
  toggleBtn.style.border = '1px solid #58CB5C'
  toggleBtn.style.boxSizing = 'border-box'
  toggleBtn.style.boxShadow = autoSave ? toggleBtnShadowActived : toggleBtnShadowNormal
  toggleBtn.style.position = 'relative'
  toggleBtn.style.transition = 'all 200ms ease-out'
  toggleBtn.style.cursor = 'pointer'
  toggleDiv.appendChild(toggleBtn)

  // 开关按钮
  const btn = document.createElement('div')
  const btnTransformDefault = 'translateX(0)' // 开关按钮默认偏移量
  const btnTransformActived = 'translateX(16px)' // 开关按钮打开时的偏移量
  btn.style.position = 'absolute'
  btn.style.width = btn.style.height = '14px'
  btn.style.background = '#FFF'
  btn.style.borderRadius = '50%'
  btn.style.boxShadow =
    '1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset, -1px -1px 2px 0px rgba(219, 219, 219, 0.50) inset'

  btn.style.display = 'flex'
  btn.style.justifyContent = btn.style.alignItems = 'center'

  btn.style.transform = autoSave ? btnTransformActived : btnTransformDefault
  btn.style.transition = 'all 200ms ease-out'
  toggleBtn.appendChild(btn)

  // 小圆点
  const dot = document.createElement('div')
  dot.style.width = dot.style.height = '4px'
  dot.style.background = 'radial-gradient(50% 50% at 50% 50%, #54CB59 45.31%, #20C927 100%)'
  dot.style.borderRadius = '50%'
  btn.appendChild(dot)

  // 开关切换
  toggleBtn.onclick = () => {
    const autoSave = localStorage.getItem('av-info-saver-auto-save')

    if (!autoSave) {
      // === 打开开关 ===
      toggleBtn.style.background = toggleBtnBgActived
      toggleBtn.style.boxShadow = toggleBtnShadowActived
      btn.style.transform = btnTransformActived

      localStorage.setItem('av-info-saver-auto-save', 'yes')
    } else {
      // === 关闭开关 ===
      toggleBtn.style.background = toggleBtnBgNormal
      toggleBtn.style.boxShadow = toggleBtnShadowNormal
      btn.style.transform = btnTransformDefault

      localStorage.removeItem('av-info-saver-auto-save')
    }
  }

  return a
}
