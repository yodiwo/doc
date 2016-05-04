---
layout: page
title: Message & event passing
permalink: /docs/message-event-passing
---

All event exchanges, i.e. asynchronous triggers, calls to action, state updates, etc, between Nodes and the Cloud exclusively happen through the PortEventMsg API message:

### PORTEVENTMSG

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
public class PortEventMsg : ApiMsg
{
    public PortEvent[] PortEvents;
  
    public PortEventMsg() : base() { }
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
package com.yodiwo.plegma;

public class PortEventMsg extends ApiMsg {

    public PortEvent[] PortEvents;

    public PortEventMsg() {
    }
}
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
typedef struct Yodiwo_Plegma_PortEventMsg
{
    int32_t SeqNo;

    Array_Yodiwo_Plegma_PortEvent_t PortEvents;
} Yodiwo_Plegma_PortEventMsg_t;

typedef struct Array_Yodiwo_Plegma_PortEvent
{
    int num;
    struct Yodiwo_Plegma_PortEvent* elems;
} Array_Yodiwo_Plegma_PortEvent_t;
} Yodiwo_Plegma_ThingsSet_t;
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
@interface PortEventMsg : APIMsg

@property (strong, nonatomic) NSMutableArray&lt;PortEvent&gt; *PortEvents;

@end
            </code>
        </pre>
    </div>
</div>

Each message contains an array of simple PortEvent entries:

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
public class PortEvent
{
    public string PortKey;
    public string State;
    public uint RevNum;
    public ulong Timestamp;
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
public class PortEvent
{
    public String PortKey;
    public String State;
    public int RevNum;
    public long Timestamp; 
}
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
typedef struct Yodiwo_Plegma_PortEvent
{
    char* PortKey;
    char* State;
    uint32_t RevNum;
    uint64_t Timestamp;
} Yodiwo_Plegma_PortEvent_t;
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
@interface PortEvent : JSONModel

@property (strong, nonatomic) NSString *PortKey;
@property (strong, nonatomic) NSString&lt;Optional^gt; *State;
@property (nonatomic) NSUInteger RevNum;
@property (nonatomic) NSUInteger Timestamp;

@end
            </code>
        </pre>
    </div>
</div>


* `PortKey`: the key to identify which Port (in which Thing of which Node) this event refers to
* `State`: the message of event, encoded as a string, as discussed here
* `RevNum`: revision number of this update. If non-zero duplicate rejection can be performed. For the cloud servers, if this is zero, all events are treated as valid
* `Timestamp`: event's timestamp in milliseconds since Unix epoch. For the cloud servers, if this is zero, the time at reception is stamped


<div ng-switch-when="callout">
    <div class="block-callout block-show-callout  type-info block-show-callout  type-warning" type="section.type" ng-model="section.data">
        <h3>
            <i class="fa fa-exclamation-circle on" title="Warning"></i>
            <span>Port Events for inactive ports</span>
        </h3>
        <div marked="data.body" class="ng-isolate-scope"><p>To aid power consumption on the Node side, and also save channel bandwidth, it is advised that Nodes do not send Port Event messages for Ports that are inactive.<br>See below at <code>ActivePortKeys</code> for what active/inactive means, and how to check</p>
        </div>
    </div>
</div>


## Synchronising states between Nodes and the Cloud
- - - -
In the case where states of Ports between the Cloud and Nodes get out-of-sync, some tools are offered to rectify this, in the form of Port State messages. These messages exchange similar information about states as Port Events but do not trigger any action on the receiver apart from an update of their internal house-keeping.

#### PORTSTATEREQ

This Request is sent from either the Node or the Cloud Server to ask for an update, according to the message's `Operation` field. The receiving end must respond with a `PortStateRsp` in an RPC-compliant way.

<div id="code3_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="csharp" class="tab on">
            <a href="javascript: showCode('code3_container', 'csharp');"><span>C#</span></a><span>.</span>
          </div>
          <div data-lang="java" class="tab off">
            <a href="javascript: showCode('code3_container', 'java');"><span>Java</span></a><span>.</span>
          </div>
          <div data-lang="c" class="tab off">
            <a href="javascript: showCode('code3_container', 'c');"><span>C</span></a><span class="">·</span>
          </div>
          <div data-lang="objc" class="tab off">
            <a href="javascript: showCode('code3_container', 'objc');"><span>Objective-C</span></a>
          </div>
        </div>
        <pre id="csharp">
            <code>
public class PortStateReq : ApiMsg
{
    public ePortStateOperation Operation;
    public string[] PortKeys;

