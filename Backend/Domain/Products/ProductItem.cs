using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{
    public  class ProductItem
    {
        public Product Product { get; set; }

        public int ProductId { get; set; }

        public int Id { get; set; }

        public DateTime EntryDate { get; set; }

        public DateTime ExpirationDate { get; set; }

        public int Amount { get; set; }

        public ProductItemStatus Status { get; set; }

        public bool IsActive { get; set; }

        public DateTime CheckedDate { get; set; }

        public int AmountExpired { get; set; }

        public ProductItem() { }
    }
}
