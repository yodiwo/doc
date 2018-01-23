---
title : Interconnection Concepts and Topology
slug : "interconnection-concepts-and-topology"
weight : 5
---

#### Introduction 

An abstract block diagram of the platform’s components and
logical interconnections is shown here:

![Alt Yodiwo Cloud Platform](/assets/images/Yodiwo_CloudPlatform2.1.png)

The following block diagram shows the various entities that make
up the Yodiwo ecosystem in more detail:

![Alt Yodiwo Ecosystem](/assets/images/Yodiwo_Ecosystem2.1.png)

It can be summarized as follows:

- YCP (**Alcyone**) which includes:
  - one or more backend workers
  - API frontends which Nodes connect to using avariety of industry standard protocols
  - the UI frontend
- Yodiwo Nodes, which communicate with Alcyone via the open Plegma API.
  Nodes are thoroughly analyzed in this document. In short they may be:
  - Fog Gateway Nodes (**Wisper)**
  - Single Nodes
  - Proxies to 3rd party ecosystems, bridging them to Alcyone
- UI Clients
  - currently, this is Cyan, and it uses a combination of REST, AJAX and Web Socket requests to talk to Yodiwo front end servers.
  - Frontend servers use an open API, “Warlock”, to talk to assigned Back end Workers. The same API can be be 3rd parties to bypass Cyan and implement a different UI client, not necessarily web-based, or even avoid a UI and configure / use the platform via code
  - this API can be encapsulated inside Plegma and available to paired Nodes with the proper permissions, for them to control User context through external apps
- Message brokers, such as MQTT and AMQP, that aid communication with external devices
- Connections with 3rd party web services, usually though REST APIs of those services
- Databases
  - Either internal to the Yodiwo ecosystem(MongoDB, MySQL, InfluxDB)
  - Or 3rd party ones that Users specify through Cyan and/or Warlock API
- Analytics, either 1st or 3rd party, connected either through message brokers, REST, etc.
- Federation proxies that connect Alcyone to 3rdparty ecosystems, like LoRa, SigFox, Skype, Facebook messenger, etc. This allows not just notification support, but also full control (sense and actuation) of other Things through their respective applications



#### Nodes

A **Yodiwo Node** is any IP-aware device or software entity that implements the Plegma API and can directly connect to Alcyone,regardless of protocol used

Nodes can simultaneously mix and match several features:

- may or may not present Things of their own
- can act as IoT Fog server (Wisper), able to under take the execution of IoT App functionality and offload the cloud servers whenever the Alcyone’s engine activates the auto split function. 
- can act as gateway for devices that do not directly use the Plegma API, such as:
  - non-IP aware devices (Bluetooth, serial, etc) 


- not capable of meeting Yodiwo’s security requirements
- devices that are as lightweight as possible (down to 4k of code) and that expect a gateway anyway (e.g. A2MCU nano agents)
- other Yodiwo Nodes that want to take advantage of the Fog server
- software proxies to Yodiwo-unaware devices, 3rdparty cloud platforms or services, etc
- home ecosystem proxies (OpenHAB, Apple Homekit, GoogleNest, Samsung SmartThings, etc)



***Pairing***

A Node must be assigned to a known Yodiwo user and given a globally unique Node Key and Secret Key via a process known as Pairing.

API messages may only be exchanged with paired Nodes.

After pairing the Yodiwo cloud service accepts, saves,maintains and presents (through Cyan) a list of *Things* from each Node. User state and context are retained across user sessions and can be used in Stories where they are interconnected with Services via Logic that the User defines and fine-tunes.

***Types of nodes***

A Yodiwo Node can be a monolithic entity created from scratch to provide specific features, or it can use a Plugin architecture to support live, on-the-fly, additions and removals of functionality bundles.

Yodiwo makes extensive use of the cross-platform .Net framework to provide SDKs for both of the above scenarios.

Yodiwo also provides many Node examples in various other languages and platforms:

- C for Linux and various embedded platforms (from NXP, Freescale, Atmel, Marvel, etc)
- Javascript with REST or WebSockets
- Java on Android
- Objective C and Swift on iOS

***Execution environment***

Nodes can run on:

- any hardware, however lightweight (e.g. CortexM0, ESP8266, Arduino, wearables, etc)
- any Operating System (iOS, Android, Android Wear, Windows families (Win32, Win10 IoT, Win10 Universal, Windows Phone), Linux, minimal RTOS, etc)

 Obviously not all of the features mentioned in the previous paragraphs are available on all HW/SW combinations.



#### Things

