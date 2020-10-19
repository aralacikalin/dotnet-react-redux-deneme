using System.Collections.Generic;
using dotnet_react_redux_deneme.Data;
using dotnet_react_redux_deneme.Models;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_react_redux_deneme.Controllers{

    [ApiController,Route("[controller]")]
    public class AdventureWorksController:ControllerBase{
        private readonly IAdventureWorksRepo _repo;

        public AdventureWorksController(IAdventureWorksRepo repo)
        {
            _repo=repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Department>> getAllDepartments(){
            var departments=_repo.getAllDepartments();
            return Ok(departments);
            
        }

        [HttpGet("{id}")]
        public ActionResult<Department> getDepartmentById(int id){
            var department=_repo.getDepartmentById(id);
            return Ok(department);
            
        }

        [HttpPost]
        public ActionResult<Department> createDepartment(Department department){
            _repo.createDepartment(department);
            _repo.saveChanges();
            return Ok(department);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteDepartment(int id){
            var departmentFromRepo=_repo.getDepartmentById(id);
            if(departmentFromRepo==null){
                return NotFound();
            }
            _repo.deleteDepartment(departmentFromRepo);
            _repo.saveChanges();
            return NoContent();
        }
    }
}