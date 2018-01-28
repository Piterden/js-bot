const debug = require('debug')('js-bot:boilerplate-code')
const et = require('./escape-tilde')


module.exports = {
  boilerplateGenerated(code) {
    debug('Template formatting started')
    return `const vm = require('vm')
const sandbox = require('../src/utils/context')
vm.createContext(sandbox)
vm.runInContext(\`${et(code)}\`, sandbox)`
  },
}
