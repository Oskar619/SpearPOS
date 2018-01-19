using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace SpearPOS.Models
{
    public class SpearPOSContext : DbContext
    {
        public SpearPOSContext(DbContextOptions<SpearPOSContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            IConfigurationRoot configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();
            var builder = new DbContextOptionsBuilder<SpearPOSContext>();

            builder.UseSqlite(configuration.GetConnectionString("SpearPOSContext"));

        }


        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<ItemGroup> ItemGroups { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<ItemModifierGroup> ItemModifierGroups { get; set; }
        public DbSet<ItemModifier> ItemModifiers { get; set; }
        public DbSet<ItemModifierGroupItem> ItemModifierGroupItems { get; set; }
        public DbSet<RetailItem> RetailItems { get; set; }
        public DbSet<TicketItem> TicketItems { get; set; }
        public DbSet<TicketItemModifier> TicketItemModifiers {get; set;}
    }
}
