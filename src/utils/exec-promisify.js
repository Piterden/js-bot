const kill = require('tree-kill')
const { exec } = require('child_process')


const { EXEC_TIMEOUT } = process.env

module.exports = {
  asyncExec: (command) => new Promise((resolve, reject) => {
    let timeoutId = null

    const child = exec(command, (stderr, stdout) => {
      if (stderr) {
        return reject(stderr)
      }

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      return resolve(stdout)
    })

    timeoutId = setTimeout(() => {
      kill(child.pid)
      reject(new Error('Execution timeout!!!'))
    }, EXEC_TIMEOUT)
  }),
}
