
using Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DataAccess.Context
{
    public class VencimientosContext : DbContext
    {
        public DbSet<ProductSupplier> ProductSuppliers { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<ProductItem> ProductItems { get; set; }

        public VencimientosContext(DbContextOptions options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string directory = Directory.GetCurrentDirectory();
                IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(directory)
                .AddJsonFile("appsettings.json")
                .Build();
                var connectionString = configuration.GetConnectionString(@"NicreVencimientosDb");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<HourlyClient>().HasKey(e => new { e.Ticket, e.Licenseplate });

            //modelBuilder.Entity<Ticket>().HasKey(e => e.Id);

            ////modelBuilder.Entity<Bill>().HasKey(b => b.BillNumber);

            //modelBuilder.Entity<BillNumber>().HasKey(e => e.Id);

            // Configuración de la relación uno a uno entre Bill y MonthlyClient
            //modelBuilder.Entity<Bill>()
            //    .HasOne(b => b.MonthlyClient)
            //    .WithMany(mc => mc.Bills)
            //    .HasForeignKey(b => b.MonthlyClientId);

        }
    }
}
