using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using JustHtml.Models;

namespace JustHtml.Controllers
{
    public class PersonController : ApiController
    {
        private readonly IList<Person> _referencedList;
        public PersonController()
        {
            _referencedList = MvcApplication.Persons;

            if (this._referencedList == null || this._referencedList.Count == 0)
            {
                this._referencedList.Add(
                    new Person 
                    {
                        ID = 1,
                        Name = "Lucas",
                        Age = 25,
                        Created = DateTime.Now,
                        Updated = null,
                        Active = true
                    }
                );
            }
        }

        // GET api/<controller>
        public IEnumerable<Person> Get()
        {
            return this._referencedList;
        }

        // GET api/<controller>/5
        public Person Get(int id)
        {
            return this._referencedList.FirstOrDefault(w => w.ID == id);
        }

        // POST api/<controller>
        public void Post([FromBody]Person value)
        {
            int maxId = this._referencedList.Max(p => p.ID);
            value.ID = ++maxId;
            this._referencedList.Add(value);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]Person value)
        {
            if (this._referencedList != null && this._referencedList.Count > 0)
            {
                var tempList = this._referencedList.ToList();
                int indexToUpdate = tempList.FindIndex(p => p.ID == id);

                if (indexToUpdate > -1)
                {
                    int tempId = this._referencedList[indexToUpdate].ID;
                    value.ID = tempId;
                    this._referencedList[indexToUpdate] = value;
                }
            }
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            if (this._referencedList != null && this._referencedList.Count > 0)
            {
                var tempList = this._referencedList.ToList();
                int indexToDelete = tempList.FindIndex(p => p.ID == id);

                if (indexToDelete > -1)
                {
                    this._referencedList.RemoveAt(indexToDelete);
                }
            }
        }
    }
}