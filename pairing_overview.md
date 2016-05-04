---
layout: page
title: Overview
permalink: /docs/pairing-overview
---

All Nodes need to go through a “pairing” process in order for them to be allowed to exchange data with the Yodiwo cloud. This process is also known as Provisioning or Commissioning.

Pairing assigns a Key and a secret token to the node, both of which are used to later establish connections to the Yodiwo Cloud Platform over secure channels.

The pairing process is defined for two classes of Node devices, those that do not have a GUI of their own and those that do. The process for both is similar. Complete, verified, reference implementations are provided for both by Yodiwo; check relevant examples for your preferred language on [GitHub](https://github.com/yodiwo/plegma).

## Nodes without a GUI

These nodes do not have a screen of their own or other means of projecting to a screen. They are also assumed to be not powerful enough to implement a secure HTTPS web server, but are capable of acting as a client to a secure server, as that is a fundamental requirement for a Node of Yodiwo's Platform.

Hence the method needs the device to:

1. become discoverable (via some form of service discovery if Ethernet, SoftAP if WiFi, visible if Bluetooth, etc)
2. implement and start a simple HTTP server (not necessarily secure), or just be able to respond to 2 basic GET requests
3. be able to access a secure HTTPS server as a client

From these basic requirements a pairing process is devised that allows the node to only be paired with the Yodiwo account of its owner, even if the non-secure part of the communication is eavesdropped. In the latter case, if the attacker tries to hijack the node and pair it to their own account, the node is guaranteed to not be paired at all; the rightful owner (i.e. the one who has physical access to the device and its UUID) is informed via their Yodiwo account.

At the start of the procedure, the user is instructed to find and connect (if necessary by its physical interface) to the device, then visit its web page at http://<deviceip>/pairing/start where they will be instructed to follow the instructions for pairing, which is a simple 2-step process.
The technical details of this process is seen in the following sequence diagram, and as mentioned, code for it in most major languages (C, Java, JS, Objective-C, C#) is provided by Yodiwo at [GitHub](https://github.com/yodiwo/plegma).

The following sequence diagram describes the pairing procedure in detail:

![Alt Sequence diagram of secure pairing of a GUIless node](/doc/assets/images/yodi-tech-doc-pairing_v2.0.png)
<center><figcaption>Sequence diagram of secure pairing of a GUIless node</figcaption></center>

Upon receiving a pairing request (an HTTP Request for <deviceid>/pairing/start) the Node (without yet sending a Response) securely (over an SSL/TLS channel) sends capabilities, configuration and its UUID to the Cloud Server. The cloud server generates two tokens and a secret key and securely sends the 2 tokens (but not the secret key) back to the Node.

As a Response to the original pairing request, the node then:

redirects the User’s browser to the Yodiwo Server so that they securely login and authenticate with Yodiwo, and
sends Token2 as a parameter (?token2=<token>)
It must be noted that this action happens over a non SSL/TLS secured channel (even a strongly encrypted Wi-Fi link is not considered end-to-end secure) and hence an eavesdropper may have acquired Token2. It is therefore important to make sure that such a case cannot lead to a faux-pairing and the hijacking of a legitimate user’s device.
The Node’s response redirects the User’s browser to the Yodiwo cloud service pairing page. If they are not already logged in, they are required to securely log in to their Yodiwo account (via redirection). After successful login they are automatically taken back to the pairing page where they enter the Node’s UUID. This step can also be completed without manual entry, e.g. via NFC or QR code sent from an already paired device such as a smartphone.
Afterwards the browser triggers the node to complete the pairing process at which point the node securely sends Token1 to the Cloud Service.

At this point the Cloud Server evaluates that:

* securely received Tokens 1 and 2 are the same as the ones it originally generated; an attacker may also know Token 2 but they cannot send it to Yodiwo without being a registered user.
* UUID received securely by the logged in User is the same as the one originally securely sent by the Node. Even an attacker who is a registered Yodiwo user can only know Token2, not the Node’s UUID since the latter requires physical access to it.

If everything is in order, the Server securely sends the Node Key and Secret API Key to the Node. These must be used for all Node <-> Server communication from now on, which as previously mentioned, is mandated to occur over a secure channel.


<div ng-switch-when="callout">
    <div class="block-callout block-show-callout  type-info block-show-callout  type-info" type="section.type" ng-model="section.data">
        <h3>
            <i class="fa fa-info-circle on" title="Info"></i>
            <span>Notes:</span>
        </h3>
        <div marked="data.body" class="ng-isolate-scope">
            <ul>
                <li>Since all these steps are done with redirects the user never actually has to type any addresses after the initial http://&lt;deviceid&gt;/ one (which also may be avoided via Service Discovery)</li>
                <li>The user may manually enter their Node’s UUID, although manual entry can be avoided through the use of QR codes (no external applications needed, modern browsers –desktop and mobile- allow this)</li>
                <li>Recap: even if Token2 is acquired by an attacker, pairing cannot be successfully completed without:<ul>
                <li>A valid login to the Yodiwo Service</li>
                <li>Physical access to the newly acquired Node to read / scan its UUID<br>A Node hijacking attempt will fail and the legitimate user will be notified (through their account)</li>
                </ul>
                </li>
            </ul>
        </div>
    </div>
</div>

## Nodes with a GUI
<hr />
The main difference is that GUIful nodes usually shed the limitation of having a 3rd party GUI (e.g. a browser web page) act as mediator and communicate insecurely with the node and securely with the Yodiwo servers.
Hence they could in theory POST a start pairing request with configuration, get redirected to log in to the Yodiwo service and then immediately exchange Node and Secret keys. Currently these nodes still exchange tokens and the pairing backend in Yodiwo servers remains the same, resulting in the following sequence diagram:

![Alt Sequence diagram of secure pairing for a Node with a GUI](/doc/assets/images/yodi-tech-doc-pairing_v2.0_withgui.png)
<center><figcaption>Sequence diagram of secure pairing for a Node with a GUI</figcaption></center>
