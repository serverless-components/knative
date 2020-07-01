const KubernetesPod = require('@serverless/kubernetes-pod')

async function removeKubernetesNamespace(config) {
  const instance = new KubernetesPod()
  instance.credentials = this.credentials
  return instance.remove(config)
}

async function remove() {
  const config = {
    ...this.state
  }

  console.log('Removing Kubernetes Namespace...')
  await removeKubernetesNamespace.call(this, { name: config.namespace })
  this.state = {}
  return {}
}
module.exports = remove
