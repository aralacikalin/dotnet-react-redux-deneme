using System.Collections.Generic;
using dotnet_react_redux_deneme.Data;
using dotnet_react_redux_deneme.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_react_redux_deneme.Controllers{

    [ApiController,Route("api/[controller]")]
    [Authorize(Roles="admin")]

    public class AdventureWorksController:ControllerBase{
        private readonly IAdventureWorksRepo _repo;

        public AdventureWorksController(IAdventureWorksRepo repo)
        {
            _repo=repo;
        }

        [HttpGet]
        public IEnumerable<Department> getAllDepartments(){
            var departments=_repo.getAllDepartments();
            return departments;
            
        }

        [HttpGet("{id}")]
        public Department getDepartmentById(int id){
            var department=_repo.getDepartmentById(id);
            return department;
            
        }

        [HttpPost("create")]
        public Department createDepartment(Department department){
            _repo.createDepartment(department);
            _repo.saveChanges();
            return department;
        }

        [HttpPut("edit/{id}")]
        public int updateDepartment(int id, Department department){
            var deptFromRepo=_repo.getDepartmentById(id);
            _repo.updateDepartment(department);
            _repo.saveChanges();
            return 1;
        }

        [HttpDelete("delete/{id}")]
        public int DeleteDepartment(int id){
            var departmentFromRepo=_repo.getDepartmentById(id);
            _repo.deleteDepartment(departmentFromRepo);
            _repo.saveChanges();
            return 1;
        }
    }
}