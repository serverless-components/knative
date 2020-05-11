const { exec } = require('child_process')

async function ensureOpenShiftBuild(config) {
  // Check for a build config of the given name by running oc
  // For now we just calling "new-build" but ignore any error
  await exec(
    `oc new-build --namespace "${config.namespace}" --binary=true --strategy docker --name "${config.name}"`
  )
}

module.exports = ensureOpenShiftBuild
