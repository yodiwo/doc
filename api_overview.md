---
layout: page
title: API Overview
permalink: /docs/api-overview
---

Our Cloud Services support a plethora of protocols to carry Plegma API messages, which aids communication between yodiwo-aware nodes and our servers.

The Plegma API is publicly accessible and freely available (formal reference found [here](https://yodiwo.github.io/plegma)). Example implementations of the API are [freely provided here](https://github.com/yodiwo/plegma) for popular languages such as C, C#, Java, Javascript and others.

Currently available industry-standard protocols:

* HTTP/REST
* MQTT
* Web Sockets

Plus:

* YPC (Yodiwo Protocol Channel), a custom, flexible, layered, protocol designed and implemented by Yodiwo that supports:
    * multiple payload serialization (currently MSGPACK or JSON)
    * multiple transports (currently pure TCP Sockets or AMQP/RabbitMQ)
    * asynchronous or synchronous (blocking RPC) message passing between nodes
    * automatic packing/unpacking both of pre-agreed message types and of unknown members (C# / Java only)
    * throttling, flow control
    * extensible via IEs

![ALT ](/assets/images/api_block_diagram.png)

In the future we plan to support more methods for developers to reach the Yodiwo Cloud, such as RabbitMQ (a powerful AMQP based protocol) and Google Cloud Messaging.

## Message Categories
- - -
The messages in Plegma roughly fall into the following categories (further analyzed in the following pages):

1. [Message & event passing](/docs/message-event-passing) which carry event triggers from points (Ports of Things in Nodes) to the Yodiwo servers and vice-versa, or between points themselves
1. [Things management & control](/docs/things-mgmt-ctrl) via which Nodes present and manage the Things they encapsulate
1. [Node info & discovery](/docs/node-info) where Nodes present themselves and their capabilites and learn about other Yodiwo-aware Nodes
1. Messages that relate to the automatic graph splitting and inter-node synchronization and discovery (currently out of scope for these pages)
1. Messages that aid the Application Agnostic Smart End Devices (currently out of scope for these pages)

All messages in the Plegma API inherit from the same [base class](/docs/base-api-message-class), offering uniformity and ease in message entry and parsing.
