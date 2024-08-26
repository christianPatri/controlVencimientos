using DataAccessInterface.Repositories;
using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Calendar
{
    public class CalendarLogic
    {
        private IRepository<ProductItem> _productItemsRepository;

        public CalendarLogic(
            IRepository<ProductItem> productItemsRepository)
        {
            _productItemsRepository = productItemsRepository;
        }

        public List<ProductItem> GetExpirationsDay(DateTime date)
        {
            var productItems = _productItemsRepository.List().Where(pi =>
                pi.ExpirationDate.Year == date.Year && pi.ExpirationDate.Month == date.Month && pi.ExpirationDate.Day == date.Day
                && pi.IsActive);

            return productItems.ToList();
        }

        public List<ProductItem> GetNextExpirationsDay(DateTime date)
        {
            var newDate = date.AddDays(1);

            var productItems = _productItemsRepository.List().Where(pi =>
                pi.ExpirationDate.Year == newDate.Year && pi.ExpirationDate.Month == newDate.Month && pi.ExpirationDate.Day == newDate.Day
                && pi.IsActive);

            return productItems.ToList();
        }

        public List<ProductItem> GetNext2ExpirationsDay(DateTime date)
        {
            var newDate = date.AddDays(2);

            var productItems = _productItemsRepository.List().Where(pi =>
                pi.ExpirationDate.Year == newDate.Year && pi.ExpirationDate.Month == newDate.Month && pi.ExpirationDate.Day == newDate.Day
                && pi.IsActive);

            return productItems.ToList();
        }

        public bool IsToday(DateTime date)
        {
            var today = DateTime.Now;

            return today.Year == date.Year && today.Month == date.Month && today.Day == date.Day;
        }

        public List<ProductItem> GetUncheckedExpirations(DateTime date)
        {
            var productItems = _productItemsRepository.List().Where(pi =>
                pi.ExpirationDate.Year <= date.Year && pi.ExpirationDate.Month <= date.Month && pi.ExpirationDate.Day < date.Day
                && pi.IsActive);

            return productItems.ToList();
        }
    }
}
