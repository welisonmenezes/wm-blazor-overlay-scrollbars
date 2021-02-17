using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

public sealed class WMBOSCore: IWMBOS
{
    private readonly IJSRuntime jsRuntime;
    private Task<IJSObjectReference> _module;
    private Task<IJSObjectReference> Module => _module ??= jsRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/WMBlazorOverlayScrollbars/wm-blazor-overlay-scrollbars.js").AsTask();
    private ElementReference element;

    public WMBOSCore(IJSRuntime jsRuntime)
    {
        this.jsRuntime = jsRuntime;
    }

    public void Configure()
    {
        //System.Console.WriteLine("Configure BlazorOverlayScrollbars");
    }

    public async Task Init(ElementReference element, WMBOSConfigurations configurations)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBOSInit", element, configurations);
        this.element = element;
    }
}
