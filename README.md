# WM Blazor Overlay Scrollbars

A Blazor scrollbar component which hides native scrollbars, provides custom styleable overlay scrollbars and keeps the native functionality and feeling.

This component is based on OverlayScrollbar witch is found in: https://kingsora.github.io/OverlayScrollbars/

---
## Setup

First, import the namespaces in `_Imports.razor`

```
@using  WMBlazorOverlayScrollbars.WMBOS
```

Then, inside your main `Startup`/`Program`, call `AddWMBOS`.

```
builder.Services.AddWMBOS();
```

## The component structre

The `BlazorOverlayScrollbars` has the following structure:
```html
<BlazorOverlayScrollbars>
	<BlazorOverlayScrollbarsContent>
		your content here
	</BlazorOverlayScrollbarsContent>
	<BlazorOverlayScrollbarsLoading>
		your loading component here
	</BlazorOverlayScrollbarsLoading>
</BlazorOverlayScrollbars>
```

The `BlazorOverlayScrollbarsLoading` component is optional. By default it will render the text `Loading...`

## A simple usage

HTML Content:
*Can be any html component as well as any other blazor component.*
```html
<BlazorOverlayScrollbars>
	<BlazorOverlayScrollbarsContent>
		<p>Demo</p>
		...
		...
	</BlazorOverlayScrollbarsContent>
	<BlazorOverlayScrollbarsLoading>
		<p>Loading...</p>
	</BlazorOverlayScrollbarsLoading>
</BlazorOverlayScrollbars>
```

Textarea:
*The textarea element Must be the **unique child** of `BlazorOverlayScrollbars` to get the custom scrollbar behavior*
```html
<BlazorOverlayScrollbars>
	<BlazorOverlayScrollbarsContent>
		<textarea></textarea>
	</BlazorOverlayScrollbarsContent>
	<BlazorOverlayScrollbarsLoading>
		<b>Loading...</b>
	</BlazorOverlayScrollbarsLoading>
</BlazorOverlayScrollbars>
```

Iframe:
*The iframe element Must be the **unique child** of `BlazorOverlayScrollbars` to get the custom scrollbar behavior. *
```html
<BlazorOverlayScrollbars>
	<BlazorOverlayScrollbarsContent>
		<iframe  src="your-iframe-source"></iframe>
	</BlazorOverlayScrollbarsContent>
	<BlazorOverlayScrollbarsLoading>
		<b>Loading...</b>
	</BlazorOverlayScrollbarsLoading>
</BlazorOverlayScrollbars>
```
  
Note that your iFrame source has to have the **same origin** (domain, protocol and port) as your current site.

## Configurations

To custom settings of your component there is the `WMBOSConfigurations` object, which already has default values set.

### Default values

```c#
public  class  WMBOSConfigurations
{
	public  string  className { get; set; } = "os-theme-dark";
	public  string  themePath { get; set; } = null;
	public  string  resize { get; set; } = "none";
	public  bool  sizeAutoCapable { get; set; } = true;
	public  bool  clipAlways { get; set; } = true;
	public  bool  normalizeRTL { get; set; } = true;
	public  bool  paddingAbsolute { get; set; } = true;
	public  bool  autoUpdate { get; set; } = false;
	public  int  autoUpdateInterval { get; set; } = 33;
	public  WMBOSOverflowBehavior  overflowBehavior { get; set; }
	public  WMBOSNativeScrollbarsOverlaid  nativeScrollbarsOverlaid { get; set; }
	public  WMBOSScrollbars  scrollbars { get; set; }
	public  WMBOSTextarea  textarea { get; set; }

	public  WMBOSConfigurations()
	{
		this.overflowBehavior = new  WMBOSOverflowBehavior();
		this.nativeScrollbarsOverlaid = new  WMBOSNativeScrollbarsOverlaid();
		this.scrollbars = new  WMBOSScrollbars();
		this.textarea = new  WMBOSTextarea();
	}
}

public  class  WMBOSNativeScrollbarsOverlaid
{
	public  bool  showNativeScrollbars { get; set; } = false;
	public  bool  initialize { get; set; } = true;
}

public  class  WMBOSOverflowBehavior
{
	public  string  x { get; set; } = "scroll";
	public  string  y { get; set; } = "scroll";
}

public  class  WMBOSScrollbars
{
	public  string  visibility { get; set; } = "auto";
	public  string  autoHide { get; set; } = "never";
	public  int  autoHideDelay { get; set; } = 800;
	public  bool  dragScrolling { get; set; } = true;
	public  bool  clickScrolling { get; set; } = false;
	public  bool  touchSupport { get; set; } = true;
	public  bool  snapHandle { get; set; } = false;
}

public  class  WMBOSTextarea
{
	public  bool  dynWidth { get; set; } = false;
	public  bool  dynHeight { get; set; } = false;
	public  string[] inheritedAttrs { get; set; } = {"style", "class"};
}
```

