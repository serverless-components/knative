const { exec } = require('child_process').exec

async function ensureOpenShiftBuild(config) {
  // Check for a build config of the given name by running oc
  // For now we just calling "new-build" but ignore any error
  await exec(
    `oc start-build --namespace ${config.namespace} --from-dir=. ${config.name}`
  )
}

module.exports = ensureOpenShiftBuild
