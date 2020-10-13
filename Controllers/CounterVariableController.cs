using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.IO;

namespace dotnet_react_redux_deneme.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CounterVariableController : ControllerBase
    {
        private  CounterVariable obj=new CounterVariable();

        private readonly ILogger<CounterVariableController> _logger;

        public CounterVariableController(ILogger<CounterVariableController> logger)
        {
            _logger = logger;
            var folderDetails = "api\\db.json";
            var JSON = System.IO.File.ReadAllText(folderDetails);
            obj=JsonConvert.DeserializeObject<CounterVariable>(JSON);
        }

        [HttpGet]
        public int Get()
        {
            return obj.counter;
        }
        [HttpPut,]
        public ActionResult set([FromBody]CounterVariable count){
            obj.counter=count.counter;
            var folderDetails = "api\\db.json";
            var serjson=JsonConvert.SerializeObject(obj);
            System.IO.File.WriteAllText(folderDetails,serjson);

            return Ok();
        }
    }
}
