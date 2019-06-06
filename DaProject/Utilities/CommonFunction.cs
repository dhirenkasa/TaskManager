using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;


namespace DaProject.Utilities
{
    public static class CommonFunction
    {
        //public static Expression GetExpressionCondition<T>(string parameterName,object value)
        //{

        //    ParameterExpression pe = Expression.Parameter(value.GetType(), parameterName);
        //    //Expression left = Expression.Call(pe, value.GetType().GetMethod("ToLower", System.Type.EmptyTypes));
        //    Expression left = Expression.Call(pe, value.GetType().GetMethod("ToInt32", new Type() { GetType(Object) }));
        //    Expression right = Expression.Constant(value);
        //    Expression e1 = Expression.Equal(left, right);
        //    return e1;
        //    //ParameterExpression entity = Expression.Parameter(value.GetType(), parameterName);
        //    //Expression keyValue = Expression.Invoke(this.pkFieldExpression, entity);
        //    //Expression pkValue = Expression.Constant(Pk, keyValue.Type);
        //    //Expression body = Expression.Equal(keyValue, pkValue);
        //    //return Expression.Lambda<Func<TEntity, bool>>(body, entity);
        //    //var param = Expression.Parameter(value.GetType(), parameterName);
        //    //var member = Expression.Property(param, parameterName);
        //    //var constant = Expression.Constant(value);
        //    //var body = Expression.Equal(member, constant);
        //    //var expression = Expression.Lambda<Func<T, bool>>(body, param);
        //    //return expression;
        //}
        public static List<KeyValuePair<int, string>> GetKeyValueFromEnum<T>()
        {
            List<KeyValuePair<int, string>> list = new List<KeyValuePair<int, string>>();
            foreach (var e in Enum.GetValues(typeof(T)))
            {
                list.Add(new KeyValuePair<int, string>((int)e, e.ToString()));
            }
            return list;
        }

    }
    public enum ProjectStatus
    {
        NotStarted = 1,
        Started = 2,
        InProgress = 3,
        Completed = 4,
        Hold = 5
    }

}
