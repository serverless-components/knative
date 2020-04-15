const KubernetesPod = require('@serverless/kubernetes-pod')

async function execKubernetesPod(config) {
  const instance = new KubernetesPod()
  instance.credentials = this.credentials
  return instance.exec(config)
}

module.exports = execKubernetesPod
