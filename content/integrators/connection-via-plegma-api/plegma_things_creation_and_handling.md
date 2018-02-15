---
title : Plegma Things Creation and Handling
slug : "plegma-things-creation-and-handling"
weight : 15
---

A node’s main purpose is to maintain and present a list of Things, each of which models and virtualizes a real digital function, either physical or logical.

Upon a successful connection the Node sends their list of Things (each with a globally unique **Thing Key**) to the cloud, while it can also retrieve the Cloud’s previously synced Thing lists along with their configurations. As a result of this process, Cyan’s Designer Toolbox automatically presents the Node in its green section, populated with
the latest version of the Node’s virtualized Things: 

![Alt Green Section]({{% baseurl %}}assets/images/NodeGreenSection.png)

Things consist of one or more *Ports*, each of which sends or receives the minimum amount of data that can be exchanged and perform an operation related to the Thing.

Zero-port Things are **allowed**. They are useful in that they offer configuration options. Changing their configuration from Cyan will **trigger** events on the Node they belong to. Configuration can be changed either from the Designer section (once dropped into the canvas) or from the Things Manager tables’ Action column

![]({{% baseurl %}}assets/images/ConfChange.png)

Multiple-port Things can trigger or be triggered on each Port individually or in multiples.

In the latter case Plegma and Alcyone guarantee concurrent handling of all triggered Ports, i.e. there is no timing, delays or races between handling of each Port, and the Nodes/Cloud will operate on the updated Thing as whole

Nodes can present their Things at connection time, or update, create or delete them at any later time. Plegma provides a mechanism to sync Thing revision numbers between the Cloud and Nodes, so that Things are not exchanged while both sides are in sync.

Sensor-type Things will appear as blocks that **provide** input **to** graphs. I.e. a device that virtualizes and presents beacon functionality will appear as: 

![Alt Sensor-type Block]({{% baseurl %}}assets/images/SensorBlock.png)

 When the Node sends an actual beacon to Alcyone, it will trigger its next connected block(s) as designed in graphs by the Developer of the IoT scenario.

The same Thing block may appear in many different graphs and be connected to many different devices. They all represent **the same Thing**. Alcyone will **trigger all blocks with the same event**. By definition and by design there are no race sand there is no timing between blocks.

One may need to synchronize handling between events that come from independent asynchronous sources. In this case a special sync block may be used:

![Alt Sync Barrier]({{% baseurl %}}assets/images/SyncBarrier.png)

Actuator-type Things will appear as blocks that **receive**
input **from** graphs. I.e. a device that virtualizes and presents a torch functionality (e.g. a smartphone’s LED) will appear as:

![Alt Torch]({{% baseurl %}}assets/images/Torch.png)

This block receives Boolean events (or any other type that can automatically be converted to Boolean). Upon reception of the event, all Node endpoints that are currently active and connected to Alcyone will receive the event and be expected to immediately act on it.

- If nodes are offline at that time, the value is cached and Plegma offers a mechanism (Port State Get/Set) for it to be synced upon connection.
- Multiple lost events overwrite their previous one
- If an actuator is placed on different graphs, driven by different asynchronous inputs, and multiple points write to it “at
  the same time”, then its actuations **do not have a guaranteed order**. They will all be served, in random order, resulting in toggles, overwrites or similar outcomes.

Things that simultaneously offer Sensor and Actuator Ports functionality will still be automatically represented as two unique blocks. Same goes for Things with a single Input-Output Port such as a light switch that can be driven but whose output can also be used as an input to the graph:![]({{% baseurl %}}assets/images/ThingswithSingle_In-Output.png)

This is intentional and by design. Even if a Thing X sensor value is directly triggered by a Thing X’s actuator (as in a polling fashion), it needs to be shown clearly that:

-         the target Node endpoint(s) shall be found, and if currently online…

-         the trigger / actuation event will leave the platform

-         traverse through the Plegma Link towards the Node

-         the node must act on it and generate an event(Port Event Msg) 

-         send it back to Alcyone for it to trigger the relevant graph(s) where this Thing’s Block representation is placed


  

  Code on the Node side controls all of these aspects of Things and much more:

  - Type of each Port’s messages (boolean, strings, decimals, integers, etc)

  -    Icon of Thing

  -    Description (per-Port and of Thing in general) that will appear when Cyan user hovers over the Thing

  -    Changeable configuration entries of Thing. 

       NOTE: changing configuration via the “Edit” field of the Thing dropped on canvas will update the Thing “everywhere”. In reality there is no “everywhere”, each Thing is unique and belongs to its node, all its Cyan representations (e.g. on different graphs) refer to the same single Thing.


  -         Read-only information of Thing 

