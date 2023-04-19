using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class Data
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string UniqueCode { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }

    }
}