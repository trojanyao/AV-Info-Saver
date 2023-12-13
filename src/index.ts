import { createBtn } from './create-btn'
import { sleep } from './utils'
import final from './utils/final'

/* ===== Makers ===== */
import CA from './makers/ca_group'
import { NA } from './makers/naughty-america'
import { OnePondo } from './makers/1pondo'
import Prestige from './makers/prestige'
import TokyoHot from './makers/tokyo-hot'
import Brazzers from './makers/brazzers'
import Caribbean from './makers/caribbean'
import SOD from './makers/sod'
import MGS from './makers/mgstage'
import Mousouzuku from './makers/mousouzoku'

window.onload = async () => {
  await main()
}

async function main() {
  const a = createBtn() // 创建按钮

  const domain = document.domain
  const url = document.URL

  const av: any = await trySwitch(domain, url)

  if (av) {
    a.download = av.finalName
    a.href = av.imgUrl

    // 自动保存开启
    if (localStorage.getItem('autoSave') === 'yes') {
      a.click()
    }
  }
}

/**
 * 根据不同厂商，使用不同的处理脚本，设置不同的按钮内容
 * @param domain 网站域名
 * @param url 作品页URL地址
 * @param av AV对象
 * @param a 生成的按钮
 */
async function trySwitch(domain: string, url: string) {
  let av: any = {}

  switch (domain) {
    /* ========== 无码 ========== */
    case 'www.1pondo.tv':
      av = await OnePondo()
      break
    case 'www.caribbeancom.com':
      av = await Caribbean()
      break
    case 'my.tokyo-hot.com':
      av = await TokyoHot(url)
      break

    /* ========== 有码 ========== */
    // CA 集团
    case 'madonna-av.com':
    case 's1s1s1.com':
    case 'moodyz.com':
    case 'honnaka.jp':
    case 'ideapocket.com':
    case 'attackers.net':
    case 'premium-beauty.com':
    case 'mvg.jp':
      av = await CA(url)
      break
    case 'www.mousouzoku-av.com':
      av = await Mousouzuku(url)
      break

    // SOD 集团
    case 'ec.sod.co.jp':
      av = await SOD(url)
      break

    // Prestige 集团
    case 'www.prestige-av.com':
      av = await Prestige(url)
      break

    /* ========== 欧美 ========== */
    case 'www.brazzers.com':
      await sleep(5000)
      av = await Brazzers()
      break
    case 'www.naughtyamerica.com':
      av = await NA(url)
      break

    /* ========== 素人 ========== */
    case 'www.mgstage.com':
      av = await MGS(url)
      break

    default:
      break
  }

  return av
}
