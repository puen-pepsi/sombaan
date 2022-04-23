using API.Entities;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class TechnicianRepository : ITechnicianRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TechnicianRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void addTechnician(Technician techinician)
        {
            _context.Add(techinician);
        }
    }
}