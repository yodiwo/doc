---
title: "Yodiwo Wisper"
slug : "yodiwo-wisper"
date: 2017-12-14T11:28:12+02:00
weight: 10
---

#### Overview

This code is split into 2 main sections:
- mNodeCore: main code that generates the mNode base package
- Plugins: contains Plugin sample code which showcases the Plugin API

Both open under a single Visual Studio (2015) solution.

#### mNodeCore

It includes all necessary dependencies to build a complete mNode package that:
- is identical to the mNode package [downloaded as a package](https://cyan.yodiwo.com/Packages/GetPackage/Yodiwo.mNode.zip) from Yodiwo
- can autonomously connect to the Yodiwo cloud
- can be detected by the [Yodiwo Wisper Remote Control](https://play.google.com/store/apps/details?id=com.yodiwo.mnode.rc) Android app
- can present, manage and install Plugins which are published at the Yodiwo Package Manager

Through use of Plugins, mNode can:
- aggregate and terminate different connectivity protocols (such as Bluetooth, Z-Wave, Zigbee, LoRa, etc)
- expose IP-unaware protocols to the Cloud
- bridge full-scale 3rd party ecosystems such as OpenHab

The built Node is also configurable to act as a local Fog Gateway providing automatic and manual local analytics, inter-mNode discovery and remote management.

##### Build
Just run build from Visual Studio. The Yodiwo.mNode project will create a ready-to-execute build for Windows or Linux under Mono (version 4.2+ is suggested)

-- -

#### Plugins

The included sample Plugins code is meant to showcase writing and embedding a Plugin for mNode.
Currently the included plugins are:
- _PInvoke_: allows using C code via a simple C# to C message exchange mechanism with message queues
- _Serial Port_: exposes a serial port as input and output Things on Cyan
- _Flic.io_: integrates with [Flic bluetooth buttons](https://flic.io) and exposes each paired button as a separate Thing. Verified on Raspberry Pi 2/3 with [Flic.io's hci library](https://github.com/50ButtonsEach/fliclib-linux-hci)
- _ZWave_: integrates with [Razberry](https://razberry.z-wave.me/) Z-Wave bridge for Raspberry Pi 2/3
- _CPP_: allows native C++11/C development without needing any custom C# glue code


After the Plugin is built, it must be placed in a new folder under /mNodeCore/mNode/bin/Release/Plugins/

This folder *must* have the same name as the Plugin's UID in its `manifest.json` file:
```
[..]
"PUID": "Yodiwo.mNode.Plugins.TestPlugin",
[..]
```

It is advised that Release mode is used, since the referenced DLLs include in the solution have also been built this way.

When running mNode, the new Plugin will be identified and initialized; its registered Things will be sent to the cloud to be used in Apps in the Cyan Workflow Editor.
