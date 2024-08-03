using Dto.Products.Products;
using System;
using System.Collections.Generic;
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

        //status : Activo - Vencido - Revisado.

        public int AmountExpired { get; set; }

        public ProductItemDto() { }
    }
}
