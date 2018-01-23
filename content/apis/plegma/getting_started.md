---
title: "Getting Started"
slug : "getting-started"
date: 2017-12-14T12:02:09+02:00
weight: 10
---

Welcome to the Yodiwo Platform! We are an IoT Platform-as-a-Service (PaaS) provider with a unique connectivity framework, based on the first IoT Editor that uses graphs to codelessly interconnect models of Devices and existing Apps with each other.

![Alt our Cyan environment](/assets/images/simplegraph-smaller.png)
<center><figcaption>our Cyan environment</figcaption></center>

#### Nodes and Things
- - -
The Yodiwo Cloud Platform interacts with Edge devices by sending messages to and receiving messages from them, via a multitude of supported protocols. These messages follow the Plegma framework and API which is described in these pages.

{{% fa-panel theme="info" header="API Reference"  icon="fa-info-circle" %}}The complete up-to-date API reference in doxygen format can be <a href="https://yodiwo.github.io/plegma/Plegma/Doxygen">found here</a>{{% /fa-panel %}}

The main entity in the Yodiwo Plegma framework is called a Node, which is the implementer of the Plegma API and connects directly to Yodiwo's Cloud. These entities are usually called "Edge Nodes" in IoT nomenclature, however a Yodiwo Node can also act as a Gateway to other, edgier, Nodes that may for various reasons not directly connect to Yodiwo' Cloud.
Among the reasons for an end device to require a gateway:

* Legacy or IP-incompatible connectivity protocol
* Inability to support cost of TCP/IP
* Inablity to support Plegma's security model

The purpose of this API guide is to help you make your node show up and present itself and its Things here:

![](/assets/images/stencil-node.png)

After that Users will be able to place said Things from this Node into their graphical stories and have the Yodiwo Cloud exchange messages between them

A Node is assigned to a known Yodiwo user and given a globally unique Node Key and a Secret Key via a process known as [Pairing](https://ndocs.yodiwo.com/apis/plegma/pairing-overview/). The Node and Secret keys are used to authenticate the Node to connection-based protocols and are included in all REST messages.

After pairing is successfully completed, the Node is free to start exchanging Plegma API messages with the Cloud. A Node may use the Plegma API to:

* present itself, its configuration and capabilities to the Yodiwo Cloud service
* encapsulate and present one or more Things to the Yodiwo Cloud, and allows the Cloud to access those Things
* send and receive events, from and toward its encapsulated Things. These events are fed into Logic Graphs created by the Cyan Story Creator and can generate new events, either towards the same or other Yodiwo Nodes, or towards 3rd party services
* start, control and stop video streams from any video-capable (and not Yodiwo-aware) devices
* perform Node Discovery, through which it can learn about other Nodes that belong to a user (provided that the user has allowed such access)

As mentioned Nodes present one or more Things to the Cloud Service. Things encapsulate and represent “bundles” of related functionality, e.g. a Thing may be a thermostat which has an output (its temperature reading) and one or more inputs (for controlling and configuring it).

A Thing may have any number of these inputs and outputs, which are called Ports. A Port holds and is used to exchange the minimum unit of information between a Node and the Cloud server:

* Things react to environment conditions generating events related to individual ports. The connection (transient as in REST or persistent) of their parent Node to the Yodiwo Cloud triggers the latter with those events
* The Yodiwo Cloud triggers events towards the Node, causing it to act on these events

In the following pages we'll present how to create Nodes, Things and Ports, that will then automatically show up in Users' Cyan environments to be used in countless stories.

{{% fa-panel theme="success" header="We come bearing gifts" icon="fa-check-square" %}}Look for our [Github page](https://github.com/yodiwo/plegma) to download fully functional code examples of Node implementations in various popular languages!{{% /fa-panel %}}

