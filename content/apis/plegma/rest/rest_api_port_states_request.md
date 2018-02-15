---
title: Sync with server's Port States
slug : "rest-api-port-states-request"
weight: 50
---

#### Definition
https://api.yodiwo.com/api/1.0/NODEKEY/SECRETKEY/portstatereq

- - - -

#### Parameters

|                           Name | Type                                     |
| -----------------------------: | ---------------------------------------- |
|   **nodekey** <br/> *required* | **string** *n/a* <br/> NodeKey (received during Node pairing) |
| **secretkey** <br/> *required* | **string** *n/a* <br/> SecretKey (received during Node pairing) |

- - - -

#### Documentation
Sends a Port States request to the cloud server. Route parameters include the Node and Secret keys received during the Node's pairing. The body of the message is expected to be a JSON-serialized message of the PortStateReq class.

The server will reply with a Port States Response.

For more information check out [State synchronization]({{% baseurl %}}apis/plegma/messages/message-event-passing/)
