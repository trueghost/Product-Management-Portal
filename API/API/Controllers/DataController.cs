using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models;
namespace API.Controllers
{
    [RoutePrefix("Api/Data")]
    public class DataController : ApiController
    {
        Entities2 DB = new Entities2();

        [Route("Show")]
        [HttpGet]
        public object Showdata()
        {
            var a = DB.ProductFetch();
            return a;
        }

        [Route("Add")]
        [HttpPost]
        public object Add(Details sd)
        {
            var a = DB.ProductEntry(sd.Title, sd.Uniquecode, sd.CategoryId, sd.SubCategoryId, sd.ShortDescription, sd.Description, sd.Status);
            return a;
        }


        [Route("Update")]
        [HttpPut]
        public object Update(Details sd)
        {
            var a = DB.ProductUpdate(sd.ProductId,sd.Title, sd.Uniquecode, sd.CategoryId, sd.SubCategoryId, sd.ShortDescription, sd.Description);
            return a;
        }

        [Route("ShowCategory")]
        [HttpGet]
        public object ShowCategory()
        {
            var a = DB.CategoryFetch();
            return a;
        }

        [Route("ShowSubCategory")]
        [HttpGet]
        public object ShowSubCategory()
        {
            var a = DB.SubCategoryFetch();
            return a;
        }

        [Route("Status")]
        [HttpPost]
        public object Status(Details sd)
        {
            var a = DB.StatusChangeProduct(sd.ProductId, sd.Status);
            return a;
        }
    }

}