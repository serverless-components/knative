const KubernetesPVC = require('@serverless/kubernetes-pvc')

async function deployKubernetesPVC(config) {
  const instance = new KubernetesPVC()
  instance.credentials = this.credentials
  return instance.deploy(config)
}

module.exports = deployKubernetesPVC
