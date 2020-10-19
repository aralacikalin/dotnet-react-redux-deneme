using System.Collections.Generic;
using dotnet_react_redux_deneme.Models;

namespace dotnet_react_redux_deneme.Data{
    public interface IAdventureWorksRepo{
        IEnumerable<Department> getAllDepartments();
        Department getDepartmentById(int id);
        void createDepartment(Department department);
        bool saveChanges();
        void deleteDepartment(Department department);
    }
}