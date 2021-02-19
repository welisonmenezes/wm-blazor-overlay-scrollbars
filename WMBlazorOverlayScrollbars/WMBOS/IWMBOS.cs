using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

public interface IWMBOS
{
    void Configure();
    Task Init(ElementReference element, WMBOSConfigurations configurations, Dictionary<string, string> callbacks);
    Task Destroy(string referenceId);
    Task Constroy(ElementReference element, WMBOSConfigurations configurations, Dictionary<string, string> callbacks);
    Task Update(string referenceId, bool force);
    Task Scroll(string referenceId, string x, string y, int duration);
    Task Scroll(string referenceId, int x, int y, int duration);
    Task Sleep(string referenceId);
    Task ScrollStop(string referenceId);
}
