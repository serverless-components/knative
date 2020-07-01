const openShiftRestClient = require('openshift-rest-client').OpenshiftClient
const openShiftAuth = require('./openShiftAuth')

async function isOpenShift() {
  const settings = {}

  settings.config = openShiftAuth(this.credentials)
  const client = await openShiftRestClient(settings)
  // List all builds which should be successful
  return client.apis['project.openshift.io'].v1.projects.get().then((resp) => {
    return resp.statusCode === 200
  })
}

module.exports = isOpenShift
