---
layout: api_doc_post
title: Get Things
permalink: /docs/request-things-related-action
---

## Definition
https://api.yodiwo.com/api/1.0/<nodekey>/<secretkey>/thingsget

- - - -

## Parameters

| Name | Type |
| -----: | ----- |
| **nodekey** <br/> *required* | **string** *n/a* <br/> NodeKey (received during Node pairing) |
| **secretkey** <br/> *required* | **string** *n/a* <br/> SecretKey (received during Node pairing) |

- - - -

## Documentation
Sends a Things Get request to the cloud server. Route parameters include the Node and Secret keys received during the Node's pairing. The body of the message is expected to be a JSON-serialized message of the ThingsGet class.

The server will reply with a Things Set response.

For more information check out [Things management & control](/doc/docs/things-mgmt-ctrl)