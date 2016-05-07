---
layout: page
title: Web Sockets overview
permalink: /docs/ws-overview
---


You can also interface with our cloud servers via Web Sockets. All previous conventions about messaging with the Plegma API also stand here. The wrapper class that carries all Websocket messages is the following:

<div id="code1_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="any" class="tab on">
            <a href="javascript: showCode('code1_container', 'any');"><span>[any language]</span></a><span>.</span>
          </div>
        </div>
<pre id="any"><code>public class WebSocketMsg
    {
        public eWSAPIType Id;
        public string Subid;
        
        public eMsgFlags Flags;
        public int SyncId;
        public string Payload;
    }</code></pre>
    </div>
</div>

* `Id`: this field distinguishes between initial Pairing messages (which follow the logic described in [Pairing](https://yodiwo.readme.io/v1.0/docs/pairing-overview)) and API messages. This is needed since unlike the rest of the supported protocols where HTTPS is used for the pairing procedure, here it is also carried out over Websockets

        public enum eWSAPIType
        {
            Pairing = 1,
            Api = 2
        }

* `Subid`: a string that specifies the type of message being sent

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
    * for a request that expects a response, this must be set to a non-zero, monotonically increasing number
    * for a message that is a response to a previous request (Req or Get), this must be set to the original message's SyncId as previously described.
    * for an async message the field should be ignored
* `Payload`: json-serialized payload being sent (same as in [Mqtt msg format](https://yodiwo.readme.io/docs/message-format))