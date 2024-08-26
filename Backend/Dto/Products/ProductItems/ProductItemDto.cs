using Dto.Products.Products;
using Dto.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Products.ProductItems
{
    public class ProductItemDto
    {
        public ProductDto Product { get; set; }

        public int ProductId { get; set; }

        public int Id { get; set; }

        public DateTime EntryDate { get; set; }

        public DateTime ExpirationDate { get; set; }

        public int Amount { get; set; }

        public int Status { get; set; }

        public bool IsActive { get; set; }

        public DateTime CheckedDate { get; set; }

        public int AmountExpired { get; set; }

        public UserDto CheckedBy { get; set; }

        public ProductItemDto() { }
    }
}