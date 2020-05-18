const { Component } = require('@serverless/core')
const {
  deployKnativeServing,
  deployKubernetesNamespace,
  readKubernetesPod,
  removeKubernetesNamespace,
  openShiftBuild
} = require('./openshift')

function generateId() {
  return Math.random()
    .toString(36)
    .substring(6)
}

class Express extends Component {
  async deploy(inputs) {
    console.log(`Deploying Express App...`)

    const appName = this.name

    const defaults = {
      prefix: `${appName}-${generateId()}`
    }

    const config = {
      ...defaults,
      ...inputs,
      ...this.state
    }

    // 0. Check is user has permissions to access the cluster
    // TODO: We might want to use another Component / Kubernetes API call to check the auth setup
    const K8S_ENDPOINT = this.credentials.kubernetes.endpoint
    const K8S_PORT = this.credentials.kubernetes.port
    console.log(`Authenticating with OpenShift cluster "${K8S_ENDPOINT}:${K8S_PORT}"...`)
    try {
      await readKubernetesPod.call(this, { namespace: 'default', name: '!nv4l1d-n4m3' })
    } catch (error) {
      if (!Object.keys(error).includes('response')) {
        const msg = [
          'It seems like your Kubernetes config is incorrect. ',
          ' Please check the documentation for more information.',
          '\n\n',
          error.message
        ].join('')
        throw new Error(msg)
      }
    }
    console.log(
      `Successfully authenticated with OpenShift cluster "${K8S_ENDPOINT}:${K8S_PORT}"...`
    )

    // 1. Ensure K8S Namespace
    if (!config.namespace) {
      console.log('Deploying OpenShift Namespace...')
      const ns = await deployKubernetesNamespace.call(this, {
        name: config.prefix
      })
      config.namespace = ns.name
    }
    const { namespace } = config
    this.state = config // Saving state...

    // 2. Run S2I build config
    const srcDirPath = await this.unzip(inputs.src)
    console.log('Run OpenShift S2I build')
    await openShiftBuild.call(this, {
      name: appName,
      namespace: namespace,
      projectLocation: srcDirPath,
      openShiftAuth: {
        url: K8S_ENDPOINT + ':' + K8S_PORT,
        token: this.credentials.kubernetes.serviceAccountToken,
        skipTLSVerify: true
      }
    })
    this.state = config // Saving state...

    // 4. Deploy Knative Serving service
    console.log('Deploying Knative Serving...')
    const knativeServingName = `${config.prefix}-knative`
    const knative = await deployKnativeServing.call(this, {
      namespace,
      name: knativeServingName,
      registryAddress: 'image-registry.openshift-image-registry.svc:5000',
      repository: namespace + '/' + appName,
      tag: 'latest'
    })
    config.serviceUrl = knative.serviceUrl

    this.state = config // Saving state...
    return this.state
  }

  async remove() {
    const config = {
      ...this.state
    }

    // 1. Remove the K8S Namespace
    console.log('Removing K8S Namespace...')
    await removeKubernetesNamespace.call(this, { name: config.namespace })

    this.state = {}
    return {}
  }
}

module.exports = Express
