[![Serverless Framework Express Knative](https://s3.amazonaws.com/assets.github.serverless/components/readme-serverless-framework-knative-express-2.png)](http://serverless.com)

Deploy and manage express.js applications on serverless Knative infrastructure easily, cheaply and scale massively.

### [Register here for a free demo](https://serverless-knative.com)

Click the link above to see the Serverless Framework's easy experience with Knative and Red Hat's OpenShift.

## Prerequisites

### Kubernetes

[Knative](https://knative.dev) should be installed on your Kubernetes cluster.

Furthermore you need to create a ServiceAccount with the following permissions:

- Create / Remove Namespaces
- Create / Remove ConfigMaps
- Create / Remove Pods
- Create / Remove PersistentVolumeClaims
- Create / Remove Knative Serving Services

The ServiceAccount token will be used to manage the deployments and removals of Knative Services.

### Docker Hub account

Currently we're only supporting [Docker Hub](https://hub.docker.com) as a container registry so you need a [docker.com](https://docker.com) account.

Support for more container registries is on our Roadmap.

## Quickstart

1. Install the latest [Serverless Framework](https://github.com/serverless/serverless) via `npm install --global serverless`
1. Copy the code in the [`example`](./example) directory
1. Run `npm install` to install all the dependencies
1. Update the `org`, `app`, and `name` properties in the `serverless.yml` file
1. Update the `.env` file with your Kubernetes and Docker secrets
1. Run `serverless deploy`
1. Visit the service URL to see your Express.js app running on your Kubernetes cluster via Knative
1. Make some changes to your Express.js app and run `serverless deploy` again
1. Run `serverless remove` to remove everything from your cluster
