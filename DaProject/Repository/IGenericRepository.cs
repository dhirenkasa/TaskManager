using DaProject.Utilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DaProject.Repository
{

    public interface IEntity
    {
        [Key]
        int Id { get; set; }
    }

    public interface IGenericRepository<T> where T : class
    {
        IEnumerable<T> Getall();
        T GetbyCondition(Expression<Func<T, bool>> expression);
        //IEnumerable<T> GetbyCondition(Expression expression);
        void Create(T entity);
        void Update(T entity);
        //void Delete(int id);
    }


    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected DaProjectDbContext _dbcontext { get; set; }

        // public int Id { get; set; }

        public GenericRepository(DaProjectDbContext dbcontext)
        {
            this._dbcontext = dbcontext;
        }

        public IEnumerable<T> Getall()
        {
            return _dbcontext.Set<T>().AsNoTracking();
        }

        public T GetbyCondition(Expression<Func<T, bool>> expression)
        {
            return _dbcontext.Set<T>().Where(expression).AsNoTracking().FirstOrDefault();
            //ParameterExpression pe = Expression.Parameter(typeof(int), "Id");
            //IQueryable<T> queryableData = _dbcontext.Set<T>().AsQueryable<T>();
            //MethodCallExpression whereCallExpression = Expression.Call(typeof(Queryable),"Where",new Type[] { queryableData.ElementType },queryableData.Expression,
            //Expression.Lambda<Func<string, bool>>(expression, new ParameterExpression[] { pe }));
            //return queryableData.Provider.CreateQuery<T>(whereCallExpression);
            //return .Provider.CreateQuery<T>() Where(expression);
        }

        public void Create(T entity)
        {
            _dbcontext.Set<T>().Add(entity);
            //_dbcontext.Set<T>().AddAsync(entity);
            _dbcontext.SaveChanges();
        }

        public void Update(T entity)
        {
            _dbcontext.Set<T>().Update(entity);
            //await _dbcontext.SaveChangesAsync();
            _dbcontext.SaveChanges();
        }

        //public void Delete(int id)
        //{
        //    //var param = Expression.Parameter(typeof(int), "Id");
        //    //var member = Expression.Property(param, "Id");
        //    //var constant = Expression.Constant(id);
        //    //var body = Expression.Equal(member, constant);
        //    //var expression = Expression.Lambda<Func<T, bool>>(body, param);
        //    //var entity = GetbyCondition(CommonFunction.GetExpressionCondition<T>(typeof(int), "Id", id)).FirstOrDefault();
        //    var model = _dbcontext.Set<T>().Where(x => x.)
        //    this._dbcontext.Set<T>().Remove(entity);
        //    //await _dbcontext.SaveChangesAsync();

        //}
    }
}
