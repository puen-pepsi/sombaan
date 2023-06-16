using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DetailTypesRepository : IDetailTypesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DetailTypesRepository(DataContext context,IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

            
        }
        public void addDetailType(MaintenanceDetailType detailType)
        {
            _context.MaintenanceDetailTypes.Add(detailType);
        }

        public void addDetailWithPrice(DetailTypeWithPrice detailTypeWithPrice)
        {
            _context.DetailtypewithPrices.Add(detailTypeWithPrice);
        }

        public void addRangeDetailType(List<MaintenanceDetailType> maintenanceDetailTypesList)
        {
            _context.MaintenanceDetailTypes.AddRange(maintenanceDetailTypesList);
        }

        public void deleteAllTypeId(int id)
        {
            var detailTypeGroup = _context.MaintenanceDetailTypes.Where(x => x.TechnicianTypeId == id);
            _context.RemoveRange(detailTypeGroup);
        }

        public void deleteDetailType(int id)
        {
            var detailType = _context.MaintenanceDetailTypes.Find( id);
            _context.Remove(detailType);

        }

        public void deleteDetailTypeWithPrice(int id)
        {
            var detialTypePrice  = _context.DetailtypewithPrices.FirstOrDefault(d=>d.MaintenanceDetailTypeId == id);
            _context.Remove(detialTypePrice);
        }

        public async Task<DetailTypeWithPrice> GetDetailTypePriceById(int id)
        {
            return await _context.DetailtypewithPrices
                        .FirstOrDefaultAsync(d => d.MaintenanceDetailTypeId == id);
        }

        public async Task<DetailTypeWithPrice> GetDetailTypeWithPrice(int id)
        {
            return await _context.DetailtypewithPrices
                          .Include(d => d.MaintenanceDetailType)
                          .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<MaintenanceDetailType> GetMaintenanceDetailType(string uuId)
        {
            return await _context.MaintenanceDetailTypes.FirstOrDefaultAsync(x => x.uuId == uuId);
        }

        public async Task<IEnumerable<DetailTypeWithPriceDto>> GetMaintenanceDetailTypeGroup(int typeId)
        {
           return await _context.MaintenanceDetailTypes
                         .Include(t => t.TechnicianType)
                         .Select(d => new DetailTypeWithPriceDto{
                            Id=d.Id,
                            uuId=d.uuId,
                            Details=d.Details,
                            TechnicianTypeId=d.TechnicianTypeId,
                            ParentId =d.ParentId,
                            Price = _context.DetailtypewithPrices
                                .FirstOrDefault(s => s.MaintenanceDetailTypeId == d.Id).Price,
                            Desc = _context.DetailtypewithPrices
                                .FirstOrDefault( s => s.MaintenanceDetailTypeId == d.Id).Desc
                            

                         })
                         .Where(x => x.TechnicianTypeId == typeId)
                         .ToListAsync();

        }

        public async Task<TechnicianType> GetTechnicianType(int id)
        {
            return await _context.TechnicianTypes
                        .Include(x => x.MaintenanceDetailTypes)
                        .ThenInclude( y => y.TechnicianType)
                        .FirstOrDefaultAsync(x => x.Id == id);
        }

        public void updateDetailTypeWithPrice(DetailTypeWithPrice detailTypeWithPrice)
        {
            _context.Entry(detailTypeWithPrice).State = EntityState.Modified;
        }
    }
}