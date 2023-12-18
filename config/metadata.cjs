const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
  name: 'AV-Info-Quick-Saver',
  namespace: '',
  version: version,
  author: author,
  source: repository.url,
  // 'license': 'MIT',
  match: [
    /* ========== 无码 ========== */
    'https://*.1pondo.tv/movies/*',
    'https://*.caribbeancom.com/moviepages/*',

    /* ========== 有码 ========== */
    'https://*.attackers.net/works/detail/*',
    'https://*.ideapocket.com/works/detail/*',
    'https://*.madonna-av.com/works/detail/*',
    'https://*.mousouzoku-av.com/works/detail/*',
    'https://*.prestige-av.com/goods/*',

    /* ========== 欧美 ========== */
    'https://*.brazzers.com/video/*',
    'https://*.naughtyamerica.com/scene/*',

    /* ========== 素人 ========== */
    'https://*.mgstage.com/product/product_detail/*',

    // CA 集团厂商
    'https://s1s1s1.com/*',
    'https://moodyz.com/*',
    'https://honnaka.jp/*',
    'https://premium-beauty.com/*',
    'https://mvg.jp/*',
    // 欧美
    'https://*.tokyo-hot.com/*',
    'https://ec.sod.co.jp/*',
  ],
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
    `https://cdn.jsdelivr.net/npm/axios@${dependencies.axios}/dist/axios.min.js`,
    `https://cdn.jsdelivr.net/npm/axios-userscript-adapter@${dependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
  ],
  grant: ['GM.xmlHttpRequest', 'GM.download'],
  connect: ['httpbin.org'],
  'run-at': 'document-end',
}
