using dotnet_react_redux_deneme.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_react_redux_deneme.Data{
    public class AdventureWorksContext : DbContext
    {
        public AdventureWorksContext(DbContextOptions<AdventureWorksContext> opt) : base(opt)
        {

    }
        public DbSet<Department> departments {get;set;}
             protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*
            modelBuilder.Entity<Department>(entity =>
            {
               entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
               entity.HasKey(e=>e.DepartmentId);
               entity.Property(e => e.Name).HasMaxLength(50).IsUnicode(false);
               entity.Property(e => e.GroupName).HasMaxLength(50).IsUnicode(false);
               entity.Property(e => e.ModifiedDate);
            });
            */
            modelBuilder.Entity<Department>(entity =>
            {
                entity.ToTable("Department", "HumanResources");

                entity.HasComment("Lookup table containing the departments within the Adventure Works Cycles company.");

                entity.HasIndex(e => e.Name)
                    .HasName("AK_Department_Name")
                    .IsUnique();

                entity.Property(e => e.DepartmentId)
                    .HasColumnName("DepartmentID")
                    .HasComment("Primary key for Department records.");

                entity.Property(e => e.GroupName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasComment("Name of the group to which the department belongs.");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())")
                    .HasComment("Date and time the record was last updated.");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasComment("Name of the department.");
            });
           
        }
        
    }
}