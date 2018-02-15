---
title : Using 3rd party MQTT brokers
slug : "using-3rd-party-mqtt-brokers"
weight : 10

---

Yodiwo already provides its 1st party MQTT broker (at api.yodiwo.com:8883) for Plegma API connections, but any existing 3rd party broker can be used instead.

So to publish any message, the MQTT out block can be configured and used:

![Alt MQTT out block]({{% baseurl %}}assets/images/MsgPublish.png)

Conversely, to subscribe to topics, listen to messages and have them trigger graphs, insert and configure use the MQTT input block:



![Alt MQQT input block]({{% baseurl %}}assets/images/MQTT_InputBlock.png)
