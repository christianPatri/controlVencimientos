using IService.Sessions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace webApi.Filters
{
    public class AuthorizationAttributeFilter : Attribute, IAuthorizationFilter
    {
        private readonly ISessionService _sessionService;

        public AuthorizationAttributeFilter(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            string headerToken = context.HttpContext.Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(headerToken))
            {
                context.Result = new ContentResult()
                {
                    StatusCode = 401,
                    Content = "Usuario no logeado."
                };
            }
            else
            {
                try
                {
                    Guid token = Guid.Parse(headerToken);
                    if (!_sessionService.IsCorrectToken(token))
                    {
                        context.Result = new ContentResult()
                        {
                            StatusCode = 403,
                            Content = "Token invalido."
                        };
                    }
                }
                catch (FormatException)
                {
                    context.Result = new ContentResult()
                    {
                        StatusCode = 401,
                        Content = "Formato invalido de token"
                    };
                }
            }
        }
    }
}
