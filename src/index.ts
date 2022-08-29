import { createBtn } from './create-btn'
import { final } from './utils/final'
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

async function main() {
	// 创建按钮
	let a = createBtn()

	// 核心功能
	let domain = document.domain, url = document.URL, av: any = {}
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
				av = await CA(url); break;
			case 'www.naughtyamerica.com': try { av = await NA(url) } catch { }; break;
			case 'www.1pondo.tv': try { av = await OnePondo(url) } catch { }; break;
			case 'www.prestige-av.com': try { av = await Prestige(url) } catch { }; break;
			case 'my.tokyo-hot.com': try { av = await TokyoHot(url) } catch { }; break;
			case 'www.brazzers.com': try {
				setTimeout(async () => {
					av = await Brazzers(url)
					if (av) {
						console.log('AV对象', av)
						try {
							a.download = await final(av)
							a.href = av.imgUrl
						} catch (e) {

						}
					}
				}, 2000)
			} catch (e) { }; break;
			case 'www.caribbeancom.com': try { av = await Caribbean(url) } catch { }; break;
			case 'ec.sod.co.jp': try { av = await SOD(url) } catch { }; break;
			case 'www.mgstage.com': try { av = await MGS(url) } catch { }; break;
			case 'www.mousouzoku-av.com': try { av = await Mousouzuku(url) } catch { }; break;
		}
	}

	trySwitch().then(
		async () => {
			if (av) {
				console.log('AV对象', av)
				try {
					a.download = await final(av)
					a.href = av.imgUrl
					
					console.log('自动保存开关', localStorage.getItem('autoSave'))
					if (localStorage.getItem('autoSave') === 'yes') {
						console.log('自动保存')
						a.click();
					}
				} catch (e) {

				}
			}
		}
	)

}

window.onload = async () => {
	try {
		await main()
	} catch (e) {
		console.log(e)
	}
}
