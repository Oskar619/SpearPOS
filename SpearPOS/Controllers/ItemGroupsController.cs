using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpearPOS.Enums;
using SpearPOS.Models;
using SpearPOS.Models.ResponseModels;

namespace SpearPOS.Controllers
{
    [Produces("application/json")]
    [Route("api/ItemGroups")]
    public class ItemGroupsController : Controller
    {
        private readonly SpearPOSContext _context;

        public ItemGroupsController(SpearPOSContext context)
        {
            _context = context;
        }

        // GET: api/ItemGroups
        [HttpGet("[action]")]
        public GenericApiResponseWithResult<IEnumerable<ItemGroup>> GetGroups()
        {
            var result = new GenericApiResponseWithResult<IEnumerable<ItemGroup>>();
            var groupItems = new List<ItemGroup>();

            try
            {
                groupItems = _context.ItemGroups.ToList();

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Error = (int)ErrorCodes.InternalServerError;
                result.Message = ex.Message;
            }

            result.Success = true;
            result.Result = groupItems;
            return result;
        }

        [HttpPost("[action]")]
        public GenericApiResponseWithResult<ItemGroup> SaveGroup([FromBody] ItemGroup group)
        {
            var result = new GenericApiResponseWithResult<ItemGroup>();
            result.Success = true;
            try
            {
                var itemExists = _context.ItemGroups.Count(x => x.Id == group.Id) > 0;
                if (!itemExists)
                {
                    group.CreationUserId = "oobeso";
                    group.CreationDate = DateTime.Now;
                    group.IsDeleted = false;
                    _context.Add(group);
                }
                else
                {
                    var gr = _context.ItemGroups.FirstOrDefault(x => x.Id == group.Id);
                    group.UpdateDate = DateTime.Now;
                    group.UpdateUserId = "oobeso";
                    Sync(gr, group);
                }
                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Error = (int)ErrorCodes.InternalServerError;
                result.Message = ex.Message;
            }

            if (result.Success)
                result.Result = group;

            return result;
        }

        private void Sync(ItemGroup group, ItemGroup item)
        {
            group.TextColor = item.TextColor;
            group.Name = item.Name;
            group.CategoryId = item.CategoryId;
            group.ButtonColor = item.ButtonColor;
            group.CreationDate = item.CreationDate;
            group.CreationUserId = item.CreationUserId;
            group.IsDeleted = item.IsDeleted;
            group.SortOrder = item.SortOrder;
            group.UpdateDate = item.UpdateDate;
            group.UpdateUserId = item.UpdateUserId;
            group.TranslatedName = item.TranslatedName;
        }
    }
}