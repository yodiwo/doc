---
title: Things & Ports
slug : "things-ports"
weight: 30
---

Nodes implement the Plegma API to allow communication and interaction with our cloud, but their main purpose is to expose and manage Things, the entities that actually do stuff. In this section we describe how to create them and the Ports they enclose, while in the [Things management & control](https://ndocs.yodiwo.com/apis/plegma/messages/things-mgmt-ctrl/) section we'll talk about how to sync them with our cloud.

So without further delay..

#### Things 
- - - -
..a Thing is this:

<div id="code1_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="csharp" class="tab on">
            <a href="javascript: showCode('code1_container', 'csharp');"><span>C#</span></a><span>.</span>
          </div>
          <div data-lang="java" class="tab off">
            <a href="javascript: showCode('code1_container', 'java');"><span>Java</span></a><span>.</span>
          </div>
          <div data-lang="c" class="tab off">
            <a href="javascript: showCode('code1_container', 'c');"><span>C</span></a><span class="">·</span>
          </div>
          <div data-lang="objc" class="tab off">
            <a href="javascript: showCode('code1_container', 'objc');"><span>Objective-C</span></a>
          </div>
        </div>
        <pre id="csharp">
            <code>
public class Thing
{
    public string ThingKey;
    public string Name;
    public List&lt;ConfigParameter&gt; Config;
    public List&lt;Port&gt; Ports;
    public string Type;
    public string BlockType;      
    public bool Removable;
    public ThingUIHints UIHints;
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
public class Thing {
    public String ThingKey;
    public String Name;
    public ArrayList&lt;ConfigParameter&gt; Config;
    public ArrayList&lt;Port&gt; Ports;
    public String Type;
    public String BlockType;
    public Boolean Removable;
    public ThingUIHints UIHints;
}
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
typedef struct Yodiwo_Plegma_Thing
{
    char* ThingKey;
    char* Name;
    Array_Yodiwo_Plegma_ConfigParameter_t Config;
    Array_Yodiwo_Plegma_Port_t Ports;
    char* Type;
    char* BlockType;
    public bool_t Removable;
    Yodiwo_Plegma_ThingUIHints_t UIHints;
} Yodiwo_Plegma_Thing_t;
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
@interface Thing : JSONModel

@property (strong, nonatomic) NSString *thingKey;
@property (strong, nonatomic) NSString *name;
@property (strong, nonatomic) NSMutableArray&lt;ConfigParameter&gt; *config; // of ConfigParameter
@property (strong, nonatomic) NSMutableArray&lt;Port&gt; *ports; // of Port
@property (strong, nonatomic) NSString *type;
@property (strong, nonatomic) NSString *blockType;
@property (strong, nonatomic) BOOL Removable;
@property (strong, nonatomic) ThingUIHints *uiHints;

@end


@interface ThingUIHints : JSONModel

@property (strong, nonatomic) NSString *iconUri;
@property (strong, nonatomic) NSString *description;

@end
            </code>
        </pre>
    </div>
</div>

It includes:

* the ThingKey: a string that globally and uniquely identifies this particular Thing among all Yodiwo Things in the known universe (because it encloses the also-quite-unique NodeKey). You create this key using a constructor that we provide and your own unique-to-this-node ID.

* Name: a user-friendly name which will be used to present the Thing in the Cyan environment

* Array / List of configuration parameters, which are Name-Value pairs of any configuration that you'd like the Thing to expose. Users will be presented with these configuration options in the Cyan environment and will be able to view and/or change them

* Array / List of Ports, discussed at length later in this page

* Type: a string that matches this Thing's type to a [ThingType](http://yodiwo.github.io/plegma/Plegma/Doxygen/class_yodiwo_1_1_a_p_i_1_1_plegma_1_1_thing_type.html), if any. Although it can be left blank, it may be important to match it to a Type, as this allows users to directly interact with this Thing (group it with other Things of the same Type, alter its configuration, directly send values, etc) through the Cyan's environment Thing Manager. Please refer to [ThingType](http://yodiwo.github.io/plegma/Plegma/Doxygen/class_yodiwo_1_1_a_p_i_1_1_plegma_1_1_thing_type.html) in the [api reference](https://yodiwo.github.io/plegma) for more info on Types or consult the sample code provided within the same resources.
  If left empty, users can of course still see the Thing in Cyan and use it in graphs.

* BlockType: This can be left blank if this Thing can be adequately represented by Cyan's default model for Things, where each of its Ports sends and receives State strings. If special treatment is required, we'll create a model tailored to your needs and provide you with a new BlockType string that will be inserted here

* Removable: boolean that specifies to the server whether users are allowed (and it makes sense) to remove this Thing or not. If left false, your Node will not receive ThingsSet messages of the Delete operation type for this Thing. If the user tries to delete the Thing, it will be hidden instead and not be available for use in Stories

* UIHints: class that includes information on how to present this Thing in the Cyan environment. Currently the available entries are:

    * String UIHints.IconURI: a publicly accessible URI (e.g. a public Dropbox link) of the icon you wish it to have. Most icon formats (.ico, .png, svg, etc) are supported although vector based ones are preferred due to their superior scaling
    * String UIHints.Description: Description of the Thing to be shown at various places within the Cyan environment (e.g. tooltips, Thing tables, documentation, etc)

Each Thing has one or more Ports:

#### Ports 
- - - -
Each Thing is an island of functionality and Ports are the points it uses to exchange information with

A simple button Thing may have a single output Port that triggers a message whenever it is pressed or depressed.

A button has no input Ports because it is completely event based, however a Thing representing a switch may have an output port triggering a message whenever it changes state, while also providing an input port allowing its configuration or sampling of its state at any time.

More complex things can have multiple input and output ports, allowing them to be sampled -or triggered- by external entities, while also generating events of their own towards others.

Our Port representation is:

<div id="code2_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="csharp" class="tab on">
            <a href="javascript: showCode('code2_container', 'csharp');"><span>C#</span></a><span>.</span>
          </div>
          <div data-lang="java" class="tab off">
            <a href="javascript: showCode('code2_container', 'java');"><span>Java</span></a><span>.</span>
          </div>
          <div data-lang="c" class="tab off">
            <a href="javascript: showCode('code2_container', 'c');"><span>C</span></a><span class="">·</span>
          </div>
          <div data-lang="objc" class="tab off">
            <a href="javascript: showCode('code2_container', 'objc');"><span>Objective-C</span></a>
          </div>
        </div>
        <pre id="csharp">
            <code>
public class Port
{
    public string PortKey;
    public string Name;
    public string Description;
    public ioPortDirection ioDirection;
    public ePortType Type;
    public string State;
    public int RevNum;
    public ePortConf ConfFlags;
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
public class Port {
    public String PortKey;
    public String Name;
    public String Description;
    public ioPortDirection ioDirection;
    public ePortType Type;
    public String State;
    public int RevNum;
    public ePortConf ConfFlags;
}
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
typedef struct Yodiwo_Plegma_Port
{
    char* PortKey;
    char* Name;
    char* Description;
    Yodiwo_Plegma_ioPortDirection ioDirection;
    Yodiwo_Plegma_ePortType Type;
    char* State;
    int32_t RevNum;
    Yodiwo_Plegma_ePortConf ConfFlags;
} Yodiwo_Plegma_Port_t;
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
@interface Port : JSONModel

@property (strong, nonatomic) NSString *portKey;
@property (strong, nonatomic) NSString *name;
@property (strong, nonatomic) NSString *description;
@property (nonatomic) EnumIOPortDirection ioDirection;
@property (nonatomic) EnumPortType type;
@property (strong, nonatomic) NSString *state;
@property (nonatomic) NSInteger revNum;
@property (strong, nonatomic) EnumPortConf confFlags;

@end
            </code>
        </pre>
    </div>
</div>

Its members are:

* PortKey: a string that, again, globally and uniquely identifies this Port among all Ports (because it incorporates the also-unique ThingKey). You create this key using a constructor that we provide and your own unique-to-the-thing ID string.

* Name: a user-friendly name which will be used to present the Port in the Cyan environment (the connection dot's name in the block). Although not advised, it is allowed to be left null for absolutely-obvious ports (e.g. the single output of a butto

* Description: a human-targeted description of the Port's functionality and purpose. This will show up as a tooltip when the user hovers over the port in the Cyan environment

* ioDirection: may be set to Input, Output or InputOutput:

        enum ioPortDirection
        {
            //both Input and Output, Port will be used in both Graph Input and Output Things
            InputOutput = 1,
        
            //Port will be used only in Graph Input Things (node->cloud)
            Output = 2,
        
            //Input only; Port will be used only in Graph Output Things (cloud->node)
            Input = 3
        }

In addition to those values, if using a custom model for the Port's parent Thing, then a Port's state could be a custom JSON-serialized string representing a complex type

* State: this should hold the last saved State of this Port (for Ports that this saving makes sense). It is a string encoding of the previously discussed Type

* RevNum: The Revision number of the last State's update (each State is unique and assigned a monotonically increasing number; this number is maintained by the Cloud server and used in PortEvent messages as discussed [here](https://ndocs.yodiwo.com/apis/plegma/messages/message-event-passing/))

* ConfFlags: bitmap of configuration flags per port

        enum ePortConf
        {
            //specifies whether port should propagate all events, i.e. even values 
            //that are identical to the port's previous value but were triggered in
            //a graph. Event will still have an updated RevNum value
            PropagateAllEvents = 1,
        
            //marks port as a trigger (this may have an effect on where it's placed on the 
            //block model and how events from it are propagated)
            IsTrigger = 2
        }

Please see [Message & event passing](https://ndocs.yodiwo.com/apis/plegma/messages/message-event-passing/) for more information on the whys and hows of this

#### Examples
- - - -
here are some real-world examples of Things / Ports definitions:


<div id="code3_container">
    <div class="block-code block-show-code" type="section.type">
        <div class="code-tabs">
          <div data-lang="csharp" class="tab on">
            <a href="javascript: showCode('code3_container', 'csharp');"><span>C#</span></a><span>.</span>
          </div>
          <div data-lang="java" class="tab off">
            <a href="javascript: showCode('code3_container', 'java');"><span>Java</span></a><span>.</span>
          </div>
          <div data-lang="c" class="tab off">
            <a href="javascript: showCode('code3_container', 'c');"><span>C</span></a><span class="">·</span>
          </div>
          <div data-lang="objc" class="tab off">
            <a href="javascript: showCode('code3_container', 'objc');"><span>Objective-C</span></a>
          </div>
        </div>
        <pre id="csharp">
            <code>
//Setup a tri-color RGB LED Thing
{
  //setup the LED thing itself
  var RgbLedThing = new Yodiwo.API.Plegma.Thing()
  {
    ThingKey = new ThingKey(NodeKey, _generateThingID()),
    Name = "Raspberry tri-color Led",
    Config = null,
    UIHints = new ThingUIHints()
    {
      IconURI = "/Content/RaspberryNode/img/icon-rgb-led.png"
    }
  };

  //setup its three boolean input ports (receiving events to 
  //turn the LED on/off), one for each LED color
  thing.Ports = new List&lt;Yodiwo.API.Plegma.Port&gt;()
  {
    new Yodiwo.API.Plegma.Port()
    {
      PortKey = new Yodiwo.API.Plegma.PortKey(thing, "0"),
      Name = "Red",
      ioDirection = Yodiwo.API.Plegma.ioPortDirection.Input,
      Type = Yodiwo.API.Plegma.ePortType.Boolean,
      State = "0"
    },
    new Yodiwo.API.Plegma.Port()
    {
      PortKey = new Yodiwo.API.Plegma.PortKey(thing, "1"),
      Name = "Green",
      ioDirection = Yodiwo.API.Plegma.ioPortDirection.Input,
      Type = Yodiwo.API.Plegma.ePortType.Boolean,
      State = "0"
    },
    new Yodiwo.API.Plegma.Port()
    {
      PortKey = new Yodiwo.API.Plegma.PortKey(thing, "2"),
      Name = "Blue",
      ioDirection = Yodiwo.API.Plegma.ioPortDirection.Input,
      Type = Yodiwo.API.Plegma.ePortType.Boolean,
      State = "0"
    }
  };
}
            </code>
        </pre>
        <pre id="java" style="display:none;">
            <code>
// Things to represent the sensor outputs of Android phones
// ----------------------------------------------
// Brightness
{
  ThingKey thingKey = ThingKey.CreateKey(nodeKey, Brightness);
  thing = new Thing(thingKey,
                    "BrightnessSensor",
                    new ArrayList&lt;ConfigParameter&gt;(),
                    new ArrayList&lt;Port&gt;(),
                    "",
                    "",
                    new ThingUIHints("/Content/VirtualGateway/img/brtness.png")
                   );

  thing.Ports.add(new Port("BrightnessVal",
                           ePortType.Decimal,
                           ioPortDirection.Output,
                           PortKey.CreateKey(thingKey, "0"),
                           0,
                           "0"));
}

// ----------------------------------------------
// NFC
NfcAdapter mNfcAdapter = NfcAdapter.getDefaultAdapter(context);
if (mNfcAdapter != null) {
  ThingKey thingKey = ThingKey.CreateKey(nodeKey, OutputNFC);
  thing = new Thing(thingKey,
                    "OutputNFC",
                    new ArrayList&lt;ConfigParameter&gt;(),
                    new ArrayList&lt;Port&gt;(),
                    "",
                    "",
                    new ThingUIHints("/Content/VirtualGateway/img/nfc.png")
                   );

  thing.Ports.add(new Port("NfcReadout",
                           ePortType.String,
                           ioPortDirection.Output,
                           PortKey.CreateKey(thingKey, "0"),
                           0,
                           "0"));
}

// ----------------------------------------------
// GPS
thingKey = ThingKey.CreateKey(nodeKey, GPS);
thing = new Thing(thingKey,
                  GPS,
                  new ArrayList&lt;ConfigParameter&gt;(),
                  new ArrayList&lt;Port&gt;(),
                  "",
                  "",
                  new ThingUIHints("/Content/VirtualGateway/img/gps.png")
                 );

thing.Ports.add(new Port("Position",
                         ePortType.String,
                         ioPortDirection.Output,
                         PortKey.CreateKey(thingKey, "0"),
                         0,
                         ""));
NodeService.AddThing(context, thing);
            </code>
        </pre>
        <pre id="c" style="display:none;">
            <code>
                [coming soon..]
            </code>
        </pre>
        <pre id="objc" style="display:none;">
            <code>
// Virtual switch
{
    NSString *thingUID = @"iOSSwitch";
    ThingKey *thingKey = [[ThingKey alloc] initWithNodeKey:nodeKey
                                               andThingUid:thingUID];
    
    Port *port = [[Port  alloc] init];
    port.name = @"Switch state";
    port.ioDirection = EnumIOPortDirection_Output;
    port.type = EnumPortType_Boolean;
    port.portKey = [[[PortKey alloc] initWithThingKey:thingKey
                                           andPortUid:@"0"] toString];
    NSMutableArray *ports = (id)[NSMutableArray new];
    [ports addObject:port];
    
    ThingUIHints *uiHints = [[ThingUIHints alloc] init];
    uiHints.iconUri = @"/Content/VirtualGateway/img/switch.png";
    
    [[NodeController sharedNodeController]
            addThing:[[Thing alloc] initWithThingKey:[thingKey toString]
                                                name:[deviceName stringByAppendingString:thingUID]
                                              config:nil
                                               ports:ports
                                                type:@"iOSVirtual"
                                           blockType:@""
                                             uiHints:uiHints]];
}

// Virtual slider
{
    NSString *thingUID = @"iOSSlider";
    ThingKey *thingKey = [[ThingKey alloc] initWithNodeKey:nodeKey
                                               andThingUid:thingUID];
    
    Port *port = [[Port  alloc] init];
    port.name = @"Slider value";
    port.ioDirection = EnumIOPortDirection_Output;
    port.type = EnumPortType_Decimal;
    port.portKey = [[[PortKey alloc] initWithThingKey:thingKey
                                           andPortUid:@"0"] toString];
    NSMutableArray *ports = (id)[NSMutableArray new];
    [ports addObject:port];
    
    ThingUIHints *uiHints = [[ThingUIHints alloc] init];
    uiHints.iconUri = @"/Content/VirtualGateway/img/icon-thing-slider.png";
    
    [[NodeController sharedNodeController]
     addThing:[[Thing alloc] initWithThingKey:[thingKey toString]
                                         name:[deviceName stringByAppendingString:thingUID]
                                       config:nil
                                        ports:ports
                                         type:@"iOSVirtual"
                                    blockType:@""
                                      uiHints:uiHints]];
}

// Virtual text input
{
    NSString *thingUID = @"iOSTextInput";
    ThingKey *thingKey = [[ThingKey alloc] initWithNodeKey:nodeKey
                                               andThingUid:thingUID];
    
    Port *port = [[Port  alloc] init];
    port.name = @"Text";
    port.ioDirection = EnumIOPortDirection_Output;
    port.type = EnumPortType_String;
    port.portKey = [[[PortKey alloc] initWithThingKey:thingKey
                                           andPortUid:@"0"] toString];
    NSMutableArray *ports = (id)[NSMutableArray new];
    [ports addObject:port];
    
    ThingUIHints *uiHints = [[ThingUIHints alloc] init];
    uiHints.iconUri = @"/Content/VirtualGateway/img/icon-thing-text.png";
    
    [[NodeController sharedNodeController]
     addThing:[[Thing alloc] initWithThingKey:[thingKey toString]
                                         name:[deviceName stringByAppendingString:thingUID]
                                       config:nil
                                        ports:ports
                                         type:@"iOSVirtual"
                                    blockType:@""
                                      uiHints:uiHints]];
}
            </code>
        </pre>
    </div>
</div>
