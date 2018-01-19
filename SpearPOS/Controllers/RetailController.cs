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

namespace SpearPOS.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class RetailController : Controller
    {
        private readonly SpearPOSContext _context;

        public RetailController(SpearPOSContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<RetailCategoryListItem> GetRetailData(string ticketType)
        {
            var categoriesResult = new List<RetailCategoryListItem>();
            foreach (var category in _context.ItemCategories)
            {
                var categoryResult = new RetailCategoryListItem();
                categoryResult.Id = category.Id;
                categoryResult.Name = category.Name;
                categoryResult.ButtonColor = category.ButtonColor;
                categoryResult.Beverage = category.Beverage;
                categoryResult.TextColor = category.TextColor;

                var groupsResult = new List<RetailGroupListItem>();

                var groups = _context.ItemGroups.Where(x => x.CategoryId == category.Id);

                foreach (var group in groups)
                {
                    var groupResult = new RetailGroupListItem();
                    groupResult.Id = group.Id;
                    groupResult.Name = group.Name;
                    groupResult.CategoryId = group.CategoryId;
                    groupResult.ButtonColor = group.ButtonColor;
                    groupResult.TextColor = group.TextColor;
                    groupResult.SortOrder = group.SortOrder;

                    var itemsResult = new List<RetailItemListItem>();
                    var items = _context.RetailItems.Where(x => x.GroupId == group.Id);

                    foreach (var item in items)
                    {
                        var itemResult = new RetailItemListItem();
                        itemResult.Id = item.Id;
                        itemResult.Description = item.Description;
                        itemResult.Cost = item.BuyPrice;
                        itemResult.SortOrder = item.SortOrder;

                        var modifierGroups = _context.ItemModifierGroupItems.Where(x => x.RetailItemId == item.Id)
                                                .Join(_context.ItemModifierGroups, relation => relation.ItemModifierGroupId, grp => grp.Id, (rel, grp) => grp);
                        var modifierGroupsResult = new List<RetailItemModifierGroup>();

                        foreach (var modGroup in modifierGroups)
                        {
                            var modifierGroupResult = new RetailItemModifierGroup();
                            modifierGroupResult.Id = modGroup.Id;
                            modifierGroupResult.Name = modGroup.Name;
                            modifierGroupResult.Required = modGroup.Required;
                            modifierGroupResult.WorkflowOrder = modGroup.SortOrder;

                            var modifiers = _context.ItemModifiers.Where(x => x.GroupId == modGroup.Id);
                            var modifiersResult = new List<RetailItemModifier>();

                            foreach (var modifier in modifiers)
                            {
                                var modifierResult = new RetailItemModifier();
                                modifierResult.Id = modifier.Id;
                                modifierResult.Name = modifier.Name;
                                modifierResult.Cost = modifier.Price;
                                modifierResult.SortOrder = modifier.SortOrder;

                                modifiersResult.Add(modifierResult);

                            }
                            modifierGroupResult.Modifiers = modifiersResult.ToArray();
                            modifierGroupsResult.Add(modifierGroupResult);

                        }

                        itemResult.ModifierGroups = modifierGroupsResult.ToArray();
                        itemsResult.Add(itemResult);
                    }
                    groupResult.Items = itemsResult.ToArray();
                    groupsResult.Add(groupResult);
                }
                categoryResult.Groups = groupsResult.ToArray();
                categoriesResult.Add(categoryResult);
            }

            return categoriesResult.ToArray();
        }

        [HttpPost("[action]")]
        public GenericApiResponse SaveRetail([FromBody] RetailTicket ticketInfo, [FromBody] RetailTicketItem[] ticketItems)
        {
            var response = new GenericApiResponse();

            var ticket = _context.Tickets.FirstOrDefault(x => x.Id == ticketInfo.Id);

            if(ticket == null)
            {
                response.Success = false;
                response.Error = (int)ErrorCodes.RetailScreenNotFoundTicket;
                response.Message = ErrorMessages.RetailScreenNotFoundTicket;
                return response;
            }

            ticket.Paid = ticketInfo.Paid;
            ticket.PaidAmount = ticketInfo.PaidAmount;
            ticket.ClosingDate = Convert.ToDateTime(ticketInfo.ClosingDate);
            ticket.CreationDate = Convert.ToDateTime(ticketInfo.CreationDate);
            ticket.DueAmount = ticketInfo.DueAmount;
            ticket.SubTotal = ticketInfo.SubTotal;
            ticket.Settled = ticketInfo.Settled;
            ticket.Status = ticketInfo.Status;
            ticket.TableId = ticketInfo.TableId;
            ticket.TotalDiscount = ticketInfo.TotalDiscount;
            ticket.TotalPrice = ticketInfo.TotalPrice;
            ticket.TotalTax = ticketInfo.TotalTax;
            ticket.Voided = ticketInfo.Voided;
            ticket.VoidByUser = ticketInfo.VoidedByUser;
            ticket.VoidReason = ticketInfo.VoidedReason;

            var currentTicketItems = _context.TicketItems.Where(x => x.TicketId == ticket.Id);

            foreach(var ticketItem in ticketItems)
            {
                var currentTicketItem = currentTicketItems.FirstOrDefault(x => x.Id == ticketItem.Id);
                if(currentTicketItem == null)
                {
                    var item = new TicketItem();
                    SyncTicketItem(item, ticketItem);
                    _context.TicketItems.Add(item);
                    continue;
                }

                SyncTicketItem(currentTicketItem, ticketItem);
            }

            _context.SaveChanges();
            response.Success = true;
            return response;
        }

        [HttpGet("[action]/{ticketId}")]
        public IEnumerable<RetailTicketItem> GetTicketItems(long ticketId)
        {
            var result = new List<RetailTicketItem>();
            var tickets = _context.TicketItems.Where(x => x.TicketId == ticketId).Select(x =>
            new RetailTicketItem
            {
                Id = x.Id,
                ItemId = x.ItemId,
                Printed = x.PrintedToKitchen,
                Paid = x.Paid,
                Price = x.ItemPrice,
                Delivered = x.Delivered,
                Voided = x.Voided,
                Beverage = x.Beverage,
                GroupName = x.GroupName,
                CategoryName = x.CategoryName,
                Modifiers = _context.TicketItemModifiers.Where(y => y.TicketItemId == x.Id).Select(s => new RetailTicketItemModifier{
                    Id = s.Id,
                    TicketId = x.Id,
                    TicketItemId = s.TicketItemId,
                    ModifierCost = s.ModifierPrice,
                    ModifierName = s.ModifierName
                }).ToList().ToArray(),
                Discount = x.Discount,
                ItemName = x.ItemName,
                ItemPrice = x.ItemPrice,
                ItemTaxRate = x.ItemTaxRate,
                ItemUnitName = x.ItemUnitName,
                Print = x.PrintToKitchen,
                PrinterGroupId = x.PrinterGroupId,
                SeatNumber = x.SeatNumber,
                Status = x.Status,
                TotalPrice = x.TotalPrice,
                TotalPriceWithoutModifiers = x.TotalPriceWithoutModifiers
            });
            result = tickets.ToList();
            
            return result;
        }
 
        [HttpGet("[action]/ticketType/tableId")]
        public RetailTicket Create(string ticketType, int tableId)
        {
            var ticket = new Ticket();
            var retailTicket = new RetailTicket();

            switch (ticketType)
            {
                case "DINE_IN":
                    ticket.TableId = tableId;
                    ticket.CreationDate = DateTime.Now;
                    ticket.TicketType = ticketType;
                    _context.Tickets.Add(ticket);
                    _context.SaveChanges();
                    retailTicket.Id = ticket.Id;
                    retailTicket.CreationDate = ticket.CreationDate.ToString();
                    retailTicket.TicketType = ticket.TicketType;

                    break;

                case "TAKE_OUT":
                    //TODO: Implement Take Out Type Creation.
                    break;

                case "RETAIL":
                    //TODO: Implement Retail Type Creation.
                    break;
            }

            return retailTicket;
        }

        public void SyncTicketItem(TicketItem item, RetailTicketItem ticketItem)
        {
            item.Id = ticketItem.Id;
            item.HasModifiers = ticketItem.Modifiers != null || ticketItem.Modifiers.Length == 0;
            item.Beverage = ticketItem.Beverage;
            item.GroupName = ticketItem.GroupName;
            item.CategoryName = ticketItem.CategoryName;
            item.Discount = ticketItem.Discount;
            item.ItemId = ticketItem.ItemId;
            item.ItemName = ticketItem.ItemName;
            item.ItemPrice = ticketItem.ItemPrice;
            item.ItemTaxRate = ticketItem.ItemTaxRate;
            item.ItemUnitName = ticketItem.ItemUnitName;
            item.PrintedToKitchen = ticketItem.Printed;
            item.PrintToKitchen = ticketItem.Print;
            item.PrinterGroupId = ticketItem.PrinterGroupId;
            item.SeatNumber = ticketItem.SeatNumber;
            item.Status = ticketItem.Status;
            item.TotalPrice = ticketItem.TotalPrice;
            item.TotalPriceWithoutModifiers = ticketItem.TotalPriceWithoutModifiers;
            item.Paid = ticketItem.Paid;
            item.Price = ticketItem.Price;
            item.Delivered = ticketItem.Delivered;
            item.Voided = ticketItem.Voided;
        }
    }
}
