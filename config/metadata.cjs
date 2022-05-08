const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
  name: 'AV-Info-Quick-Saver',
  namespace: '',
  version: version,
  author: author,
  source: repository.url,
  // 'license': 'MIT',
  match: [
    'https://www.madonna-av.com/*',
    'https://www.naughtyamerica.com/*',
    'https://www.1pondo.tv/*',
    'https://www.prestige-av.com/*',
    'https://my.tokyo-hot.com/*',
    'https://www.brazzers.com/*',
    'https://www.caribbeancom.com/*',
    'https://ec.sod.co.jp/*',
    '',
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
