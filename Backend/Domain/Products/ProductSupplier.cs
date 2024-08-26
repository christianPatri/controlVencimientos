using Domain.Enums;
using System;
using System.Collections.Generic;

namespace Domain.Products
{
    public class ProductSupplier
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Rut {  get; set; }

        public string Description { get; set; }

        public string PhoneNumber { get; set; }

        public string SecondaryPhoneNumber { get; set; }

        public string ContactName { get; set; } 

        public string Seller { get; set; }

        public List<Product> Products { get; set;}

        public int Interval { get; set; }

        public List<SupplierVisitDay> VisitDays { get; set; }

        public bool IsActive {  get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public ProductSupplier() { }

    }
}
