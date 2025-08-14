import { createBtn } from './create-btn'
import { sleep } from './utils'

/* ===== Makers ===== */
import CA from '@/makers/02-censored/ca-group'
import { NA } from '@/makers/03-western/naughty-america'
import { OnePondo } from '@/makers/01-uncensored/1pondo'
import Prestige from '@/makers/02-censored/prestige'
import TokyoHot from '@/makers/01-uncensored/tokyo-hot'
import Brazzers from '@/makers/03-western/brazzers'
import Caribbean from '@/makers/01-uncensored/caribbean'
import SOD from '@/makers/02-censored/sod'
import MGS from '@/makers/04-amateur/mgstage'
import Mousouzoku from '@/makers/02-censored/mousouzoku'

window.onload = async () => {
  await main()
}

async function main() {
  const a = createBtn() // 创建按钮

  const domain = window.location.host

  const av: any = await trySwitch(domain)

  if (av) {
    a.download = av.finalName
    a.href = av.imgUrl

    // eslint-disable-next-line
    console.log(a.download)

    // 自动保存开启
    if (localStorage.getItem('av-info-saver-auto-save') === 'yes') {
      a.click()
    }
  }
}

/**
 * 根据不同厂商，使用不同的处理脚本，设置不同的按钮内容
 * @param domain 网站域名
 */
async function trySwitch(domain: string) {
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
      av = await TokyoHot()
      break

    /* ========== 有码 ========== */
    // CA 集团
    case 'attackers.net':
    case 'honnaka.jp':
    case 'ideapocket.com':
    case 'madonna-av.com':
    case 'moodyz.com':
    case 'mvg.jp':
    case 'premium-beauty.com':
    case 's1s1s1.com':
      av = await CA()
      break
    case 'www.mousouzoku-av.com':
      av = await Mousouzoku()
      break

    // Prestige 集团
    case 'www.prestige-av.com':
      av = await Prestige()
      break

    // SOD 集团
    case 'ec.sod.co.jp':
      av = await SOD()
      break

    /* ========== 欧美 ========== */
    case 'www.brazzers.com':
      await sleep(5000)
      av = await Brazzers()
      break
    case 'www.naughtyamerica.com':
      av = await NA()
      break

    /* ========== 素人 ========== */
    case 'www.mgstage.com':
      av = await MGS()
      break

    default:
      break
  }

  return av
}
