using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DaProject.Models
{
    public class CommonModel
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public dynamic Data { get; set; }
    }
}
