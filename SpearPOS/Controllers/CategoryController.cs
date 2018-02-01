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
        public GenericApiResponseWithResult<IEnumerable<CategoryListItem>> GetCategories()
        {
            var result = new GenericApiResponseWithResult<IEnumerable<CategoryListItem>>();
            var categoryItems = new List<CategoryListItem>();
            
            try
            {
                categoryItems = _context.ItemCategories.Select(category => new CategoryListItem { Id = category.Id, Beverage = category.Beverage, ButtonColor = category.ButtonColor, Name = category.Name, TextColor = category.TextColor }).ToList();

            }catch(Exception ex)
            {
                result.Success = false;
                result.Error = (int) ErrorCodes.InternalServerError;
                result.Message = ex.Message;
            }

            result.Success = true;
            result.Result = categoryItems.ToArray();
            return result;
        }

        [HttpPost("[action]")]
        public GenericApiResponseWithResult<CategoryListItem> SaveCategory([FromBody] CategoryListItem category)
        {
            var result = new GenericApiResponseWithResult<CategoryListItem>();
            var cat = new ItemCategory();
            result.Success = true;
            try
            {
                var itemExists = _context.ItemCategories.Count(x => x.Id == category.Id) > 0;
                if (!itemExists)
                {
                    category.CreationUserId = "oobeso";
                    category.CreationDate = DateTime.Now;
                    category.IsDeleted = false;
                    Sync(cat, category);
                    _context.Add(cat);
                }
                else
                {
                    cat = _context.ItemCategories.FirstOrDefault(x => x.Id == category.Id);
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
                result.Result = new CategoryListItem { Beverage = cat.Beverage, Id = cat.Id, ButtonColor = cat.ButtonColor, Name = cat.Name, TextColor = cat.TextColor  };

            return result;
        }

        private void Sync(ItemCategory category, CategoryListItem item)
        {
            category.TextColor = item.TextColor != null ? item.TextColor.Value : 0;
            category.Name = item.Name;
            category.Beverage = item.Beverage;
            category.ButtonColor = item.ButtonColor != null ? item.ButtonColor.Value : 0;
            category.CreationDate = item.CreationDate;
            category.CreationUserId = item.CreationUserId;
            category.IsDeleted = item.IsDeleted;
            category.SortOrder = item.SortOrder;
            category.UpdateDate = item.UpdateDate;
            category.UpdateUserId = item.UpdateUserId;
        }
    }
}
