---
layout: page
title: Base API message class
subtitle: [one class to rule them all]
permalink: /docs/base-api-message-class

---
## ApiMsg
- - -
Virtually all Plegma API messages inherit from this `ApiMsg` abstract class:

<div id="code1_container">
<div class="block-code block-show-code" type="section.type">
  <div class="code-tabs">
    <div data-lang="csharp" class="tab on">
      <a href="javascript: showCode('code1_container', 'csharp');">
        <span>
          C#
        </span>
      </a>
      <span>.</span>
    </div>
    <div data-lang="java" class="tab off">
      <a href="javascript: showCode('code1_container', 'java');">
        <span>
          Java
        </span>
      </a>
      <span>.</span>
    </div>
    <div data-lang="c" class="tab off">
      <a href="javascript: showCode('code1_container', 'c');">
        <span>
          C
        </span>
      </a><span class="">·</span>
    </div>
    <div data-lang="objc" class="tab off">
      <a href="javascript: showCode('code1_container', 'objc');">
        <span>
          Objective-C
        </span>
      </a>
    </div>
  </div>
  <pre id="csharp">
    <code>
namespace Yodiwo.API.Plegma
{
  public abstract class ApiMsg
  {
    public int SeqNo;
  }
}
    </code>
</pre>
<pre id="java" style="display:none;">
    <code>
package com.yodiwo.PlegmaApi;

public abstract class ApiMsg {
    public int SeqNo;
}
    </code>
</pre>
<pre id="c" style="display:none;">
    <code>
typedef struct Yodiwo_API_Plegma_ApiMsg
{
  int32_t SeqNo;
} Yodiwo_API_Plegma_ApiMsg_t;
    </code>
</pre>
<pre id="objc" style="display:none;">
    <code>
@interface APIMsg : JSONModel

@property (nonatomic) NSInteger SeqNo;

@end
    </code>
</pre>
</div>
</div>


This base class contains just the sequence number of the message:

* `SeqNo`: the unique Id of this particular message.
    * it is mandatory for the Cloud to set this to a unique, monotonically increasing number in every message towards Nodes, so that you can identify lost messages (after all, embedded Nodes are allowed to have their own sleep schedules)
    * While it is not mandatory for Nodes to set this field in the messages they send to the Cloud, it is advised, so that cloud code can perform rejection of duplicate messages.
However, even if you implement sequence numbering for messages, you can bypass it for individual messages by setting `SeqNo` to 0 for these messages. Those messages will always be handled by the cloud, without checking sequence numbers.

<i>Suffixes</i> in all Plegma API messages provide information about the kind of message. In message and with a singular exception, all messages are blocking ones and expect a response, even if the latter is a generic "ack"-type one.

* <b>Req</b> means that the sender (either the node or the cloud server) sends actionable data and expects an answer in the form of an Rsp message.
* <b>Rsp</b> means that the message is a response to a preceding message, either containing actual data or acting as an Acknowledge message.
* <b>Get</b> is a call to action. It contains no actionable information itself but contains a request for the receiver to send something back. The sender blocks until the reply is received.
* <b>Set</b> is either the reply to a previous Get-type message, or a new message that directly sends new information. The latter case still expects an ACK which is usually a `GenericRsp` message.
* <b>Msg</b> is an asynchronous message originating at any time from the Node or from the Cloud that does not expect an answer. There are precious few of those, currently limited to status-updated events

<div>
    <div class="block-callout block-show-callout  type-info block-show-callout  type-info" type="section.type">
        <h3>
            <i class="fa fa-info-circle on" title="Info"></i>
            <span>Node-to-Cloud RPC</span>
        </h3>
        <div marked="data.body" class="ng-isolate-scope">
            <p>You can also use RPC mechanisms towards our Cloud servers. Take a look at the reference RPC-over-MQTT example source code that you'll find in our [github page](https://github.com/yodiwo/plegma)</p>
        </div>
    </div>
</div>


<div>
    <div class="block-callout block-show-callout  type-info block-show-callout  type-warning" type="section.type">
        <h3>
            <i class="fa fa-exclamation-circle on" title="Warning"></i>
            <span>Synchronous requests</span>
        </h3>
        <div marked="data.body" class="ng-isolate-scope">
            <p>For protocols that do not inherently support synchronous, blocking calls (like <a href="/docs/mqtt-overview">MQTT</a>) or <a href="/docs/ws-overview">WebSockets</a>), implementation of a synchronous Req/Rsp mechanism is left to a protocol wrapper instead. For more information have a look at the respective protocol help sections</p>
        </div>
    </div>
</div>


## GenericRsp
- - - -

As mentioned, synchronous request-type messages require responses, and sometimes those are generic ACK-type response that offer little more than confirmation of whether a message was successfully parsed. For those there is the `GenericRsp` message:


<div id="code2_container">
<div class="block-code block-show-code" type="section.type">
  <div class="code-tabs">
    <div data-lang="csharp" class="tab on">
      <a href="javascript: showCode('code2_container', 'csharp');">
        <span>
          C#
        </span>
      </a>
      <span>.</span>
    </div>
    <div data-lang="java" class="tab off">
      <a href="javascript: showCode('code2_container', 'java');">
        <span>
          Java
        </span>
      </a>
    </div>
  </div>
  <pre id="csharp">
    <code>
package com.yodiwo.PlegmaApi;

public abstract class ApiMsg {
    public int SeqNo;
}
    </code>
</pre>
<pre id="java" style="display:none;">
    <code>
    public class GenericRsp extends ApiMsg {
    {
        public Boolean IsSuccess;
        public int StatusCode;
        public String Message;

        public GenericRsp() {
        }
    } 
   </code>
</pre>
</pre>
</div>
</div>

* `IsSuccess`: basic boolean (ok or not) feedbck on received message
* `StatusCode`: generic integer, the meaning of which, if any, depends on actual message exchange
* `Message`: human readable text containing status for received message