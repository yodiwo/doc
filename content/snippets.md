---
title: "Snippets"
date: 2018-01-15T15:03:34Z
draft: false
---

### Blue ###

{{% notice note %}}
A notice disclaimer
{{% /notice %}}
{{%expand "Show source code"%}}
```
{{%/* notice note */%}}
A notice disclaimer
{{%/* /notice */%}}
```
{{% /expand %}}

{{% alert info %}}**this** is a text{{% /alert %}}
{{%expand "Show source code"%}}
```
{{%/* alert info */%}}**this** is a text{{%/* /alert */%}}
```
{{% /expand %}}

<div ng-switch-when="callout">
    <div class="block-callout block-show-callout  type-info block-show-callout  type-info" type="section.type" ng-model="section.data">
        <h3>
            <i class="fa fa-info-circle on" title="Info"></i>
            <span>API reference:</span>
        </h3>
        <div marked="data.body" class="ng-isolate-scope">
            <p>The complete up-to-date API reference in doxygen format can be <a href="https://yodiwo.github.io/plegma/Plegma/Doxygen">found here</a></p>
        </div>
    </div>
</div>

{{% panel theme="info" header="panel title" %}}this is a panel text{{% /panel %}}
{{%expand "Show source code"%}}
```
{{%/* panel theme="info" header="panel title" */%}}this is a panel text{{%/* /panel */%}}
```
{{% /expand %}}

