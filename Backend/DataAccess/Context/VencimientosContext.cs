
using Domain.Enums;
using Domain.Products;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace DataAccess.Context
{
    public class VencimientosContext : DbContext
    {
        public DbSet<ProductSupplier> ProductSuppliers { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<ProductItem> ProductItems { get; set; }
        
        public DbSet<User> Users { get; set; }

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
            modelBuilder.Entity<ProductSupplier>()
            .HasKey(ps => ps.Id);

            modelBuilder.Entity<ProductSupplier>()
                .Property(ps => ps.VisitDays)
                .HasConversion(
                    v => string.Join(',', v.Select(d => d.ToString()).ToArray()),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(d => Enum.Parse<SupplierVisitDay>(d)).ToList());

            modelBuilder.Entity<ProductSupplier>()
                .HasMany(ps => ps.Products)
                .WithOne(p => p.Supplier)
                .HasForeignKey(p => p.SupplierId);

            modelBuilder.Entity<Product>()
            .HasMany(p => p.ProductItems)
            .WithOne(pi => pi.Product)
            .HasForeignKey(pi => pi.ProductId);

            modelBuilder.Entity<ProductItem>()
                .HasKey(pi => pi.Id);

            modelBuilder.Entity<ProductItem>()
                .Property(pi => pi.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => (ProductItemStatus)Enum.Parse(typeof(ProductItemStatus), v));

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion(
                    v => v.ToString(),
                    v => (UserRoles)Enum.Parse(typeof(UserRoles), v));
        }
    }
}
