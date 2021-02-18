public class WMBOSConfigurations
{
    public string className { get; set; } = "os-theme-dark";
    public string themePath { get; set; } = null;
    public string resize { get; set; } = "none";
    public bool sizeAutoCapable { get; set; } = true;
    public bool clipAlways { get; set; } = true;
    public bool normalizeRTL { get; set; } = true;
    public bool paddingAbsolute { get; set; } = true;
    public bool autoUpdate { get; set; } = false;
    public int autoUpdateInterval { get; set; } = 33;

    public WMBOSOverflowBehavior overflowBehavior { get; set; }
    public WMBOSNativeScrollbarsOverlaid nativeScrollbarsOverlaid  { get; set; }
    public WMBOSScrollbars scrollbars { get; set; }
    public WMBOSTextarea textarea { get; set; }

    public WMBOSConfigurations()
    {
        this.overflowBehavior = new WMBOSOverflowBehavior();
        this.nativeScrollbarsOverlaid = new WMBOSNativeScrollbarsOverlaid();
        this.scrollbars = new WMBOSScrollbars();
        this.textarea = new WMBOSTextarea();
    }
}

public class WMBOSNativeScrollbarsOverlaid
{
    public bool showNativeScrollbars { get; set; } = false;
    public bool initialize { get; set; } = true;
}

public class WMBOSOverflowBehavior 
{
    public string x { get; set; } = "scroll";
    public string y { get; set; } = "scroll";
}

public class WMBOSScrollbars 
{
    public string visibility { get; set; } = "auto";
    public string autoHide { get; set; } = "never";
    public int autoHideDelay { get; set; } = 800;
    public bool dragScrolling { get; set; } = true;
    public bool clickScrolling { get; set; } = false;
    public bool touchSupport { get; set; } = true;
    public bool snapHandle { get; set; } = false;
}

public class WMBOSTextarea 
{
    public bool dynWidth { get; set; } = false;
    public bool dynHeight { get; set; } = false;
    public string[] inheritedAttrs { get; set; } = {"style", "class"};
}