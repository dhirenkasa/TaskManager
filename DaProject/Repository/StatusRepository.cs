using DaProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DaProject.Repository
{
    public interface IStatusRepository : IGenericRepository<Status>
    {
        IEnumerable<Status> GetStatusList();
    }

    public class StatusRepository : GenericRepository<Status>, IStatusRepository
    {
        public StatusRepository(DaProjectDbContext context) : base(context)
        {

        }

        public IEnumerable<Status> GetStatusList()
        {
            List<Status> statusList = Getall().OrderByDescending(c => c.StatusName).ToList();
            return statusList;
        }
    }
}
