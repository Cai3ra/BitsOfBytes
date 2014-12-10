using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JustHtml.Models
{
    public class Person
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
        public bool Active { get; set; }
    }
}