const { exec } = require('child_process')

async function ensureOpenShiftBuild(config) {
  // Check for a build config of the given name by running oc
  // For now we just calling "new-build" but ignore any error
  await exec(
    `oc new-build --namespace "${config.namespace}" --binary=true --strategy docker --name "${config.name}"`,
    (err, stdout, stderr) => {
      if (err) {
        console.error('error: ' + err)
        console.error(stderr)
        return
      }
      console.log(stdout)
    }
  )
}

module.exports = ensureOpenShiftBuild
