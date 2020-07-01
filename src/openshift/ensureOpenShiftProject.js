const openShiftRestClient = require('openshift-rest-client').OpenshiftClient
const openShiftAuth = require('./openShiftAuth')

async function ensureOpenShiftProject(inputs) {
  const settings = {}

  settings.config = openShiftAuth(this.credentials)

  const project = inputs.namespace
  const client = await openShiftRestClient(settings)
  try {
    await client.apis['project.openshift.io'].v1.projects(project).get()
    console.log(`Project ${project} already exists`)
    return
  } catch (error) {}

  // Create project
  await client.apis['project.openshift.io'].v1.projectrequests.post({
    body: { metadata: { name: project } }
  })
  console.log(`Project ${project} created`)
}

module.exports = ensureOpenShiftProject
