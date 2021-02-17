public class WMBOSConfigurations
{
    public string className { get; set; } = "os-theme-dark";
    public string resize { get; set; } = "none";
    public bool sizeAutoCapable { get; set; } = true;
    public bool clipAlways { get; set; } = true;
    public bool normalizeRTL { get; set; } = true;
    public bool paddingAbsolute { get; set; } = true;
    public bool autoUpdate { get; set; } = false;
    public int autoUpdateInterval { get; set; } = 33;

    public WMBOSOverflowBehavior overflowBehavior { get; set; }

    public WMBOSConfigurations()
    {
        this.overflowBehavior = new WMBOSOverflowBehavior();
    }
}


public class WMBOSOverflowBehavior 
{
    public string x { get; set; } = "scroll";
    public string y { get; set; } = "scroll";
}