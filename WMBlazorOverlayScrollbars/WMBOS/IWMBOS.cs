using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

public interface IWMBOS
{
    void Configure();
    Task Init(ElementReference element, WMBOSConfigurations configurations, Dictionary<string, string> callbacks);
}
