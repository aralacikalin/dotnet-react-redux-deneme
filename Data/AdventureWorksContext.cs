using dotnet_react_redux_deneme.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_react_redux_deneme.Data{
    public class AdventureWorksContext : DbContext
    {
        public AdventureWorksContext(DbContextOptions<AdventureWorksContext> opt) : base(opt)
        {

    }
        public DbSet<HumanRecoursesDepartment> departments {get;set;}
             protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HumanRecoursesDepartment>(entity =>
            {
               entity.Property(e => e.DepartmentID).HasColumnName("DepartmentID");
               entity.HasKey(entity=>entity.DepartmentID);
               entity.Property(e => e.Name).HasMaxLength(50).IsUnicode(false);
               entity.Property(e => e.GroupName).HasMaxLength(50).IsUnicode(false);
               entity.Property(e => e.ModifiedDate);
            });
        }
        
    }
}