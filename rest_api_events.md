---
layout: api_doc_post
title: Post events
permalink: /docs/post-single-message
---

## Definition
https://api.yodiwo.com/api/1.0/NODEKEY/SECRETKEY/porteventmsg

- - - -

## Parameters

| Name | Type |
| -----: | ----- |
| **nodekey** <br/> *required* | **string** *n/a* <br/> NodeKey (received during Node pairing) |
| **secretkey** <br/> *required* | **string** *n/a* <br/> SecretKey (received during Node pairing) |

- - - -

## Examples

<div id="code1_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="csharp" class="tab on">
            <a href="javascript: showCode('code1_container', 'csharp');"><span>C#</span></a><span>.</span>
          </div>
        </div>
        <pre id="csharp">
            <code>
public void PostRestMsg(Tuple<string, string> target_msg)
{
  try
  {
    //add base route
    string worker = "https://" + ActiveCfg.RestServer + ":443/api/";
    //add API ver
    worker += "v1.0/";
    //add nodekey
    worker += ActiveCfg.nodeKey + "/";
    //add secretkey
    worker += ActiveCfg.nodeSecret + "/";
    //add msg name
    worker += target_msg.Item1;

    var client = new HttpClient();

    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    var task = client.PostAsync(worker, new StringContent(target_msg.Item2, Encoding.UTF8, "application/json"));
    task.Wait();

    HttpResponseMessage rsp = task.Result;
    if (rsp.StatusCode == System.Net.HttpStatusCode.OK)
    {
      Console.WriteLine("All ok!");
    }
  }
  catch {}
}
            </code>
        </pre>
    </div>
</div>


- - - -


## Result Format


<div id="code2_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="200" class="tab on">
            <a href="javascript: showCode('code2_container', '200');"><span><span class="status-icon status-icon-success"></span> 200 OK</span></a><span>.</span>
          </div>
          <div data-lang="400" class="tab off">
            <a href="javascript: showCode('code2_container', '400');"><span><span class="status-icon status-icon-error"></span> 400 Bad Request</span></a><span>.</span>
          </div>
          <div data-lang="410" class="tab off">
            <a href="javascript: showCode('code2_container', '410');"><span><span class="status-icon status-icon-error"></span> 401 Unauthorized</span></a><span class="">·</span>
          </div>
        </div>
        <pre id="200"><code>Accepted</code></pre>
        <pre id="400" style="display:none;"><code>Generic error in handling message</code></pre>
        <pre id="410" style="display:none;"><code>Authorization failed (e.g. invalid keys or ApiKey does not match NodeKey)</code></pre>
    </div>
</div>

- - - -


## Documentation
Posts a new trigger to the cloud server. The message contains an array of port events that the cloud server should act on. Look into [API event passing](/doc/docs/message-event-passing) for more info.