---
layout: api_doc_post
title: Sync with server's Port States
permalink: /docs/port-states-request
---

## Definition
https://api.yodiwo.com/api/1.0/<nodekey>/<secretkey>/portstatereq

- - - -

## Parameters

| Name | Type |
| -----: | ----- |
| **nodekey** <br/> *required* | **string** *n/a* <br/> NodeKey (received during Node pairing) |
| **secretkey** <br/> *required* | **string** *n/a* <br/> SecretKey (received during Node pairing) |

- - - -

## Documentation
Sends a Port States request to the cloud server. Route parameters include the Node and Secret keys received during the Node's pairing. The body of the message is expected to be a JSON-serialized message of the PortStateReq class.

The server will reply with a Port States Response.

For more information check out [State synchronization](/doc/docs/message-event-passing)