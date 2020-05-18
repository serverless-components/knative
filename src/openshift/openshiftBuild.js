const nodeshift = require('nodeshift')

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

  if (inputs.openShiftAuth) {
    options.configLocation = {
      clusters: [
        {
          name: 'cluster',
          skipTLSVerify: inputs.openShiftAuth.skipTLSVerify,
          server: inputs.openShiftAuth.url
        }
      ],
      users: [{ name: 'user', token: inputs.openShiftAuth.token }],
      contexts: [
        {
          name: 'context',
          user: 'user',
          cluster: 'cluster'
        }
      ],
      currentContext: 'context'
    }
  }

  // Do the actual build
  await nodeshift.build(options)
}
module.exports = openShiftBuild
