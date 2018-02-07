using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using SpearPOS.Enums;
using SpearPOS.Models;
using SpearPOS.Models.ResponseModels;
using static SpearPOS.Models.ResponseModels.CategoryResponseModels;

namespace SpearPOS.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly SpearPOSContext _context;

        public CategoryController(SpearPOSContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public GenericApiResponseWithResult<IEnumerable<ItemCategory>> GetCategories()
        {
            var result = new GenericApiResponseWithResult<IEnumerable<ItemCategory>>();
            var categoryItems = new List<ItemCategory>();
            
            try
            {
                categoryItems = _context.ItemCategories.ToList();

            }catch(Exception ex)
            {
                result.Success = false;
                result.Error = (int) ErrorCodes.InternalServerError;
                result.Message = ex.Message;
            }

            result.Success = true;
            result.Result = categoryItems;
            return result;
        }

        [HttpPost("[action]")]
        public GenericApiResponseWithResult<ItemCategory> SaveCategory([FromBody] ItemCategory category)
        {
            var result = new GenericApiResponseWithResult<ItemCategory>();
            result.Success = true;
            try
            {
                var itemExists = _context.ItemCategories.Count(x => x.Id == category.Id) > 0;
                if (!itemExists)
                {
                    category.CreationUserId = "oobeso";
                    category.CreationDate = DateTime.Now;
                    category.IsDeleted = false;
                    _context.Add(category);
                }
                else
                {
                    var cat = _context.ItemCategories.FirstOrDefault(x => x.Id == category.Id);
                    category.UpdateDate = DateTime.Now;
                    category.UpdateUserId = "oobeso";
                    Sync(cat, category);
                }
                _context.SaveChanges();

            }catch(Exception ex)
            {
                result.Success = false;
                result.Error = (int)ErrorCodes.InternalServerError;
                result.Message = ex.Message;
            }

            if(result.Success)
                result.Result = category;

            return result;
        }

        private void Sync(ItemCategory category, ItemCategory item)
        {
            category.TextColor = item.TextColor;
            category.Name = item.Name;
            category.Beverage = item.Beverage;
            category.ButtonColor = item.ButtonColor;
            category.CreationDate = item.CreationDate;
            category.CreationUserId = item.CreationUserId;
            category.IsDeleted = item.IsDeleted;
            category.SortOrder = item.SortOrder;
            category.UpdateDate = item.UpdateDate;
            category.UpdateUserId = item.UpdateUserId;
        }
    }
}
