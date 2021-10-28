using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WSPost.Dominio;

namespace WSPost.Data
{
    public class WSPostContext : DbContext
    {
        public WSPostContext (DbContextOptions<WSPostContext> options)
            : base(options)
        {
        }

        public DbSet<WSPost.Dominio.PostModel> PostModel { get; set; }
    }
}
