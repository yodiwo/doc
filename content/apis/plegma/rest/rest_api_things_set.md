---
title: Set Things
slug : "rest-api-things-set"
weight: 30
---

#### Definition
https://api.yodiwo.com/api/1.0/NODEKEY/SECRETKEY/thingsset

- - - -

#### Parameters

|                           Name | Type                                     |
| -----------------------------: | ---------------------------------------- |
|   **nodekey** <br/> *required* | **string** *n/a* <br/> NodeKey (received during Node pairing) |
| **secretkey** <br/> *required* | **string** *n/a* <br/> SecretKey (received during Node pairing) |

- - - -

#### Documentation
Sends a Things Set request to the cloud server. Route parameters include the Node and Secret keys received during the Node's pairing. The body of the message is expected to be a JSON-serialized message of the ThingsSet class.

The server will reply with the body of a GenericRsp response.

For more information check out [Things management & control]({{% baseurl %}}apis/plegma/messages/things-mgmt-ctrl/)
