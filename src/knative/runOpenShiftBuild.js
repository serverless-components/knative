const { exec } = require('child_process')

async function ensureOpenShiftBuild(config) {
  // Check for a build config of the given name by running oc
  // For now we just calling "new-build" but ignore any error
  return exec(
    `oc start-build --namespace ${config.namespace} --from-dir=. ${config.name}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error('error: ' + err)
        console.error(stderr)
        return
      }
      console.log(stdout)
      return err
    }
  )
}

module.exports = ensureOpenShiftBuild
