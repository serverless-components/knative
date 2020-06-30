const openShiftRestClient = require('openshift-rest-client').OpenshiftClient
const openShiftAuth = require('./openShiftAuth')

async function removeOpenShiftProject(config) {
  const settings = {
    config: openShiftAuth(this.credentials)
  }
  const client = await openShiftRestClient(settings)
  const project = config.namespace
  if (typeof project == 'undefined') {
    console.log('No project to remove')
    return
  }
  try {
    await client.apis['project.openshift.io'].v1.projects(project).delete()
    console.log(`Project ${project} removed`)
    return
  } catch (error) {
    console.log(`Project ${project} could not be removed: ` + error)
  }
}

async function remove() {
  const config = {
    ...this.state
  }

  if (typeof config.namespace !== 'undefined') {
    console.log(`Removing OpenShift Project ${config.namespace}...`)
  }
  await removeOpenShiftProject.call(this, config)
  this.state = {}
  return {}
}

module.exports = remove