A **Yodiwo Thing** is a model of a *physical* device or *virtual* service that virtualizes specific functionality.

In practical terms, Yodiwo Things encapsulate and represent “bundles” of related functionality, e.g. a Thing may be a thermostat which has an output (its temperature readout) and one or more inputs (for controlling and configuring it).

In general any Thing:

- must belong to a Node
- can have persistent, user or code editable, configuration
- can present read-only information
- may contain zero or more Ports:
  - a Port holds the minimum amount of information that can be exchanged between Yodiwo and a device
  - can be Input / Output / or bidirectional
  - is the minimum individually addressable entity in Yodiwo topologies
    - can hold and exchange:
      - Basic types (integer, floating point, boolean values), or 
      - encapsulate more complex values (e.g. vectors, or complex classes via JSON encoding)





#### Other Entities

***Sub-nodes***

Sub-nodes are groups of Things that belong to a Node but are in separate subcategory of it

For example, they can be used:

- on nano agents which implement a minimal, easily portable API (called “Spike”) that provides non-IP communication with a Yodiwo Node
- to group Things inside a wearable that belong to a Node running on a Smartphone into a different category

***Endpoints***

Endpoints are identical but “physically” different Nodes. They share the same code, UUID and keys. 

Sensor-type events one of them sends are broadcast to all other Endpoints of the same Node. Actuation events are sent to all registered Endpoints.

#### Keys and Addressing

Every single entity in the Yodiwo topology (Nodes,Endpoints, sub-Nodes, Things, Ports, etc) is uniquely and individually addressable via the Plegma API.

There is clear and strictly defined hierarchy between them:

- a Port belongs to a Thing
- a Thing belongs to a sub-Node or directly to a Node
- sub-Nodes belong to Nodes
- a Node belongs to a User

Each of them has a unique Key that is derived from the previous one in its hierarchy, i.e. a Node Key is used to create a Thing Key and this in turn is used to create a Port Key.

Thus, receiving a message about a single Port (channel) indicates:

- the Thing it refers to
- the node (i.e. API connection) it should have come from
- the user it belongs to 

Any operation can be cross-checked and validated:

- does it come from the proper Node?
- does it try to access / alter resources that don’t belong to it?
- does it try to perform operations that it doesn’t have permissions to?

“Broadcast” keys are also supported:

- special Port Key indicates all ports of Thing it belongs to
- special Thing Key indicates all things of Node it belongs to




#### Thing Grouping & Thing Sharing

***Thing Grouping***

A Yodiwo Thing may have a ***Type*** and belong in one or more *Hierachies*. 

A Type:

- defines semantics, min, max values of each Port, etc
- can have one or more *models*, which specify sets of Port semantics, so that the same type(e.g. a Lamp) can have multiple variants
- naming follows reverse domain name notation

A multitude of basic types (button, location, NFC, BLE beacon, actuator, etc) are defined by Yodiwo. However, Types may also be defined by a 3rd party Node Publisher and provided to Yodiwo at Node connection (via the Plegma API).

Users may also assign one or more Tags to Things via Cyan or the Warlock API.

Things may be *grouped* per Type, Tag, Hierarchy or manually by the User, again either via Cyan or the Warlock client API.

Each Group has a unique Group Key according to the rules defined in the previous section. Groups appear as a single entity in Cyan and can be used in “Stories” to apply the same logic to a bundle of Things. 

Events from any Thing in a Sensor-type Group (Input to Cloud) will trigger all stories the Group has been used in, while still retaining the Thing Key of the triggering device or service. This Thing Key may then be used as the key to database accesses, etc.

An actuator-type group may also be placed into stories (Graphs) and the user may choose if the event should be propagated to all Things of the Group or a single one.

Groups may also be used to perform large scale device management. A user may mass-apply configurations or set the state for a specific Port in all Things of a Group.



***Thing Sharing***

Users may share any Thing they own to other Users.

Shared Things then appear on Cyan in a separate, per-sharer category, and can be used in Stories.

Sensor-type Events from Shared Things trigger:

- Stories of ‘owner’ users, and 
- of Users they have been shared to (sharees)

Actuator-type shared Things may be triggered by:

- events generated in Stories by ‘owners’, and
- in Stories created and operated by sharees

Sharing preferences may be defined by users via a UI client. Users (the “Sharees”) receiving the shared Things may have chosen to:

- automatically accept all such actions from anyone
- automatically accept only from known Users
- always be asked for confirmation, regardless of sender
- automatically deny every such request, regardless of sender 

Re-sharing a shared Thing is **never** allowed.
