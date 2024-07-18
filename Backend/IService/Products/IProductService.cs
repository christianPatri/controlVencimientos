﻿using Dto.Products.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Products
{
    public interface IProductService
    {
        ProductDto CreateProduct(ProductCreateDto productCreate);

        ProductDto GetProductByCodeBar(string codeBar);

        ProductDto DeleteProduct(ProductDto product);
    }
}
