using Dto.Users;
using System;

namespace IService.Sessions
{
    public interface ISessionService
    {
        bool IsCorrectToken(Guid token);

        Guid Login(UserLoginDto userLoginDto);
    }
}
