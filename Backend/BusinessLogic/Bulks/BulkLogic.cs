using Domain.Products;
using Dto.Bulks;
using Dto.Products.ProductItems;
using Dto.Products.Products;
using Dto.Products.ProductSuppliers;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Bulks
{
    public class BulkLogic
    {
        public BulkLogic() { }

        public SuppliersExcelUploadDto ReadSuppliersFromExcell(string fileRoute)
        {
            var excelUpload = new SuppliersExcelUploadDto();
            var productSuppliers = new List<ProductSupplierCreateDto>();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage(new FileInfo(fileRoute)))
            {
                var worksheet = package.Workbook.Worksheets.First();
                var rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    try
                    {
                        if(!string.IsNullOrEmpty(worksheet.Cells[row, 1].Text))
                        {
                            var supplier = new ProductSupplierCreateDto
                            {
                                Name = worksheet.Cells[row, 1].Text,
                                Description = worksheet.Cells[row, 2].Text,
                                Rut = worksheet.Cells[row, 3].Text,
                                Interval = int.Parse(worksheet.Cells[row, 4].Text),
                                VisitDays = ConvertStringToListInt(worksheet.Cells[row, 5].Text),
                                PhoneNumber = worksheet.Cells[row, 6].Text,
                                SecondaryPhoneNumber = worksheet.Cells[row, 7].Text,
                                Seller = worksheet.Cells[row, 8].Text,
                                ContactName = worksheet.Cells[row, 9].Text,
                            };

                            productSuppliers.Add(supplier);
                        }
                    }
                    catch(Exception ex)
                    {
                        excelUpload.RowsError.Add(row);
                        Console.WriteLine(  ex);
                    }
                }
            }

            excelUpload.SuppliersToCreate = productSuppliers;

            return excelUpload;
        }

        private List<int> ConvertStringToListInt(string input)
        {

            var splitted = input.Contains(".") ? input.Split('.') : input.Split(',');
            var list = new List<int>();

            foreach (var item in splitted)
            {
                list.Add(int.Parse(item));
            }

            return list;
        }

        public ProductsExcelUploadDto ReadProductsFromExcell(string fileRoute)
        {
            var excelUpload = new ProductsExcelUploadDto();
            var products = new List<ProductCreateDto>();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage(new FileInfo(fileRoute)))
            {
                var worksheet = package.Workbook.Worksheets.First();
                var rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    try
                    {
                        if (!string.IsNullOrEmpty(worksheet.Cells[row, 1].Text))
                        {
                            var product = new ProductCreateDto
                            {
                                Name = worksheet.Cells[row, 1].Text,
                                Description = worksheet.Cells[row, 2].Text,
                                BarCode = worksheet.Cells[row, 3].Text,
                                Code = int.Parse(worksheet.Cells[row, 4].Text),
                                AmountDaysPreviousNotification = int.Parse(worksheet.Cells[row, 5].Text),
                                SupplierRut = worksheet.Cells[row, 6].Text
                            };

                            products.Add(product);
                        }
                    }
                    catch (Exception ex)
                    {
                        excelUpload.RowsError.Add(row);
                        Console.WriteLine(ex);
                    }
                }
            }

            excelUpload.ProductsToCreate = products;
            return excelUpload;
        }

        public ProductItemsExcelUploadDto ReadProductItemsFromExcell(string fileRoute)
        {
            var excelUpload = new ProductItemsExcelUploadDto();
            var products = new ProductItemsGeneratorDto();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage(new FileInfo(fileRoute)))
            {
                var worksheet = package.Workbook.Worksheets.First();
                var rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    try
                    {
                        if (!string.IsNullOrEmpty(worksheet.Cells[row, 1].Text))
                        {
                            var product = new ProductItemCreateDto
                            {
                                Product = new ProductDto()
                                {
                                    Name = worksheet.Cells[row, 1].Text,
                                    BarCode = worksheet.Cells[row, 2].Text,
                                },
                                ProductCodeBar = worksheet.Cells[row, 2].Text,
                                ExpirationDate = ConvertStringToDate(worksheet.Cells[row, 3].Text),
                                Amount = int.Parse(worksheet.Cells[row, 4].Text),
                                IsFromExcel = true,
                                ExcelRow = row
                            };

                            products.ProductItemsCreate.Add(product);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                        excelUpload.RowsError.Add(row);
                    }
                }
            }

            excelUpload.ProductItemsGenerator = products;

            return excelUpload;
        }

        private DateTime ConvertStringToDate(string date)
        {
            var splitted = date.Split("-");
            var year = int.Parse(splitted[0]);
            var month = int.Parse(splitted[1]);
            var day = int.Parse(splitted[2]);

            return new DateTime(year, month, day);
        }

        public List<ProductItemCheckDto> ReadCheckProductsFromExcell(string fileRoute)
        {
            var productItems = new List<ProductItemCheckDto>();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage(new FileInfo(fileRoute)))
            {

                var worksheet = package.Workbook.Worksheets.First();
                var rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    try
                    {
                        if (!string.IsNullOrEmpty(worksheet.Cells[row, 1].Text))
                        {

                            var productItemCheck = new ProductItemCheckDto()
                            {
                                ProductItem = new ProductItemDto(),
                                User = new Dto.Users.UserDto()
                            };

                            var productItem = new ProductItemDto();

                            productItem.Product = new ProductDto();
                            productItem.Product.Name = worksheet.Cells[row, 1].Text;
                            var expirationDate = worksheet.Cells[row, 3].Text;
                            var splittedEd = expirationDate.Split("-");
                            productItem.ExpirationDate = new DateTime(int.Parse(splittedEd[2]), int.Parse(splittedEd[1]), int.Parse(splittedEd[0]));
                            productItem.CheckedDate = DateTime.Now;
                            var isChecked = worksheet.Cells[row, 5].Text.ToUpper();
                            productItem.Status = isChecked == "SI" ? 1 : 0 ;
                            productItem.AmountExpired = int.Parse(worksheet.Cells[row, 8].Text);

                            productItemCheck.ProductItem = productItem;

                            productItems.Add(productItemCheck);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }
                }
            }

            return productItems;
        }
    }
}
