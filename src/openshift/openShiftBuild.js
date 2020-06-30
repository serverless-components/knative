const nodeshift = require('nodeshift')
const openShiftAuth = require('./openShiftAuth')
const fs = require('fs')

const defaults = {
  registryAddress: 'docker.io',
  namespace: {
    name: 'default'
  },
  build: {
    strategy: 'Docker'
  },
  outputImageStreamTag: 'latest'
}

async function openShiftBuild(inputs = {}) {
  const options = {
    ...defaults,
    ...inputs
  }

  // Namespace is provided flat, so transform it to the proper format
  if (inputs.namespace) {
    options.namespace = {
      name: inputs.namespace
    }
  }

  if (inputs.name) {
    options.outputImageStreamName = inputs.name
  }

  console.log('auth')
  // console.dir(this.credentials)
  options.configLocation = openShiftAuth(this.credentials)
  // console.log('Config: ' + fs.readFileSync(options.configLocation))
  // console.dir(options)
  // Do the actual build
  return await nodeshift.build(options)
}
module.exports = openShiftBuild
