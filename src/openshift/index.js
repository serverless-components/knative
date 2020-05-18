// `deploy`
const deployKnativeServing = require('./deployKnativeServing')
const deployKubernetesNamespace = require('./deployKubernetesNamespace')
const openShiftBuild = require('./openShiftBuild')
// `read`
const readKubernetesPod = require('./readKubernetesPod')
// `remove`
const removeKubernetesNamespace = require('./removeKubernetesNamespace')

module.exports = {
  deployKnativeServing,
  deployKubernetesNamespace,
  readKubernetesPod,
  removeKubernetesNamespace,
  openShiftBuild
}
