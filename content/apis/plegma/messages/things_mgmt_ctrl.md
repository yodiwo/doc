---
title: Things management & control
slug : "things-mgmt-ctrl"
subtitle: [how to present your things to our cloud]
weight: 40
---

The main way for Nodes and the Cloud to exchange information about Nodes' Things are the Things Get/Set messages

#### THINGS GET
A Things Get request can be used by either the Cloud or Nodes to request information from the receiver. Its contents are:

<div id="code1_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="csharp" class="tab on">
            <a href="javascript: showCode('code1_container', 'csharp');"><span>C#</span></a><span>.</span>
          </div>
          <div data-lang="java" class="tab off">
            <a href="javascript: showCode('code1_container', 'java');"><span>Java</span></a><span>.</span>
          </div>
          <div data-lang="c" class="tab off">
            <a href="javascript: showCode('code1_container', 'c');"><span>C</span></a><span class="">·</span>
          </div>
          <div data-lang="objc" class="tab off">
            <a href="javascript: showCode('code1_container', 'objc');"><span>Objective-C</span></a>
          </div>
        </div>
        <pre id="csharp">
            <code>
public class ThingsGet : ApiMsg
{
    public eThingsOperation Operation;
    public string ThingKey
    public int RevNum;
      
    public ThingsGet() : base() { }
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
package com.yodiwo.plegma;

import java.util.ArrayList;

public class ThingsGet extends ApiMsg
{
    public eThingsOperation Operation;
    public String ThingKey;
    public int RevNum;
      
    public ThingsSet() {
    }
}
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
typedef struct Yodiwo_Plegma_ThingsGet
{
    int32_t SeqNo;

    Yodiwo_Plegma_eThingsOperation Operation;
    char* ThingKey;
    int RevNum;
} Yodiwo_Plegma_ThingsGet_t;
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
@interface ThingsGet : APIMsg

@property (nonatomic) EnumThingsOperation operation;
@property (strong, nonatomic) NSString&lt;Optional&gt; *thingKey;
@property (strong, nonatomic) NSInteger revNum;

@end
            </code>
        </pre>
    </div>
</div>

Any endpoint can send this message at any time to request any Things-related update from the other end. The message contains:

* `Operation`: a field that specifies what this request is about)

* `ThingKey`: (optional) ThingKey of Thing that this Request refers to. If null, missing or empty, then the Request refers to all of the receiver's Things (obviously if the Cloud is the receiver, "all" refers to the Node only)

* `RevNum`: Sender's revision number of Things update/sync state. An integer number that represents each end's view of Things and gets incremented with every change. Nodes and Cloud can use this number to avoid constantly syncing Things with each other


#### THINGS SET
The `ThingsSet` message is either a response to a `ThingsGet` message, or a new message that must be handled by the receiver. In both case it must follow the previously mentioned conventions about blocking messages. If it initiates a new action, then it expects a `GenericRsp` message as a response. Otherwise it itself is a response to a previous `ThingsGet` message.

<div id="code2_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="csharp" class="tab on">
            <a href="javascript: showCode('code2_container', 'csharp');"><span>C#</span></a><span>.</span>
          </div>
          <div data-lang="java" class="tab off">
            <a href="javascript: showCode('code2_container', 'java');"><span>Java</span></a><span>.</span>
          </div>
          <div data-lang="c" class="tab off">
            <a href="javascript: showCode('code2_container', 'c');"><span>C</span></a><span class="">·</span>
          </div>
          <div data-lang="objc" class="tab off">
            <a href="javascript: showCode('code2_container', 'objc');"><span>Objective-C</span></a>
          </div>
        </div>
        <pre id="csharp">
            <code>
public class ThingsSet : ApiMsg
{
    public eThingsOperation Operation;
    public bool Status;
    public Thing[] Data;
    public int RevNum;
      
    public ThingsSet() : base() { }
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
package com.yodiwo.plegma;

import java.util.ArrayList;

public class ThingsSet extends ApiMsg
{
    public eThingsOperation Operation;
    public Boolean Status;
    public ArrayList Data;
    public int RevNum;
      
    public ThingsSet() {
    }
}
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
typedef struct Yodiwo_Plegma_ThingsSet
{
    int32_t SeqNo;

    Yodiwo_Plegma_eThingsOperation Operation;
    bool_t Status;
    Array_Yodiwo_Plegma_Thing_t Data;
    int RevNum;

} Yodiwo_Plegma_ThingsSet_t;
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
@interface ThingsSet : APIMsg

@property (nonatomic) EnumThingsOperation Operation;
@property (nonatomic) BOOL Status;
@property (strong, nonatomic) NSMutableArray&lt;Thing,Optional&gt; *Data; // of Thing
@property (strong, nonatomic) NSInteger revNum;

@end
            </code>
        </pre>
    </div>
</div>

The message's fields are:

* `Operation`: Operation that specifies how the array of Things that the message contains is to be interpreted; see [below]({{% baseurl %}}apis/plegma/messages/things-mgmt-ctrl/#things-operations) for more info

* `Status`: specifies whether the parsing of the request was successful and hence this message contains valid data

* `Data`: array of Things (and hence of their Ports as well) that that are relevant to the selected operation.

* `RevNum`: Sender's revision number of Things update/sync state. An integer number that represents each end's view of Things and gets incremented with every change. Nodes and Cloud can use this number to avoid constantly syncing Things with each other

#### THINGS OPERATIONS

Possible Things Operations are the following:

* `Update (1)`: (Things SET only) referenced Thing(s) in the Data array field are to be updated at the receiver. If they don't already exist, they should be created. Use the Update Operation id to add new Things or to update Configuration parameters of existing ones (see callout below)

* `Overwrite (2)`: (Things SET only) referenced Thing(s) are to be updated at endpoint if they exist, created if not. Previously existing things at endpoint that are not in this message are <b>deleted</b>. Basically a wholesale "here's the new state" message

* `Delete (3)`: (Things SET only) ask that the endpoint deletes referenced Thing(s)

* `Get (4)`: (Things GET only) the receiving endpoint must respond with its Thing(s) in the Data array of its response. This message can refer either to a single Thing (via the Request's ThingKey), or to all of the receiving endpoint's Things (empty ThingKey)

* `Scan (5)`: (Things GET only) ask that the receiver actively scans for new things and sends back results as its response

* `Sync (6)`: (Get and Set) sync Thing revision numbers between sender and receiver. Any data in the Things array will be ignored

For operations `Get` and `Scan`, the responding device is free to choose the proper Operation id for its response (`Update` to add a few new Things, or `Overwrite` to send a new full suite of Things)



{{% fa-panel theme="info" header="Updating Things' configuration parameters" icon="fa-info-circle" %}}<p><strong>The cloud side will also set new configuration values this way</strong>, i.e. it will send a <code>ThingsSet</code> message with updated contents of <code>Thing.Config[]</code> fields and the Node is expected to parse them and update its internal configuration accordingly, as well as reply with a GenericRsp</p><p>However if you're using the existing Yodiwo Agents (iOS, Java) or helper libraries (C#) you shouldn't  have to worry about this, as they handle such scenarios and call the callbacks that you provide</p>{{% /fa-panel %}}