    public PortStateRsp() : base()
    {
        this.Id = eApiType.PortStateReq;
    }
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
package com.yodiwo.plegma;

import java.util.ArrayList;

public class PortStateReq extends ApiMsg
{
    public ePortStateOperation Operation;
    public String[] PortKeys;

    public PortStateReq() {
        this.Id = eApiType.PortStateReq;
    }
}
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
typedef struct Yodiwo_Plegma_PortStateReq
{
    //[ApiMsg]
    Yodiwo_Plegma_eApiType Id;
    int32_t Version;
    int32_t SeqNo;
    int32_t ResponseToSeqNo;

    Yodiwo_Plegma_ePortStateOperation Operation;
    Array_char* PortKeys;
} Yodiwo_Plegma_PortStateReq_t;
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
@interface ThingsReq : APIMsg

@property (nonatomic) EnumThingsOperation Operation;
@property (strong, nonatomic) NSString&lt;Optional&gt; *ThingKey;
@property (strong, nonatomic) NSMutableArray&lt;Thing, Optional&gt; *Data; // of Thing

@end
            </code>
        </pre>
    </div>
</div>

* `Operation`: the Type of operation requested. Can be one of:
        enum ePortStateOperation
        {
          SpecificKeys = 1,     //get states for the PortKeys specified in this msg's Keys array
          ActivePortStates = 2, //get  current states only for currently deployed Ports
          AllPortStates = 3,    //get current states for all ports of this Node
        }
* `PortKeys`: Array of PortKeys that the server should send an update for (to be used in conjuction with `ePortStateOperation.SpecificKeys`. Must be set if `Operation` is set to `SpecificKeys`, shall be ignored otherwise.

#### PORTSTATERSP
This message is the response to the previous PortStateReq message. As always, the message's `ResponseToSeqNo` will be set to the original request's `SeqNo`

In detail the message is:


<div id="code4_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="csharp" class="tab on">
            <a href="javascript: showCode('code4_container', 'csharp');"><span>C#</span></a><span>.</span>
          </div>
          <div data-lang="java" class="tab off">
            <a href="javascript: showCode('code4_container', 'java');"><span>Java</span></a><span>.</span>
          </div>
          <div data-lang="c" class="tab off">
            <a href="javascript: showCode('code4_container', 'c');"><span>C</span></a><span class="">·</span>
          </div>
          <div data-lang="objc" class="tab off">
            <a href="javascript: showCode('code4_container', 'objc');"><span>Objective-C</span></a>
          </div>
        </div>
        <pre id="csharp">
            <code>
public class PortStateRsp : ApiMsg
{
    public ePortStateOperation Operation;
    public PortState[] PortStates;

    public PortStateRsp() : base()
    {
        this.Id = eApiType.PortStateRsp;
    }
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
package com.yodiwo.plegma;

import java.util.ArrayList;

public class PortStateRsp extends ApiMsg
{
    public ePortStateOperation Operation;
    public PortState[] PortStates;

    public PortStateRsp() {
        this.Id = eApiType.PortStateRsp;
    }
}
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
typedef struct Yodiwo_Plegma_PortStateRsp
{
    //[ApiMsg]
    Yodiwo_Plegma_eApiType Id;
    int32_t Version;
    int32_t SeqNo;
    int32_t ResponseToSeqNo;

    Yodiwo_Plegma_ePortStateOperation Operation;
    Array_Yodiwo_Plegma_PortState_t PortStates;
} Yodiwo_Plegma_PortStateRsp_t;

typedef struct Array_Yodiwo_Plegma_PortState
{
    int num;
    struct Yodiwo_Plegma_PortState* elems;
} Array_Yodiwo_Plegma_PortState_t;
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
@interface PortStateRsp : APIMsg

@property (nonatomic) EnumStateOperation Operation;
@property (strong, nonatomic) NSMutableArray&lt;PortState&gt; *PortStates;

@end
            </code>
        </pre>
    </div>
</div>

The message's fields are:

* `Operation`: Type of operation requested and this message is responding to. The type will affect which of the two other fields is populated with data

* `PortStates`: Array of requested Port states

<div ng-switch-when="callout">
    <div class="block-callout block-show-callout  type-info block-show-callout  type-info" type="section.type" ng-model="section.data">
        <h3>
            <i class="fa fa-info-circle on" title="Info"></i>
            <span>"active" Port</span>
        </h3>
        <div marked="data.body" class="ng-isolate-scope"><p>A port is considered <em>active</em> when:</p>
            <ul>
                <li>its parent Thing is placed in at least one Graph that is currently <strong>deployed</strong> (not just saved)</li>
                <li>the port itself is actually connected to another block's port</li>
            </ul>
        </div>
    </div>
</div>

As expected, the `PortState` class is very similar to the previously described PortEvent class, with a simple addition:

<div id="code5_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="csharp" class="tab on">
            <a href="javascript: showCode('code5_container', 'csharp');"><span>C#</span></a><span>.</span>
          </div>
          <div data-lang="java" class="tab off">
            <a href="javascript: showCode('code5_container', 'java');"><span>Java</span></a><span>.</span>
          </div>
          <div data-lang="c" class="tab off">
            <a href="javascript: showCode('code5_container', 'c');"><span>C</span></a><span class="">·</span>
          </div>
          <div data-lang="objc" class="tab off">
            <a href="javascript: showCode('code5_container', 'objc');"><span>Objective-C</span></a>
          </div>
        </div>
        <pre id="csharp">
            <code>
public class PortState
{
    public string PortKey;
    public string State;
    public int RevNum;
  
    public bool IsDeployed; //&lt;-- this one!
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
package com.yodiwo.plegma;

import java.util.ArrayList;

public class PortState 
{
    public String PortKey;
    public String State;
    public int RevNum;
  
    public Boolean IsDeployed; //this one
}
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
typedef struct Yodiwo_Plegma_PortState
{
    char* PortKey;
    char* State;
    int32_t RevNum;
  
    bool_t IsDeployed;  //this one
} Yodiwo_Plegma_PortState_t;
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
@interface PortState : JSONModel

@property (strong, nonatomic) NSString *PortKey;
@property (strong, nonatomic) NSString&lt;Optional&gt; *State;
@property (nonatomic) NSInteger RevNum;

@property (nonatomic) BOOL IsDeployed;  //this one

@end
            </code>
        </pre>
    </div>
</div>

The extra field `IsDeployed` specifies whether the referenced port is currently active and connected in deployed graphs.

The rest of the field convey the same information as in a Port Event, but without acting/triggering any actions on this data.

#### ACTIVEPORTKEYSMSG

This message is an asynchronous message from the Cloud to a Node to inform the latter of which Ports are currently active. This usually happens because the user deployed or undeployed a graph (hence adding/removing Things or changing Port connections) through the Cyan environment.

The contents of the message are extremely simple, as the Node is expected to simply discard its old set of active PortKey values and replace it with the one specified by this message:

<div id="code6_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="csharp" class="tab on">
            <a href="javascript: showCode('code6_container', 'csharp');"><span>C#</span></a><span>.</span>
          </div>
          <div data-lang="java" class="tab off">
            <a href="javascript: showCode('code6_container', 'java');"><span>Java</span></a><span>.</span>
          </div>
          <div data-lang="c" class="tab off">
            <a href="javascript: showCode('code6_container', 'c');"><span>C</span></a><span class="">·</span>
          </div>
          <div data-lang="objc" class="tab off">
            <a href="javascript: showCode('code6_container', 'objc');"><span>Objective-C</span></a>
          </div>
        </div>
        <pre id="csharp">
            <code>
public class ActivePortKeysMsg : ApiMsg
{
    public String[] ActivePortKeys;

    public ActivePortKeysMsg() : base()
    {
        this.Id = eApiType.ActivePortKeysMsg;
    }
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
package com.yodiwo.plegma;

import java.util.ArrayList;

public class ActivePortKeysMsg extends ApiMsg
{
    public String[] ActivePortKeys;

    public ActivePortKeysMsg()
    {
      this.Id = eApiType.ActivePortKeysMsg;
    }
}
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
typedef struct Yodiwo_Plegma_ActivePortKeysMsg
{
    Yodiwo_Plegma_eApiType Id;
    int32_t Version;
    int32_t SeqNo;
    int32_t ResponseToSeqNo;

    Array_char* ActivePortKeys;
} Yodiwo_Plegma_ActivePortKeysMsg_t;
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
@interface ActivePortKeysMsg : APIMsg

@property (strong, nonatomic) NSMutableArray&lt;Optional&gt; *ActivePortKeys;

@end
            </code>
        </pre>
    </div>
</div>

Nodes are expected to keep track of, and only send events for those Ports that are currently active, thus reducing power consumption on the node and traffic on the medium.