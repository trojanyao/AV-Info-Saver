const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
  name: 'AV-Info-Quick-Saver',
  namespace: '',
  version: version,
  author: author,
  source: repository.url,
  // 'license': 'MIT',
  match: [
    'http://www.example.com/*'
  ],
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
    `https://cdn.jsdelivr.net/npm/axios@${dependencies.axios}/dist/axios.min.js`,
    `https://cdn.jsdelivr.net/npm/axios-userscript-adapter@${dependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
  ],
  grant: [
    'GM.xmlHttpRequest'
  ],
  connect: [
    'httpbin.org'
  ],
  'run-at': 'document-end'
}
