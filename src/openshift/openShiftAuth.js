const os = require('os')
const path = require('path')
const yaml = require('write-yaml')

function createOpenShiftAuthLocation(credentials) {
  const url = `${credentials.kubernetes.endpoint}:${credentials.kubernetes.port}`
  let skipTlsVerify = credentials.kubernetes.skipTLSVerify
  if (typeof skipTlsVerify === 'undefined') {
    skipTlsVerify = true
  }
  const token = credentials.kubernetes.serviceAccountToken
  // TODO: Enable this when the direct usage of the kubeconfig is fixed for openshift client
  if (false) {
    var kubeConfig = {
      clusters: [
        {
          name: 'cluster',
          skipTLSVerify: skipTlsVerify,
          server: url
        }
      ],
      users: [{ name: 'user', token: token }],
      contexts: [
        {
          name: 'context',
          user: 'user',
          cluster: 'cluster'
        }
      ],
      currentContext: 'context'
    }
    return kubeConfig
  }
  var kubeConfigFile = {
    apiVersion: 'v1',
    clusters: [
      {
        name: 'cluster',
        cluster: {
          server: url,
          'insecure-skip-tls-verify': skipTlsVerify
        }
      }
    ],
    users: [
      {
        name: 'user',
        user: {
          token: token
        }
      }
    ],
    contexts: [
      {
        name: 'context',
        context: {
          user: 'user',
          cluster: 'cluster'
        }
      }
    ],
    'current-context': 'context'
  }
  const tmpfile = path.join(os.tmpdir(), 'kubeconfig')
  yaml.sync(tmpfile, kubeConfigFile)
  return tmpfile
}

module.exports = createOpenShiftAuthLocation
