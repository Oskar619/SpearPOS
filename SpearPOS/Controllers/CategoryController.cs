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
        public GenericApiResponseWithResult<IEnumerable<CategoryListItem>> GetCatergories()
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
        public GenericApiResponse SaveCategory([FromBody] RetailTicket ticketInfo, [FromBody] RetailTicketItem[] ticketItems)
        {
            var response = new GenericApiResponse();

            return response;
        }
    }
}
