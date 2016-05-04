---
layout: page
title: MQTT support
permalink: /docs/mqtt-overview
---

## overview
----

MQTT doesn't really need an introduction, as it's a well-known, low-latency, simple and lightweight publish-subscribe protocol with implementations for most platforms, including Android, iOS, Linux, minimal embedded systems

Yodiwo’s custom MQTT broker accepts connections from Nodes at api.yodiwo.com (port 8883 for SSL/TLS encrypted connections).

Nodes are expected to have completed [Pairing](/docs/pairing-overview) when attempting a connection to the Yodiwo MQTT broker since the assigned Node and Secret Keys will be used for the connection to the broker.

Specifically:

* the MQTT Client ID is mandated to be equal to the MQTT username
* the MQTT username must be set to the Node’s assigned NodeKey string
* the MQTT password must be set to the Node’s Secret key

## message types and subtopics 
- - - -
Payload of the published messages as well as of the messages received via subscriptions is exactly the same as previously described in REST.

However messages are encapsulated in a wrapper that aims to provide support for synchronous operations. For more information see the [next section](/message-format)

Message encoding is in JSON although binary encoding may be supported at a later time.

The supported subtopics are:

1. `nodeinforeq`
1. `nodeinforsp`
1. `thingsreq`
1. `thingsrsp`
1. `porteventmsg`
1. `portstatereq`
1. `portstatersp`

## subscribing to messages
- - - -
After a successful connection the Node need only subscribe to one topic family which encompasses Yodiwo’s API messages as previously outlined and presented in detail in the API reference.
The node must subscribe to topics of the following format:

`/api/out/{version}/{NodeKey}/#`

where:

* {version} is an integer signifying the API's targeted version number
* {NodeKey} is the string of the Node’s actual NodeKey
Any attempt to subscribe to a topic of a different format, or with an invalid NodeKey that does not match the connection’s Username and Client ID will be rejected.

A Node is allowed to individually subscribe to each message it is interested in, as long as it follows the topic’s prefix format.

## publishing messages
The node may publish data using the following topics:

`/api/in/{version}/{UserKey}/{NodeKey}/<apimsgname>`

where

* {version} is an integer signifying the API's targeted version number
* {UserKey} is the string of the owner of the Node’s UserKey
* {NodeKey} is the string of the Node’s actual NodeKey
* &lt;apimsgname&gt; refers to the same message names as previously [shown](/docs/mqtt-overview#message-types-and-subtopics)


## Outro

Summarizing for both publishing and subscribing directions:

![ALT](/assets/images/mqtt-pubsub.png)