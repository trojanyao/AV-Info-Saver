const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
	name: 'AV-Info-Quick-Saver',
	namespace: '',
	version: version,
	author: author,
	source: repository.url,
	// 'license': 'MIT',
	match: [
		// CA 集团厂商
		'https://madonna-av.com/*',
		'https://s1s1s1.com/*',
		'https://moodyz.com/*',
		'https://honnaka.jp/*',
		'https://ideapocket.com/*',
		'https://attackers.net/*',
		'https://premium-beauty.com/*',
		'https://mvg.jp/*',
		'https://www.mousouzoku-av.com/*',
		// 欧美
		'https://www.naughtyamerica.com/*',
		'https://www.1pondo.tv/*',
		'https://www.prestige-av.com/*',
		'https://*.tokyo-hot.com/*',
		'https://*.brazzers.com/video/*',
		'https://www.caribbeancom.com/*',
		'https://ec.sod.co.jp/*',
		'https://www.mgstage.com/*',
	],
	require: [
		`https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
		`https://cdn.jsdelivr.net/npm/axios@${dependencies.axios}/dist/axios.min.js`,
		`https://cdn.jsdelivr.net/npm/axios-userscript-adapter@${dependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
	],
	grant: [
		'GM.xmlHttpRequest',
		'GM.download'
	],
	connect: [
		'httpbin.org'
	],
	'run-at': 'document-end'
}
