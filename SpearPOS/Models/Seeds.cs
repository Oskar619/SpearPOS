using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public static class Seeds
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new SpearPOSContext(
                serviceProvider.GetRequiredService<DbContextOptions<SpearPOSContext>>()))
            {
                // Look for any movies.

            }
        }

        public static void SeedModifiers(SpearPOSContext context)
        {
            if (context.ItemModifiers.Any())
            {
                return;
            }
            context.ItemModifiers.AddRange(
                    new ItemModifier
                    {
                        Id = null,
                        IsDeleted = false,
                        CreationDate = DateTime.Now,
                        UpdateDate = null,
                        CreationUserId = "seeds",
                        SortOrder = 0,
                        Name = "Item Modifier 1",
                        Price = 0,
                        ExtraPrice = 0,
                        ButtonColor = 0,
                        Enable = true,
                        TextColor = 0,
                        FixedPrice = true,
                        PrintToKitchen = true,
                        SectionWisePricing = false,
                        GroupId = 1,
                        TaxId = 0
                    },
                    new ItemModifier
                    {
                        Id = null,
                        IsDeleted = false,
                        CreationDate = DateTime.Now,
                        UpdateDate = null,
                        CreationUserId = "seeds",
                        SortOrder = 0,
                        Name = "Item Modifier 2",
                        Price = 0,
                        ExtraPrice = 0,
                        ButtonColor = 0,
                        Enable = true,
                        TextColor = 0,
                        FixedPrice = true,
                        PrintToKitchen = true,
                        SectionWisePricing = false,
                        GroupId = 1,
                        TaxId = 0
                    },
                    new ItemModifier
                    {
                        Id = null,
                        IsDeleted = false,
                        CreationDate = DateTime.Now,
                        UpdateDate = null,
                        CreationUserId = "seeds",
                        SortOrder = 0,
                        Name = "Item Modifier 3",
                        Price = 0,
                        ExtraPrice = 0,
                        ButtonColor = 0,
                        Enable = true,
                        TextColor = 0,
                        FixedPrice = true,
                        PrintToKitchen = true,
                        SectionWisePricing = false,
                        GroupId = 1,
                        TaxId = 0

                    }
                );

            context.SaveChanges();
        }

        public static void SeedCategories(SpearPOSContext context)
        {

        }

        public static void SeedGroups(SpearPOSContext context)
        {

        }

        public static void SeedMenuItems(SpearPOSContext context)
        {

        }

        public static void SeedTickets(SpearPOSContext context)
        {
            if (context.Tickets.Any())
            {
                return;   // DB has been seeded
            }

            context.Tickets.AddRange(
                 new Ticket
                 {

                 },

                 new Ticket
                 {

                 },

                 new Ticket
                 {

                 },

                 new Ticket
                 {
                 }
            );
            context.SaveChanges();
        }
    }
}