### How to configure

You have to instanciate the `WMBOSConfigurations` object with your customizations and pass it as parameter to the `BlazorOverlayScrollbars`.

```html
<BlazorOverlayScrollbars  Configurations="configurations">
	<BlazorOverlayScrollbarsContent>
		your-html-here
		...
	</BlazorOverlayScrollbarsContent>
</BlazorOverlayScrollbars>
```
```c#
@code  {
	public  WMBOSConfigurations  configurations;

	protected  override  void  OnInitialized()
	{
		configurations = new  WMBOSConfigurations {
			className = "os-theme-round-dark",
			resize = "both",
			paddingAbsolute = true
		};
		configurations.scrollbars.clickScrolling = true;
	}
}
```

You can check more available options here: https://kingsora.github.io/OverlayScrollbars/#!documentation/options

## Themes

The `BlazorOverlayScrollbars` already has some themes, witch samples can be found here: https://kingsora.github.io/OverlayScrollbars/#!themes

How to use this themes? Just define on the configuration `className` attribute with one of following values:

`os-theme-dark`, `os-theme-light`, `os-theme-block-dark`, `os-theme-block-light`, `os-theme-minimal-dark`, `os-theme-minimal-light`, `os-theme-round-dark`, `os-theme-round-light`, `os-theme-thick-dark`, `os-theme-thick-light`, `os-theme-thin-dark`, `os-theme-thin-light`.

The value is `os-theme-dark`

Example:

```html
<BlazorOverlayScrollbars  Configurations="configSample">
	<BlazorOverlayScrollbarsContent>
		your-html-here
		...
	</BlazorOverlayScrollbarsContent>
</BlazorOverlayScrollbars>
```
```c#
@code  {
	public  WMBOSConfigurations  configSampleOne;
	
	protected  override  void  OnInitialized()
	{
		configSample = new  WMBOSConfigurations {
			className = "os-theme-thick-dark"
		};
	}
}
```

## Custom Themes

You can customize an existing theme by override the css hierarchically In the following link you can see the css class names:
https://kingsora.github.io/OverlayScrollbars/#!documentation/classnames

But, if you decide use your custom theme, just inform your container css class name and the path of your custom css file as in the following example:

```html
<BlazorOverlayScrollbars  Configurations="configSample">
	<BlazorOverlayScrollbarsContent>
		your-html-here
		...
	</BlazorOverlayScrollbarsContent>
</BlazorOverlayScrollbars>
```
```c#
@code  {
	public  WMBOSConfigurations  configSampleOne;
	
	protected  override  void  OnInitialized()
	{
		configSample = new  WMBOSConfigurations {
			className = "your-custom-class",
			themePath = "your-custom-css-file-path.css",
		};
	}
}
```

In order to create your own css theme, please, check the next link where you can see the css template: https://kingsora.github.io/OverlayScrollbars/#!documentation/styling

To check the css

## Callbacks

You can set some callbacks to be fired by the `BlazorOverlayScrollbars`.

Here are the avaiable callbacks:
- `CallbackOnInitialized` - Gets fired after the plugin was initialized.
- `CallbackOnInitializationWithdrawn` - Gets fired after the initialization of the plugin was aborted due to the option: `nativeScrollbarsOverlaid : {  initialize  :  false  }`.
- `CallbackOnDestroyed` - Gets fired after the plugin was destryoed.
- `CallbackOnScrollStart` - Gets fired after the user starts scrolling.
- `CallbackOnScroll` - Gets fired after every scroll.
- `CallbackOnScrollStop` - Gets fired after the user stops scrolling.
- `CallbackOnContentSizeChanged` - Gets fired after the content size has changed.
- `CallbackOnHostSizeChanged` - Gets fired after the host size or host padding has changed.
- `CallbackOnUpdated` - Gets fired after the host size has changed.

