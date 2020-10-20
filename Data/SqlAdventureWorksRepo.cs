using System;
using System.Collections.Generic;
using System.Linq;
using dotnet_react_redux_deneme.Models;

namespace dotnet_react_redux_deneme.Data{
    public class SqlAdventureWorksRepo : IAdventureWorksRepo
    {
        private readonly AdventureWorksContext _context;

        public SqlAdventureWorksRepo(AdventureWorksContext context)
        {
            _context=context;
        }

        public void createDepartment(Department department)
        {
            if(department==null){
                throw new ArgumentNullException(nameof(department));
            }
            _context.departments.Add(department);
        }

        public void deleteDepartment(Department department)
        {
            if(department==null){
                throw new ArgumentNullException(nameof(department));
            }
            _context.departments.Remove(department);
        }

        public IEnumerable<Department> getAllDepartments()
        {
            return _context.departments.ToList();
        }

        public Department getDepartmentById(int id)
        {
            return _context.departments.FirstOrDefault(p=>p.DepartmentId==id);
        }

        public bool saveChanges()
        {
            return (_context.SaveChanges()>=0);
        }

        public void updateDepartment(Department department)
        {
            var deptFromDbSet=_context.departments.FirstOrDefault(p=>p.DepartmentId==department.DepartmentId);

            
            deptFromDbSet.GroupName=department.GroupName;
            deptFromDbSet.Name=department.Name;
            deptFromDbSet.ModifiedDate=department.ModifiedDate;
            
        }
    }
}