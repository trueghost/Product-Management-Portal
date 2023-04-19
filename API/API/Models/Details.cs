using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class Details
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string Uniquecode { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public byte Status { get; set; }

    }
}