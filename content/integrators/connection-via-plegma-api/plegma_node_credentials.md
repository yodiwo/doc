---
title: Plegma Nodes Credentials
slug : "plegma-nodes-credentials"
description:
categories: [plegma]
keywords: [Alcyone,docs,plegma]
weight: 10
draft: false
toc: false
---

Plegma Nodes must be assigned a Node Key and a Secret Key, using either of the following:

-         a **pairing** process 


-         a platform-aided provisioning process


-         direct key generation from Cyan’s UI


-         custom use of the Warlock API

This should be the integrator’s **choice** that is dependent on the intended final application:

-         Pairing implies that each end-user is a separate Yodiwo account holder, i.e. the end device (node) is the same for multiple end-users, each of which must pair it to their own Yodiwo account.


-         The rest of the provisioning methods imply that the end user is not and need not be aware of this process. Use of the platform happens under-the-hood and serves the application’s, service’s or OEM’s connectivity needs. 

Yodiwo provides tools for both options:

-         **Pairing agents** are provided for all major platforms where Node Plegma API agents are provided. Pairing can:

  - 	be either completely stand-alone for platforms that can offer a user-login GUI

    - or, for GUI-less devices, be remotely assisted by a GUI-capable device where the end-user can complete a login procedure.

Security is maintained on both cases; more information about the pairing process can be found in [TODO: Dlt or Link]

-    Nodes and node credentials (node and secret keys) can:
     -    be created directly in the Things Manager section:

       ![Alt Node Creation]({{% baseurl %}}assets/images/node-creation.png)          

     -    be created in bulk through a Warlock API client

     - be created via a graph in Cyan itself, using the Create Node and Create API Key blocks found in the Cyan Designer Toolbox “Platform” section:


<table><td> <img src="{{% baseurl %}}assets/images/createnode.png" alt="Create Node"> </td> <td><img src="{{% baseurl %}}assets/images/createapi.png" alt="Create API" )></td></table>

Similar to how API keys can be created to enable REST services (discussed later in this document), API keys can also be linked to Nodes and be used for allowing edge devices to connect to the Cloud Backend through the Plegma API.
In this case the Node does not need to know / keep the Master Key generated through the pairing process, and can instead just use the linked API Key.


This also allows the integrator to better control node access, since API keys can be individually enabled/disabled (without being removed) and can have their Quota tracked.

Linked API keys can be generated:

-	through use of the Warlock API
  - automatically through the graph, using the previously mentioned blocks

![Alt Graph]({{% baseurl %}}assets/images/Graph3.1.png)

-  or manually through Cyan's UI:

  ​	![Alt Manually Key]({{% baseurl %}}assets/images/ManuallyKey.png)

  ​	<figcaption><center>Generate API keys Manually</center></figcaption>

  ​
