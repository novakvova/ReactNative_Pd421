using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WEB_API.DAL.Entities.Category
{
    public class CategoryEntity : BaseEntity<String>
    {
        public override String Id { get; set; } = Guid.NewGuid().ToString();

        public required String Name { get; set; }

        public String? Description { get; set; }

        public String? Image { get; set; }

    }
}

