// Ensure that an OpenShift project exists
const ensureOpenShiftProject = require('./ensureOpenShiftProject')
// Build container image with OpenShift's S2I
const openShiftBuild = require('./openShiftBuild')
// Deploy on knative service
const { deployKnativeService } = require('../knative')

// Deploy Knative service
async function deploy(config) {
  console.log(`Deploying Knative App on OpenShift Serverless ...`)

  // 1. Ensure K8S Namespace
  console.log(`Ensuring OpenShift Project ${config.namespace}`)
  await ensureOpenShiftProject.call(this, config)
  this.state = config

  // 2. Run S2I build config
  console.log('Run OpenShift S2I build')
  const srcDirPath = await this.unzip(config.src)
  const buildResult = await openShiftBuild.call(this, {
    ...config,
    projectLocation: srcDirPath
  })
  // Use digest to pin image
  const digest = buildResult.build.body.status.output.to.imageDigest
  const registry = 'image-registry.openshift-image-registry.svc:5000'
  const repository = config.namespace + '/' + config.name
  config.image = `${registry}/${repository}@${digest}`
  this.state = config

  // 3. Deploy Knative Serving service
  console.log(`Deploying Knative Service ${config.name}`)
  const knative = await deployKnativeService.call(this, {
    ...config,
    registryAddress: registry,
    repository: repository,
    digest: digest
  })
  config.serviceUrl = knative.serviceUrl
  this.state = config

  return this.state
}

module.exports = deploy
