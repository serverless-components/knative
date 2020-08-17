![serverless framework knative component](https://s3.amazonaws.com/public.serverless.com/component_knative/readme-serverless-framework-knative.png)

Deploy and manage containerized applications on serverless Knative infrastructure easily, cheaply and scale massively.
This component supports two ways of building container images out of your source code:

* The _Kubernetes mode_ will use [Kaniko](https://github.com/GoogleContainerTools/kaniko) for building container image from your source code and user [Docker Hub](https://hub.docker.com) as a registry for handing over the container image to Knative. The credentials for a Docker Hub account need to be added to the configuration. This mode requires a Kubernetes cluster on which you are allowed to run Pods in **privileged** mode.

* The _OpenShift mode_ builds the container image with OpenShift's [S2I](https://docs.openshift.com/container-platform/4.4/openshift_images/create-images.html) mechanism and used the OpenShift internal registry for image hand-over, which does not require any extra security setup. This mode works only on OpenShift with _OpenShift Serverless_ installed for running Knative services. 

The mode is autodetected from the connected cluster.  _OpenShift mode_ is used by default when you have configured a connection URL to an OpenShift cluster; otherwise, _Kubernetes mode_ is used.

### [Join the Serverless Framework + Knative Working Group](https://www.serverless-knative.com)

Click the link above to collaborate on our Roadmap for the Serverless Framework's integration with Knative, Red Hat's OpenShift and more.

## Prerequisites

Depending on which mode you are using, there are different prerequisites beside the access to a given Kubernetes or OpenShift cluster.

### Kubernetes Mode

[Knative](https://knative.dev) should be installed on your Kubernetes cluster.

Furthermore, you need to create a `ServiceAccount` which is allowed to perform the following actions:

- Create / Remove `Namespaces`
- Create / Remove `ConfigMaps`
- Create / Remove `Pods`
- Create / Remove `PersistentVolumeClaims`
- Create / Remove Knative `Services`

The `ServiceAccount` token will be used to manage the deployments and removals of Knative Service and needs to be configured.

Also, you must be able to run Pods in _privileged mode_. The privileged mode is a requirement for Kaniko for being able to create Docker images.

#### Docker Hub account

For the Kubernetes mode, a Docker Hub account is required.
Currently, we're only supporting [Docker Hub](https://hub.docker.com) as a container registry for the Kubernetes mode, so you need a [docker.com](https://docker.com) account.
The credentials need to be added to the configuration.

Support for more container registries is on our Roadmap.

### OpenShift Mode

For the [OpenShift](https://www.openshift.com/) mode, you must have [OpenShift Serverless](https://www.openshift.com/learn/topics/serverless) installed on the cluster. 
OpenShift Serverless can be easily installed with the help of the Operator Catalog. 
Otherwise, there are no requirements except of course that you have access to the OpenShift cluster.
Authentication is done via a token that you can obtain with `oc whoami --service-token` while being connected to the cluster.  

## Configuration

The credentials needed for connection to the cluster and possibly to Docker Hub are stored in `.env` with the following keys and meaning for the various modes:

| Variable | Kubernetes Mode | OpenShift Mode |
| -------- | -------- | -------- |
| `KUBERNETES_ENDPOINT`   | The API Endpoint URL to the Kubernetes cluster, without port   | Same as for Kubernetes but for connecting to an OpenShift Cluster   |
| `KUBERNETES_PORT`   | Port of the API endpoint   | Port of the API endpoint   |
| `KUBERNETES_SERVICE_ACCOUNT_TOKEN`   | Token of the Service Account under which the deployment should be done   | The OpenShift access token which can be obtained with `oc whoami --service-token`   |
| `KUBERNETES_SKIP_TLS_VERIFY`   | Whether to skip TLS server certificate verification  | Whether to skip TLS server certificate verification  |
| `DOCKER_USERNAME`   | User name for connecting to Docker Hub   | Not used   |
| `DOCKER_PASSWORD`   | User password for connecting to Docker Hub  | Not used   |

## Quickstarts

Four examples can be used as quickstart or blueprint for your projects. 
All are simple REST application that returns a friendly "Hello World !" message.

* [hello-express](examples/express) is a simple Express application which returns "Hello Express !" when called
* [hello-go](examples/go) is an HTTP listener, written in Go, that returns "Hello Go !"
* [hello-quarkus](examples/quarkus) is an example of a [Quarkus](https://quarkus.io) Web app written in Java that returns "Hello Quarkus !"
* [hello-cgi](examples/cgi) demonstrates how a good old [CGI bin](https://en.wikipedia.org/wiki/Common_Gateway_Interface) can be deployed with the Serverless Framework for Knative. It will print "Hello CGI !" when accessed.

As seen in the examples, all you need is to provide a `Dockerfile` that will package your application into a container image. 
The application has to listen to port 8080 for now.

<a id="run"></a>To run any of the examples perform the following steps: 

1. Install the latest [Serverless Framework](https://github.com/serverless/serverless) via `npm install --global serverless`.
1. Copy the code of one of the [`example`](examples/express) directories, e.g. `cp -r example/quarkus /tmp/hello-quarkus`.
1. Change in this director (e.g. `cd /tmp/hello`).
1. Run `npm install` to install all the dependencies.
1. Update the `org` property in the `serverless.yml` file with the name of your serverless.com account.
1. Update the `.env` file with your Kubernetes or OpenShift credentials and, if needed, your Docker secrets. See above for the possible configuration values.
1. Run `serverless deploy`. If you want some output, use the options `--verbose --debug`.
1. Visit the service URL to see your application running on your Kubernetes cluster via Knative or OpenShift Serverless.
1. Optional: Download [kn](https://github.com/knative/client/releases) for inspecting the Knative services.
1. Make some changes to your sample application and run `serverless deploy` again.
1. Check with the URL that you change has been picked up.
1. Run `serverless remove` to remove everything from your cluster.
