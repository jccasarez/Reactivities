using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        //Our class needs this constructor. We don't know need to put anything into it.
        public DataContext(DbContextOptions options): base(options)
        {
        }

        //DbSet is a table in the Db
        public DbSet<Activity> Activities { get; set; }
    }
}