using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using WMBlazorOverlayScrollbars.WMBOS;

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

    public async Task Init(ElementReference element, WMBOSConfigurations configurations, Dictionary<string, string> callbacks)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBOSInit", element, configurations, callbacks);
        this.element = element;
    }

    public async Task Destroy(string referenceId)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBOSDestroy", referenceId);
    }

    public async Task Constroy(ElementReference element, WMBOSConfigurations configurations, Dictionary<string, string> callbacks)
    {
        await this.Init(element, configurations, callbacks);
    }

    public async Task Update(string referenceId, bool force)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBOSUpdate", referenceId, force);
    }

    public async Task Scroll(string referenceId, string x, string y, int duration)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBOSScroll", referenceId, x, y, duration);
    }

    public async Task Scroll(string referenceId, int x, int y, int duration)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBOSScroll", referenceId, x, y, duration);
    }

    public async Task Sleep(string referenceId)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBOSSleep", referenceId);
    }

    public async Task ScrollStop(string referenceId)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBOSScrollStop", referenceId);
    }
}
