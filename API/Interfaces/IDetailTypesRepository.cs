using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IDetailTypesRepository
    {
        Task<TechnicianType> GetTechnicianType(int id);
        Task<MaintenanceDetailType> GetMaintenanceDetailType(string uuId);
        Task<DetailTypeWithPrice> GetDetailTypePriceById(int id);
        // Task<IEnumerable<MaintenanceDetailType>> GetMaintenanceDetailTypeGroup(int typeId);
        Task<IEnumerable<DetailTypeWithPriceDto>> GetMaintenanceDetailTypeGroup(int typeId);
        Task<DetailTypeWithPrice> GetDetailTypeWithPrice(int id);
        void updateDetailTypeWithPrice(DetailTypeWithPrice detailTypeWithPrice);
        void addDetailType(MaintenanceDetailType detailType);
        void addRangeDetailType(List<MaintenanceDetailType> maintenanceDetailTypesList);
        void addDetailWithPrice(DetailTypeWithPrice detailTypeWithPrice);
        void deleteDetailType(int id);
        void deleteAllTypeId(int id);
        void deleteDetailTypeWithPrice(int id);
    }
}