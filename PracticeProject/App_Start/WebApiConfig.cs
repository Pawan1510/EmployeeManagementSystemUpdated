using System.Net.Http.Formatting;
using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace EmpManagementSystem
{
	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
			// Web API configuration and services

			//UnityConfig.RegisterComponents();

			// Web API routes
			config.MapHttpAttributeRoutes();

    //        config.Routes.MapHttpRoute(
    //            name: "ValueApi",
				//routeTemplate: "api/myvalue/{id}",
    //            defaults: new { controller = "values", id = RouteParameter.Optional }
    //        );

            config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);

			JsonMediaTypeFormatter jsonMediaTypeFormatter = config.Formatters.JsonFormatter;
			jsonMediaTypeFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
		}
	}
}
