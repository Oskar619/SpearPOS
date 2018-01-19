using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpearPOS.Models;
using SpearPOS.Models.ResponseModels;

namespace SpearPOS.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TicketsController : Controller
    {
        private readonly SpearPOSContext _context;

        public TicketsController(SpearPOSContext context)
        {
            _context = context;
        }

        // GET: api/Tickets
        [HttpGet]
        public IEnumerable<Ticket> GetTickets()
        {
            return _context.Tickets;
        }

        [HttpGet("OpenTickets")]
        public IEnumerable<OpenTicketListItem> GetOpenTickets()
        {
            var query = (from t in _context.Tickets
                         where !t.Paid && !t.Settled && !t.Voided
                         select new OpenTicketListItem
                         {
                             Id = t.Id,
                             Settled = t.Settled,
                             Voided = t.Voided,
                             Paid = t.Paid,
                             SubTotal = t.SubTotal,
                             TotalDiscount = t.TotalDiscount,
                             TotalTax = t.TotalTax,
                             TotalPrice = t.TotalPrice,
                             PaidAmount = t.PaidAmount,
                             DueAmount = t.DueAmount,
                             GuestNumber = t.GuestNumber,
                             Status = t.Status,
                             CreationDate = t.CreationDate != DateTime.MinValue ? Convert.ToString(t.CreationDate) : "",
                             ClosingDate = t.ClosingDate != DateTime.MinValue ? Convert.ToString(t.ClosingDate) : "",
                             TableId = t.TableId

                         });

            return query.ToList();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ticket = await _context.Tickets.SingleOrDefaultAsync(m => m.Id == id);

            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        // PUT: api/Tickets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket([FromRoute] long id, [FromBody] Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ticket.Id)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tickets
        [HttpPost]
        public async Task<IActionResult> PostTicket([FromBody] Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ticket = await _context.Tickets.SingleOrDefaultAsync(m => m.Id == id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return Ok(ticket);
        }

        private bool TicketExists(long id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }
    }
}