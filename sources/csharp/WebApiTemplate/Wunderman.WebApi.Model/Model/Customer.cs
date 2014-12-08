using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace Wunderman.WebApi.Model
{
    [Table("Customer")]
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        
        //[XmlIgnore, JsonIgnore]
        public string User { get; set; }
        
        //[XmlIgnore, JsonIgnore]
        public string Password { get; set; }
        
        public int Age { get; set; }
    }
}
