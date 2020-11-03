using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using dotnet_react_redux_deneme.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_react_redux_deneme.Data{
    public class ApplicationIdentityDbContext:IdentityDbContext<ApplicationUser>{

        public ApplicationIdentityDbContext(DbContextOptions<ApplicationIdentityDbContext> opt):base(opt){

        }
    }
}