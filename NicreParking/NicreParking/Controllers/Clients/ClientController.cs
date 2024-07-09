using Common.Exceptions;
using Dto.Clients;
using IService.Clients;
using Microsoft.AspNetCore.Mvc;

namespace webApi.Controllers.Clients
{
    [ApiController]
    [Route("api/clients")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public IActionResult GetActiveClients()
        {
            var clients = _clientService.GetActiveClients();
            return Ok(clients);
        }

        [HttpGet("{clientId}")]
        public IActionResult Get(int clientId)
        {
            var client = _clientService.GetById(clientId);
            return Ok(client);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ClientCreateDto clientCreate)
        {
            try
            {
                var client = _clientService.Add(clientCreate);
                return Ok(client);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] ClientUpdateDto clientUpdate)
        {
            //Mejoras: Devolver un estado tambien, que diga cliente actualizado ?
            try
            {
                var client = _clientService.Update(clientUpdate);
                return Ok(client);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPut("DeleteClient")]
        public IActionResult Delete([FromBody] ClientDeleteDto clientDelete)
        {
            try
            {
                var client = _clientService.Delete(clientDelete);
                return Ok(client);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}
