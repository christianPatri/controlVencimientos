using Common.Exceptions;
using Dto.Users;
using IService.Users;
using Microsoft.AspNetCore.Mvc;
using webApi.Filters;

namespace webApi.Controllers.Users
{
    [ServiceFilter(typeof(AuthorizationAttributeFilter))]
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        //Crear usuario admin
        //Eliminar usuario Admin
        //Editar usuario Admin
        //Listar usuarios admin
        //Buscar usuario Admin

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("ActiveUsers")]
        public IActionResult GetActiveUsers()
        {
            var users = _userService.GetActiveUsers();

            return Ok(users);
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var user = _userService.GetUserById(userId);

            return Ok(user);
        }


        [HttpPost]
        public IActionResult Post([FromBody] UserDto userCreate)
        {
            try
            {
                var user = _userService.CreateUser(userCreate);

                return Ok(user);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] UserDto userUpdate)
        {
            //Mejoras: Devolver un estado tambien, que diga usuario actualizado ?
            try
            {
                var user = _userService.UpdateUser(userUpdate);

                return Ok(user);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPut("DeleteUser")]
        public IActionResult Delete([FromBody] UserDto userDelete)
        {
            try
            {
                _userService.DeleteUser(userDelete);

                return Ok();
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}
