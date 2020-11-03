using System.Threading.Tasks;
using dotnet_react_redux_deneme.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_react_redux_deneme.Controllers{
    [ApiController,Route("user")]
    public class IdentityAdminController:ControllerBase{
        
        private UserManager<ApplicationUser> userManager;

        public IdentityAdminController(UserManager<ApplicationUser> _userManager){
            userManager=_userManager;
        }

        [HttpPost("create")]
        public async Task<ActionResult> create(BasicUser user){

            

            ApplicationUser user1=new ApplicationUser();
            user1.UserName=user.UserName;

            var result=await userManager.CreateAsync(user1,user.Password);
            

            return Ok();

        }

    }
}