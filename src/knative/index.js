// `deploy`
const deployKubernetesConfigMap = require('./deployKubernetesConfigMap')
const deployKnativeServing = require('./deployKnativeServing')
const deployKubernetesNamespace = require('./deployKubernetesNamespace')
const deployKubernetesPod = require('./deployKubernetesPod')
const deployKubernetesPVC = require('./deployKubernetesPVC')
// `exec`
const execKubernetesPod = require('./execKubernetesPod')
// `read`
const readKubernetesPod = require('./readKubernetesPod')
// `remove`
const removeKubernetesNamespace = require('./removeKubernetesNamespace')
const removeKubernetesPod = require('./removeKubernetesPod')

module.exports = {
  deployKubernetesConfigMap,
  deployKnativeServing,
  deployKubernetesNamespace,
  deployKubernetesPod,
  deployKubernetesPVC,
  execKubernetesPod,
  readKubernetesPod,
  removeKubernetesNamespace,
  removeKubernetesPod
}
