using Microsoft.Extensions.DependencyInjection;

public static class WMBOSExtensions
{
    public static IServiceCollection AddWMBOS(
        this IServiceCollection services,
        bool addJquery = true)
    {
        return services.AddScoped<IWMBOS>(p =>
        {
            var WMBOS = ActivatorUtilities.CreateInstance<WMBOSCore>(p);

            WMBOS.Configure();

            return WMBOS;
        });
    }
}