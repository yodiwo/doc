---
title : Yodiwo Fog Gateway
slug : "yodiwo-fog-gateway"
weight : 18
---

#### Description

The Fog gateway is a Yodiwo Node, as previously defined, with special features and capabilities.

It is cross platform software based on the Microsoft .Net frame work and can run on any Windows PC, Linux, Android, iOS, or embedded ARM-based devices such as the Raspberry Pi running Linux or Windows IOT.
It can also be provided as final hardware, either branded as Yodiwo or with the customer’s brand.

#### Architecture

A Yodiwo Node can be a monolithic entity created from scratch to provide specific features, or it can use a Plugin architecture to support live, on-the-fly, additions and removals of functionality bundles.

Both cases are based on the Yodiwo Node SDK, which in turn is based on Microsoft’s .Net software platform.

 

The Yodiwo Fog gateway ( Wisper ) uses many of the mentioned Node capabilities:

- acts as an IoT Fog server, automatically splitting functionality between Alcyone and Nodes
- identifies other Yodiwo nodes currently within its vicinity (for now this means with the same LAN) and link with them to directly exchange messages and if applicable bypass Yodiwo’s cloud, severely reducing latency
- acts as a gateway for devices that do not directly use the Plegma API
- acts as a proxy to Yodiwo’s cloud devices for Yodiwo-agnostic 3rd party cloud platforms or services (like OpenHAB, Apple Homekit, Google Nest, Samsung SmartThings, etc)

The basic architecture of Wisper based on the Node SDK is as follows:

![Alt Architecture based on SDK node](/assets/images/Architecture_NodeSDK.png)

###### Monolithic nodes

Developers (and Yodiwo) can choose to code directly against the Node SDK, resulting in monolithic, single-purpose applications, that may still use all of Yodiwo’s advanced features such as Graph Splitting, Cross-Node discovery, dynamic rerouting, etc.

Examples of current applications which make direct use of this SDK are:

- ModBus slave & master
- Z-Wave proxy
- BACnet proxy
- LoRa gateway
- 3rd party ecosystem proxy (GoogleNest, Samsung SmartThings)
- 3rd party IoT platform integrator(for IBM Bluemix, Amazon AWS, MS Azure)
- OpenHAB proxy
- Camera proxy
- Yodiwo integration with Dexter Industries’GrovePi kit
- etc

Any of the above, and any Node SDK client in general, can be built with the “local Fog execution” option enabled, meaning that they can benefit from automatic scenario splitting and dynamic event rerouting.

Through Microsoft Xamarin all of above can also run on Android and iOS, retaining all thus far mentioned benefits.

 

###### Extensible nodes

Yodiwo has also developed an open plugin framework and API on top of the Node SDK.

Developers (and Yodiwo itself) can create new plugins against this framework, and users can download and on-the-fly install them on their gateway.

These nodes, and all their plugins, retain all advanced features offered by Yodiwo, including splitting and dynamic rerouting. 

In addition, plugins can *directly address each other*, interoperate and execute *RPC* (Remote Procedure Calls), either synchronously (blocking until an answer is returned) or asynchronously.

The framework automatically and without developer effort provides for *versioning*, compatibility checking for inter-plugin IPC, and *automatic updating* of plugins, as well as the core Gateway code.

Existing plugins include:

- OpenHAB support (OpenHAB is provided as both a plugin and a monolithic Node)
- Audio and Video streaming support
- Camera discovery via the OnVIF protocol
- Google Nest
- Plugin to integrate with closed-source libraries provided as Windows .dll or Linux .so objects

#### Installation & Packaging

Fog SW and selected plugins can come preinstalled and preconfigured on Gateway hardware (such as the Raspberry Pi 1/2/3). From there users can administer and configure them either through a Web based GUI, a Windows WPF app, or mobile apps (Android, iOS, Xamarin Forms). They can also install new plugins through the same means.

Additionally, for Linux-based gateways all Nodes and plugins are packaged, installable and upgradeable through the Debian’s Apt framework (# apt-get install<pkgname>), while a Windows msi installer is also provided for Windows systems.

Core and plugins software can be updated automatically and without user intervention, if required.

In the future, the up-and-coming cross-distribution Snap framework will also be used for packaging and installation.