{{% fa-panel theme="info" header="API Reference" icon="fa-info-circle" %}}The complete up-to-date API reference in doxygen format can be found [here](https://yodiwo.github.io/plegma/Plegma/Doxygen){{% /fa-panel %}}

{{%expand "Show source code"%}}

```
{{%/* fa-panel theme="info" header="API Reference" icon="fa-info-circle" */%}}The complete up-to-date API reference in doxygen format can be found [here](https://yodiwo.github.io/plegma/Plegma/Doxygen){{%/* /fa-panel */%}}
```
{{% /expand %}}

### Orange ###

{{% notice info %}}
An information disclaimer
{{% /notice %}}{{%expand "show source code"%}}

```
{{%/* notice info */%}}
An information disclaimer
{{%/* /notice */%}}

```

{{% /expand %}}

{{% alert warning %}}**Be carefull** is a text{{% /alert %}}

{{%expand "show source code"%}}

```
{{%/* alert warning */%}}**Be carefull** is a text{{%/* /alert */%}}

```

{{% /expand %}}

{{% panel theme="warning" header="panel title" %}}this is a panel text{{% /panel %}}{{%expand "show source code"%}}

```
{{%/* panel theme="warning" header="panel title" */%}}this is a panel text{{%/* /panel */%}}
```

{{%/expand%}}

{{% fa-panel theme="warning" header="panel title" icon="fa-exclamation-circle" %}}Again, this is a panel text{{% /fa-panel %}}

{{%expand "show source code"%}}

```
{{%/* fa-panel theme="warning" header="panel title" icon="fa-exclamation-circle" */%}}Again, this is a panel text{{%/* /fa-panel */%}}
```

{{%/expand%}}

### Green ###

{{% notice tip %}}
A tip disclaimer
{{% /notice %}}{{%expand "show source code"%}}

```
{{%/* notice tip */%}}
A tip disclaimer
{{%/* /notice */%}}

```

{{%/expand%}}

{{% alert success %}}**Yeahhh !** is a text{{% /alert %}}

{{%expand "show source code"%}}

```
{{%/* alert success */%}}Yeahhh ! is a text{{%/* /alert */%}}
```

{{%/expand%}}

<div ng-switch-when="callout">
    <div class="block-callout block-show-callout  type-info block-show-callout  type-success" type="section.type" ng-model="section.data">
        <h3>
            <i class="fa fa-check-square on" title="Success"></i>
            <span>we come bearing gifts</span>
        </h3>
        <div marked="data.body">
            <p>Look for our <a href="https://github.com/yodiwo/plegma">Github page</a> to download fully functional code examples of Node implementations in various popular languages!</p>
        </div>
    </div>
</div>

{{% panel theme="success" header="panel title" %}}this is a panel text{{% /panel %}}{{%expand "show source code"%}}

```
{{%/* panel theme="success" header="panel title" */%}}this is a panel text{{%/* /panel */%}}
```

{{%/expand%}}

{{% fa-panel theme="success" header="panel title" icon="fa-check-circle" %}}Again, this is a panel text{{% /fa-panel %}}

{{%expand "show source code"%}}

```
{{%/* fa-panel theme="success" header="panel title" icon="fa-check-circle" */%}}Again, this is a panel text{{%/* /fa-panel */%}}
```

{{%/expand%}}

### Red ###

{{% notice warning %}}
An warning disclaimer
{{% /notice %}}{{%expand "show source code"%}}

```
{{%/* notice warning */%}}
An warning disclaimer
{{%/* /notice */%}}

```

{{%/expand%}}

{{% alert theme="danger" %}}**Beware !** is a text{{% /alert %}}{{%expand "show source code"%}}

```
{{%/* alert theme="danger" */%}}Beware ! is a text{{%/* /alert */%}}
```

{{%/expand%}}

{{% panel theme="danger" header="panel title" %}}this is a panel text{{% /panel %}}{{%expand "show source code"%}}

```
{{%/* panel theme="danger" header="panel title" */%}}this is a panel text{{%/* /panel */%}}
```

{{%/expand%}}

{{% fa-panel theme="danger" header="panel title" icon="fa-exclamation-triangle" %}}Again, this is a panel text{{% /fa-panel %}}

{{%expand "show source code"%}}

```
{{%/* fa-panel theme="danger" header="panel title" icon="fa-exclamation-triangle" */%}}Again, this is a panel text{{%/* /fa-panel */%}}
```

{{%/expand%}}

### Other boxes ###

{{% panel %}}this is a panel text{{% /panel %}}

{{%expand "show source code"%}}

```
{{%/* panel */%}} this is a panel text {{%/* /panel */%}}
```

{{%/expand%}}

{{% panel theme="default" header="panel title" %}}this is a panel text{{% /panel %}}{{%expand "show source code"%}}

```
{{%/* panel theme="default" header="panel title" */%}} this is a panel text {{%/* /panel */%}}
```

{{%/expand%}}

{{% panel theme="primary" header="panel title" %}}this is a panel text{{% /panel %}}{{%expand "show source code"%}}

```
{{%/* panel theme="primary" header="panel title" */%}} this is a panel text {{%/* /panel */%}}
```

{{%/expand%}}

{{% panel theme="default" footer="panel title" %}}this is a panel text{{% /panel %}}{{%expand "show source code"%}}

```
{{%/* panel theme="default" footer="panel title" */%}}this is a panel text{{%/* /panel */%}}
```

{{%/expand%}}

{{% panel theme="primary" footer="panel title" %}}this is a panel text{{% /panel %}}{{%expand "show source code"%}}

```
{{%/* panel theme="primary" footer="panel title" */%}} this is a panel text {{%/* /panel */%}}
```

{{%/expand%}}

{{% fa-panel theme="primary" header="panel title" icon="fa-magic" %}}Again, this is a panel text{{% /fa-panel %}}{{%expand "show source code"%}}

```
{{%/* fa-panel theme="primary" header="panel title" icon="fa-magic" */%}}Again, this is a panel text{{%/* /fa-panel */%}}
```

{{%/expand%}}

{{% fa-panel theme="primary" footer="panel title" icon="fa-magic" %}}Again, this is a panel text{{% /fa-panel %}}{{%expand "show source code"%}}

```
{{%/* fa-panel theme="primary" footer="panel title" icon="fa-magic" */%}}Again, this is a panel text{{%/* /fa-panel */%}}
```

{{%/expand%}}