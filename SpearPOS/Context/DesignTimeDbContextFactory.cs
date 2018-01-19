using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using SpearPOS.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Context
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<SpearPOSContext>
    {
        public SpearPOSContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<SpearPOSContext>();

            builder.UseSqlite(configuration.GetConnectionString("SpearPOSContext"));
            return new SpearPOSContext(builder.Options);
        }
    }
}
