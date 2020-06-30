const KubernetesNamespace = require('@serverless/kubernetes-namespace')

async function ensureKubernetesNamespace(config) {
  const instance = new KubernetesNamespace()
  instance.credentials = this.credentials
  return instance.deploy(config)
}

module.exports = ensureKubernetesNamespace
