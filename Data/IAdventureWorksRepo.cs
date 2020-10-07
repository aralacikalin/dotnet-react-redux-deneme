using System.Collections.Generic;
using dotnet_react_redux_deneme.Models;

namespace dotnet_react_redux_deneme.Data{
    public interface IAdventureWorksRepo{
        IEnumerable<HumanRecoursesDepartment> getAllDepartments();
        HumanRecoursesDepartment getDepartmentById(int id);
    }
}