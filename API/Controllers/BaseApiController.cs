using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] //api/activities <- we should be hitting the endpoints
    public class BaseApiController : ControllerBase
    {
        
    }
}