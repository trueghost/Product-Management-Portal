using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class Images
    {
        public int ImageId { get; set; }
        public int ProductId { get; set; }
        public string ImageName { get; set; }
        public string ImageUrl { get; set; }
    }
}