using Dto.Users;
using System;

namespace IService.Sessions
{
    public interface ISessionService
    {
        bool IsCorrectToken(Guid token);

        UserDto Login(UserLoginDto userLoginDto);
    }
}
