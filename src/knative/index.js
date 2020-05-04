// `deploy`
const deployKnativeServing = require('./deployKnativeServing')
const deployKubernetesNamespace = require('./deployKubernetesNamespace')
const ensureOpenShiftBuild = require('./ensureOpenShiftBuild')
const runOpenShiftBuild = require('./runOpenShiftBuild')
// `read`
const readKubernetesPod = require('./readKubernetesPod')
// `remove`
const removeKubernetesNamespace = require('./removeKubernetesNamespace')

module.exports = {
  deployKnativeServing,
  deployKubernetesNamespace,
  readKubernetesPod,
  removeKubernetesNamespace,
  ensureOpenShiftBuild,
  runOpenShiftBuild
}
