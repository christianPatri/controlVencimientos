using BusinessLogic.Sessions;
using Common.Exceptions;
using Dto.Users;
using IService.Sessions;
using Microsoft.AspNetCore.Mvc;
using System;

namespace webApi.Controllers.Sessions
{
    [ApiController]
    [Route("api/sessions")]
    public class SessionController : ControllerBase
    {
        private readonly ISessionService _sessionService;

        public SessionController(ISessionService sessionService)
        {
            this._sessionService = sessionService;
        }

        /// <summary>
        /// Login the users.
        /// </summary>
        /// <param name="userLogin"></param>
        /// <response code="200">Returns the token for the session</response>
        /// <response code="404">If the user credentials are invalid</response>
        [HttpPost("Login")]
        [ProducesResponseType(typeof(Guid), 200)]
        public IActionResult Login([FromBody] UserLoginDto userLogin)
        {
            try
            {
                var user = this._sessionService.Login(userLogin);
                return Ok(user);
            }
            catch (ValidationException ve)
            {
                return NotFound(ve.Message);
            }
        }
    }
}
