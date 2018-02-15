---
title : APIs
date : 2018-01-16
publishdate : 2018-01-16
lastmod : 2018-01-16
weight : 10
---

#### Plegma

The Plegma API, from the greek “πλέγμα” meaning grid, mesh or lattice, is the main inter connection API between Alcyone and Nodes of all types.

It provides the usual functions one would expect from such an API such as:

- bidirectional declaration and configuration of Things and Nodes
- bidirectional event passing and triggering

In addition, it includes extensions that allow:

- media(audio and video) streaming
- IoT processor virtualization (where device high-level drivers run on the cloud)
- automatic partitioning of Execution Rules between Cloud and Fog servers
- uploading of binary files 

A high level walkthrough of the API can be found at <https://www.yodiwo.com/developers>. The documentation itself is open-source and suggestions as well as improvements can be directed at github (<https://github.com/yodiwo/doc/>).

Automatically generated formal API reference is also provided at: 

- https://yodiwo.github.io/plegma/Plegma/Doxygen/index (Doxygen format)
- ~~<https://yodiwo.github.io/plegma/msdn/>~~ (MSDN format)

The API is of course transport and language agnostic and the following connection methods are currently supported for Plegma Nodes:

![Alt Plegma Diagram]({{% baseurl %}}assets/images/PlegmaNodesDiagram.png)

The block diagram of the API frontend stack is shown below:

![Alt API Diagram]({{% baseurl %}}assets/images/APIDiagram.png)

This is the message flow between Nodes and Alcyone, but it’s
not necessary to only carry Plegma messages. Other Yodiwo APIs may be
encapsulated within the Plegma link, and if the communicating Node is validated
to have the appropriate permissions, the messages will be demultiplexed and
sent to the proper handler.

#### Warlock

Apart from the Plegma API which allows communication for within-the-Node related tasks, the Warlock API is available to Yodiwo users and apps.

Warlock allows internal control of the User’s context and operations that transcend specific Nodes or Things. It can be used to inquire about relationships with other users, create and deploy new applications, share Things with other users, etc.

There is a permission system that specifies which aspects of the system each warlock client is allowed to control.

Nodes can use their Plegma connection to carry Warlock API traffic if they declare the “IsWarlock” capability and have been given the proper permissions.

#### Fog Apis

These APIs specify the communication:

- between user-level software and the Node SDK
- between Fog gateway plugins and the gateway core
- between Fog gateway plugins themselves and allows installed plugin discovery, message exchange, RPC and versioning

They are presented in more detail in the separate Fog SW section.

#### Platform Extensibility APIs

Under current development are new APIs that allow extensibility of the internal platform.

Alcyone already allows extensibility via the following methods

- External web services integration via REST
  - users can create API keys and can use them to create incoming web hooks towards the integrated YPC web server
  - from within a Cyan story they can trigger specific HTTP routes and receive responses that further influence story progression
  - with the use of a wizard they can specify full-fledged external REST APIs that will generate a new custom block that will include all possible (declared) routes and configurations
- Integration with generic external entities via MQTT (custom user-specified MQTT broker)
- Custom code blocks within Cyan

These APIs will formalize the modeling of internal “Logic” blocks and allow external stakeholders to create and upload their own into an app-store like frontend.

These blocks will be:

- private to the publisher
- shared within a publisher’s approved circle
- public and usable by anyone

Custom user blocks:

- may just be “macro-blocks”, i.e. blocks that include a number of basic blocks or other macro-blocks
- may provide interfaces to full-fledged external server hosted applications
- may specify code that is to be executed locally with Alcyone in the user’s context
