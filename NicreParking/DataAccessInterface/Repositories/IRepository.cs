using System;
using System.Collections.Generic;
using System.Linq;

namespace DataAccessInterface.Repositories
{
    public interface IRepository<T> : IDisposable where T : class
    {
        void AddAndSave(T entity);

        void AddAndSave(IList<T> entities);

        void Update(T entity);

        void Delete(T entity);

        IQueryable<T> List();

        IQueryable<T> IncludeAll(params string[] list);

    }
}
