using System.Threading.Tasks;
using dotnet_react_redux_deneme.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_react_redux_deneme.Controllers{
    [ApiController,Route("")]
    public class AuthorizationController:ControllerBase{

        private readonly SignInManager<ApplicationUser> signInManager;
        public AuthorizationController(SignInManager<ApplicationUser> _signInManager){
            signInManager=_signInManager;
        }

        [HttpPost("Authenticate")]
        public async Task<string> login(BasicUser user){
            var result = await signInManager.PasswordSignInAsync(user.UserName,user.Password,false,false);
            if(result.Succeeded){

            return user.UserName;
            }
            else{
                return null;
            }
        }

        [HttpGet("Logout")]
         public async Task<ActionResult> logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
            
        }


    }
}
        
