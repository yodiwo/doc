---
title: Message format
slug : "message-format"
weight: 20
---

In order to support synchronous (blocking) messages with MQTT -which doesn't inherently provide this capability- there needs to be a way to match new messages (Responses) to previous ones (Requests). To that end a very simple message wrapper is introduced:

<div id="code1_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="any" class="tab on">
            <a href="javascript: showCode('code1_container', 'any');"><span>[any language]</span></a><span>.</span>
          </div>
        </div>
<pre id="any"><code>public class MqttMsg
    {
        public eMsgFlags Flags;
        public int SyncId;
        public string Payload;
    }</code></pre>
    </div>
</div>


* `Flags`: this field distinguishes between:
    * Request-type messages (Get or Req) that mandate a response (Rsp or Set)
    * Response-type messages to previous requests
    * simple asynchronous messages

    Specifically Flags is:

        public enum eMsgFlags
        {
            None = 0,      //async message
            Request = 1,   //message is request and expects response
            Response = 2   //message is response to previous request
        }

* `SyncId`:
  for a request that expects a response, this must be set to a non-zero, monotonically increasing number
  for a message that is a response to a previous request (Req or Get), this must be set to the original message's SyncId as previously described.
  for an async message the field should be ignored
* `Payload`: the JSON serialized Plegma API message that is being sent

For example, the following NodeInfoRsp message:

Text

    {
        "Name":"node",
        "Type":2,
        "Capabilities":0,
        "ThingTypes":null,
        "ThingsRevNum":4,
        "SupportedApiRev":1,
        "BlockLibraries":null
    }

that is a response to a `NodeInfoReq` message with `SyncId=34` should be sent as:

Text

    {
      "SyncId": 34,
      "Flags":2,
      "Payload": "{\"Name\":\"node\",\"Type\":2,\"Capabilities\":0,\"ThingTypes\":null,\"ThingsRevNum\":4,\"SupportedApiRev\":1,\"BlockLibraries\":null}"
    }
