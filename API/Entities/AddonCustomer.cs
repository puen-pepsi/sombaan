using System.Collections.Generic;

namespace API.Entities
{
    public class AddonCustomer{
        public int Id { get; set; }
        public string Name { get; set; }
        public string Descriptions{ get; set; }
        public int  Price { get; set; }
        public int AddonStateId { get; set; }
        public AddonState AddonState { get; set; }

    }
}
