const { Component } = require('@serverless/core')
const openshift = require('openshift')
const kubernetes = require('kubernetes')

class Knative extends Component {
  async deploy(inputs) {
    const config = this.getConfig(inputs)

    const isOpenShift = await openshift.isOpenShift.call(this)
    if (isOpenShift) {
      return openshift.deploy.call(this, config)
    }

    return kubernetes.deploy.call(this, config)
  }

  async remove() {
    if (await openshift.isOpenShift.call(this)) {
      return openshift.remove.call(this)
    }
    return kubernetes.remove.call(this)
  }

  getConfig(inputs) {
    const id = Math.random()
      .toString(36)
      .substring(6)

    const defaults = {
      name: this.name,
      namespace: `${this.name}-${id}`
    }

    const config = {
      ...defaults,
      ...this.state,
      ...inputs
    }
    return config
  }
}

module.exports = Knative
