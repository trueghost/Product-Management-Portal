using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models;
namespace API.Controllers
{
    [RoutePrefix("Api/Image")]
    public class ImageController : ApiController
    {
        Entities2 DB = new Entities2();

        [Route("Show")]
        [HttpGet]
        public object Showdata()
        {
            var a = DB.ImageFetch();
            return a;
        }

        [Route("Product")]
        [HttpGet]
        public object ShowProductId()
        {
            var a = DB.FetchLastProductId();
            return a;
        }

        [Route("Data")]
        [HttpPost]
        public object Add(Images sd)
        {
            var a = DB.AddImages(sd.ProductId , sd.ImageName , sd.ImageUrl);
            return a;
        }

        [Route("Delete")]
        [HttpPost]
        public object Delete(Images sd)
        {
            var a = DB.DeleteImages(sd.ImageId);
            return a;
        }

    }

}