const { resolve } = require('path')
const debug = require('debug')('js-bot:sandbox')
const { writeFile, unlink } = require('fs-extra')

const uid = require('./utils/uid')
const { asyncExec } = require('./utils/exec-promisify')
const { boilerplateGenerated } = require('./utils/boilerplate-code')


module.exports = {
  async createSandbox(codeMessage) {
    const filename = `${uid()}.js`
    const filepath = resolve(`tmp/${filename}`)
    const code = boilerplateGenerated(codeMessage)
    let result

    debug('path - ', filepath)

    await writeFile(filepath, code)

    try {
      result = await asyncExec(`node tmp/${filename}`)
    }
    catch (error) {
      await unlink(filepath)
      throw error
    }

    await unlink(filepath)
    return result
  },
}
