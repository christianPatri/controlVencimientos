using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Bills
{
    public class BillCreateDto
    {

        public int MonthlyClientId { get; set; }

        //Acabo de generar al cliente mensual y quiero hacer la factura inicial
        public bool IsNewMonthlyClient { get; set; }


        public BillCreateDto() { }
    }
}
