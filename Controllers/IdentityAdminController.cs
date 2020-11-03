using System.Threading.Tasks;
using dotnet_react_redux_deneme.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_react_redux_deneme.Controllers{
    [ApiController,Route("")]
    public class IdentityAdminController:ControllerBase{
        
        private UserManager<ApplicationUser> userManager;
        private RoleManager<IdentityRole> roleManager;

        public IdentityAdminController(UserManager<ApplicationUser> _userManager,RoleManager<IdentityRole> _roleManager){
            userManager=_userManager;
            roleManager=_roleManager;
        }

        [HttpPost("user/create")]
        public async Task<ActionResult> create(BasicUser user){

            

            ApplicationUser user1=new ApplicationUser();
            user1.UserName=user.UserName;

            var result=await userManager.CreateAsync(user1,user.Password);
            

            return Ok();

        }
        [HttpPost("role/create")]
        public async Task<ActionResult> createRole(UserRole role){

            IdentityResult roleResult;
            var roleCheck=await roleManager.RoleExistsAsync(role.Role);
            if(!roleCheck){
                roleResult=await roleManager.CreateAsync(new IdentityRole(role.Role));
            }

            return Ok();

        }

        [HttpPost("role/assign")]
        public async Task<ActionResult> assignRole(UserRole m){

            var roleCheck=await roleManager.RoleExistsAsync(m.Role);
            if(roleCheck){
                ApplicationUser user= await userManager.FindByNameAsync(m.UserName);
                await userManager.AddToRoleAsync(user,m.Role);
            }

            return Ok();

        }

    }
}