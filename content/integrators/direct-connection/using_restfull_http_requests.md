---
title : Using RESTful HTTP requests
slug : "using-restful-http-requests"
description : 
weight : 1
draft : false
toc : false
---

Any entity can send HTTPS requests towards cyan and if a proper graph exists, the requests will trigger it and have it executed.

#### API keys for REST

Authentication happens via the use of API keys, created by the user in Cyan’s User Profile Manager: 

![Alt Authentication via API keys](/assets/images/Prof_manager.png)

Each created API key is globally unique, tied to the account of user that created it, and can be individually enabled and disabled or have its quota tracked and/or enforced.

#### Basic HTTP requests towards Alcyone

HTTPS requests towards Alcyone must follow the following URL convention:

~~[**https://cyan.yodiwo.com/hooks/restin//**]~~

Use of a valid API key is mandatory, otherwise there will be an immediate 403 – Forbidden response. 

The subpath definition is optional and can be used to easily disambiguate between requests (explained later in this section).



Data can be sent either as URL parameters or within the HTTP Request’s body, in JSON or x-www-form-url encoded key-value pairs.

Currently allowed methods are GET and POST.

All requests with valid API keys will reach Alcyone and trigger graphs through the following block:

![Alt Configuration Block](/assets/images/ConfBlock1.1.2.png)



When creating a graph with the REST IN block the user must set the block’s configuration to match the intended and expected HTTPS request from the device.

The expected method must be chosen.

A subpath may beset as well although it’s not mandatory. If set, it acts as a filter and only HTTP requests that have a <subpath> suffix matching it will trigger the block. If not set, all valid requests will trigger the block and their subpath suffix will be output on the “URL SUBPATH” output. This can then be driven to:

- value mapping block (static dictionary): 

![Alt Value Mapping Block](/assets/images/ValueMappingblock1.1.2.png)

- key-value store block (run-time dictionary):

![Alt Value Mapping Block](/assets/images/KeyValueStore1.1.2.png)

- a database query to extract a further runtime
  decision on how to handle the request:

![Alt Value Mapping Block](/assets/images/Databasequery1.1.2.png)

The rest of the configuration parameters are optional and will be presented shortly.

Upon sending a valid HTTPS request from a device, the graph will be triggered by the REST IN block(s) whose parameters match the request. 

The URL subpath will be then provided as the value of the first port, while either of the other two ports will provide the request’s data, depending on how they were sent(key-value form encoded pairs or raw JSON).

So a final graph of the simplest case of “take values from a sensor and store them to a DB” could be:

![Alt Value Mapping Block](/assets/images/FinalGraph1.1.2.png)

When a sensor device has data to send, it can use an API key and send the appropriate HTTPS POST request to Yodiwo. It will trigger the graph, its JSON data will get deserialized, an SQL query constructed out of the values and then fed to the ‘Query’ port of the MYSQL block.

#### HTTP Requests via graph logic

Let’s extend this so that the returned HTTP Response provides info about whether the SQL insert operation succeeded or not:

![](/assets/images/Graph1.1.3.png)

The operation remains the same until the DB query result is fed into a VALUE MAPPING block (it could be a triggered constant instead), for example converting status True to 200 and anything else to 406. From there the integer status code can be fed to and trigger the REST IN RESPONSE block for the final HTTP response to the original request.

The only thing that needs to change is to configure the REST IN block to not automatically reply with 200 OK to incoming requests but instead produce responses through the graph.

For this we set the ‘Send custom response’ switch to ON and set a unique Group ID (any integer number) that will be matched to the configuration of the REST IN RESPONSE block:

![](/assets/images/ResponseBlock1.1.3.png)

![](/assets/images/ResponseBlock21.1.3.png)



#### HTTP Requests from Alcyone

So far we’ve been receiving sensor-type events into Alcyone. We can also use the HTTP OUT block for a *return path*, to send out events towards external entities.

This can be used to:

- extend Alcyone by sending requests to other system components,
- connect to 3rd party services,
- or just send normal events to edge devices that have implemented an HTTP(s) server

![](/assets/images/block1.1.4.png)

The block receives the body of the message as input; the rest of the parameters are configured via the inspector area where the user specifies:

- - URL; http:// or https:// can be used for non-secure or secure connections


  - HTTP method; GET, POST, PUT currently supported
  - Headers to add
  - Data format; currently supported: JSON, form data, SOAP, XML, raw text
