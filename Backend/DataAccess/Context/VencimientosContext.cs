using Domain.Bills;
using Domain.Clients;
using Domain.Settings.ConfigurationItems;
using Domain.Users;
using Domain.Vehicles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DataAccess.Context
{
    public class NicreParkingContext : DbContext
    {
        public DbSet<MonthlyClient> MonthlyClients { get; set; }

        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<HourlyClient> HourlyClients { get; set; }

        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<Bill> Bills { get; set; }

        public DbSet<BillNumber> BillsNumber { get; set; }

        public DbSet<MonthlyParkingLog> MonthlyParkingLogs { get; set; }

        public DbSet<ConfigurationItem> ConfigurationItems { get; set; }

        public NicreParkingContext(DbContextOptions options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string directory = Directory.GetCurrentDirectory();
                IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(directory)
                .AddJsonFile("appsettings.json")
                .Build();
                var connectionString = configuration.GetConnectionString(@"NicreParkingDb");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HourlyClient>().HasKey(e => new { e.Ticket, e.Licenseplate });

            modelBuilder.Entity<Ticket>().HasKey(e => e.Id);

            //modelBuilder.Entity<Bill>().HasKey(b => b.BillNumber);

            modelBuilder.Entity<BillNumber>().HasKey(e => e.Id);

            // Configuración de la relación uno a uno entre Bill y MonthlyClient
            //modelBuilder.Entity<Bill>()
            //    .HasOne(b => b.MonthlyClient)
            //    .WithMany(mc => mc.Bills)
            //    .HasForeignKey(b => b.MonthlyClientId);

        }
    }
}