You can pass your custom methods to be fired as callbacks. For this, you need to following the next steps:

First, to inform the current project name by parameter `ProjectName`.
Then, create static methods with `[JSInvokable]` attribute and pass them to the correspondent callback.

Example:
```html
<BlazorOverlayScrollbars
	ProjectName="BlazorWasmDemo"
	CallbackOnInitialized="MyOnInitialized"
	CallbackOnScroll="MyOnScroll"
	CallbackOnUpdated="MyOnUpdated"
>
	<BlazorOverlayScrollbarsContent>
		your-html-here
		...
	</BlazorOverlayScrollbarsContent>
</BlazorOverlayScrollbars>
```
```c#
@code {
	[JSInvokable]
	public  static  void  MyOnInitialized()
	{
		System.Console.WriteLine("On Initialized");
	}
	
	[JSInvokable]
	public  static  void  MyOnScroll()
	{
		System.Console.WriteLine("On Scroll");
	}

	[JSInvokable]
	public  static  void  MyOnUpdated()
	{
		System.Console.WriteLine("On Updated");
	}
}
```

## Methods

You can use some avaible methods for custom behaviors. 

- `Constroy` - Constroys the `BlazorOverlayScrollbars`. Useful if you want reconstroy the component after destroyed it.
- `Destroy` - Destroys and disposes the current instance and removes all extensions and added elements from the DOM.
- `Update` - Updates the instance.  Use this method to reset the "sleep" behavior of the sleep method or use it to update the instance manually. A optional parameter, the default value is false.  If set to true, the plugin will be forced to do a complete update which is more expensive but guarantees a lackless update, else a normal update will be done where only necessary components are updated.
- `Scroll` - Returns the scroll information or sets the scroll position. The parameters are `(string  x, string  y, int  duration)` or `(int  x, int  y, int  duration)`. By default the `duration` parameter is `1000`
- `Sleep` - Disables every observation of the DOM and puts the instance to "sleep".  It won't respond to any changes in the DOM and won't update. Scrollbars won't respond to mouse or touch events. Resizing isn't possible anymore. This behavior can be reset by calling the update method.
- `ScrollStop` - Stops the current scroll-animation.

To use the `BlazorOverlayScrollbars` methods you need to following the next steps:

First, you have to get a reference of the `BlazorOverlayScrollbars`.
Then, you call the desired methods.

Example:

```
<BlazorOverlayScrollbars  @ref="theOverlay">
	<BlazorOverlayScrollbarsContent>
		your-html-content
		...
	</BlazorOverlayScrollbarsContent>
</BlazorOverlayScrollbars>

<div>
	<button @onclick="@(e => SampleDestroy())">Destroy</button>
	<button @onclick="@(e => SampleConstroy())">Constroy</button>
	<button @onclick="@(e => SampleUpdate())">Update</button>
	<button @onclick="@(e => SampleScroll(null, "50%"))">Scroll to X 50%</button>
	<button @onclick="@(e => SampleScroll(0, 0))">Scroll to X 0</button>
	<button @onclick="@(e => SampleSleep())">Sleep</button>
	<button @onclick="@(e => SampleScrollStop())">Scroll Stop</button>
</div>
```
```c#
@code  {
	public  BlazorOverlayScrollbars  theOverlay;

	public  async  void  SampleConstroy()
	{
		await  theOverlay.Constroy();
	}

	public  async  void  SampleDestroy()
	{
		await  theOverlay.Destroy();
	}

	public  async  void  SampleUpdate()
	{
		await  theOverlay.Update(true);
	}

	public  async  void  SampleScroll(string  x, string  y)
	{
		await  theOverlay.Scroll(x, y);
	}

	public  async  void  SampleScroll(int  x, int  y)
	{
		await  theOverlay.Scroll(x, y);
	}

	public  async  void  SampleSleep()
	{
		await  theOverlay.Sleep();
	}

	public  async  void  SampleScrollStop()
	{
		await  theOverlay.ScrollStop();
	}
}
```

---

For more informations, please, check the OverlayScrollbars documentation: https://kingsora.github.io/OverlayScrollbars/.