const fs = require('fs')
const os = require('os')
const path = require('path')
const tar = require('tar')
const globby = require('globby')
const readKubernetesPod = require('./readKubernetesPod')

function generateId() {
  return Math.random()
    .toString(36)
    .substring(6)
}

async function sleep(wait) {
  return new Promise((resolve) => setTimeout(() => resolve(), wait))
}

async function targzip(srcPath, fileName) {
  const files = (await globby('**', { cwd: srcPath })).sort()
  const destPath = path.join(os.tmpdir(), generateId())
  fs.mkdirSync(destPath)

  const file = path.join(destPath, fileName)
  await tar.c(
    {
      gzip: true,
      cwd: srcPath,
      file
    },
    files
  )
  return { destPath, filePath: file }
}

// NOTE: You have to call this with a `bind` to `this`
// TODO: Remove dependency on binding to `this`
async function monitorPod(namespace, name, desiredPhase = 'Succeeded') {
  let isDone = false
  do {
    await sleep(5000)
    const info = await readKubernetesPod.call(this, {
      namespace,
      name
    })
    const { phase } = info.status
    if (phase === desiredPhase) {
      isDone = true
    } else if (phase === 'Failed') {
      throw new Error(`Deployment of Pod "${name}" failed...`)
    } else {
      console.log(`Monitoring "${name}" (currently in "${phase}" phase)...`)
    }
  } while (!isDone)
  return isDone
}

module.exports = { generateId, targzip, sleep, monitorPod }
