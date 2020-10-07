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
        public ActionResult<IEnumerable<HumanRecoursesDepartment>> getAllDepartments(){
            var departments=_repo.getAllDepartments();
            return Ok(departments);
            
        }

        [HttpGet("{id}")]
        public ActionResult<HumanRecoursesDepartment> getDepartmentById(int id){
            var department=_repo.getDepartmentById(id);
            return Ok(department);
            
        }
    }
}