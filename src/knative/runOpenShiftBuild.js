const { exec } = require('child_process').exec
const { util } = require('util')

async function ensureOpenShiftBuild(config) {
  // Check for a build config of the given name by running oc
  // For now we just calling "new-build" but ignore any error
  await exec(
    util.format('oc start-build --namespace %s --from-dir=. %s', config.namespace, config.name)
  )
}

module.exports = ensureOpenShiftBuild
