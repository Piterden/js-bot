const kill = require('tree-kill')
const { exec } = require('child_process')


const { EXEC_TIMEOUT } = process.env

module.exports = {
  asyncExec(command) {
    let timeoutId = null

    return new Promise((resolve, reject) => {
      const child = exec(command, (stderr, stdout) => {
        if (stderr) {
          return reject(stderr)
        }
        clearTimeout(timeoutId)
        return resolve(stdout)
      })

      timeoutId = setTimeout(() => {
        kill(child.pid)
        reject(new Error('Execution timeout!!!'))
      }, EXEC_TIMEOUT)
    })
  },
}
