using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models;
namespace API.Controllers
{
    [RoutePrefix("Api/Search")]
    public class SearchController : ApiController
    {
        Entities2 DB = new Entities2();

        [Route("Show")]
        [HttpGet]
        public object Showdata()
        {
            var a = DB.ProductFetch();
            return a;
        }

        [Route("Data")]
        [HttpPost]
        public object Add(Search sd)
        {
            var a = DB.ProductSearch(sd.Title);
            return a;
        }

    }

}