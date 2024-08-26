using IService.Sessions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using BusinessLogic.Sessions;
using Dto.Users;

namespace Services.Sessions
{
    public class SessionService : ISessionService
    {
        private readonly IMapper _mapper;
        private readonly SessionLogic _sessionLogic;

        public SessionService(IMapper mapper, SessionLogic sessionLogic)
        {
            this._mapper = mapper;
            this._sessionLogic = sessionLogic;
        }

        public bool IsCorrectToken(Guid token)
        {
            var isCorrectToken = _sessionLogic.IsCorrectToken(token);

            return isCorrectToken;
        }

        public UserDto Login(UserLoginDto userLoginDto)
        {
            _sessionLogic.ValidateLogin(userLoginDto);
            var user = _sessionLogic.SearchUser(userLoginDto);
            _sessionLogic.ValidateExistingUser(user);

            return _mapper.Map<UserDto>(user);
        }
    }
}
