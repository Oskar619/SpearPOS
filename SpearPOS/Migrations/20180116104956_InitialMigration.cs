using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SpearPOS.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ActiveDate = table.Column<DateTime>(nullable: false),
                    AdvanceAmount = table.Column<double>(nullable: false),
                    BarTab = table.Column<bool>(nullable: false),
                    ClosingDate = table.Column<DateTime>(nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    CreationHour = table.Column<int>(nullable: false),
                    CustomerId = table.Column<int>(nullable: false),
                    CustomerPickup = table.Column<bool>(nullable: false),
                    DeliveryAddress = table.Column<string>(nullable: true),
                    DeliveryCharge = table.Column<double>(nullable: false),
                    DeliveryDate = table.Column<DateTime>(nullable: false),
                    DeliveryExtraInfo = table.Column<string>(nullable: true),
                    DrawerReseted = table.Column<bool>(nullable: false),
                    DriverId = table.Column<int>(nullable: false),
                    DueAmount = table.Column<double>(nullable: false),
                    GlobalId = table.Column<string>(nullable: true),
                    GratuityId = table.Column<int>(nullable: false),
                    GuestNumber = table.Column<int>(nullable: false),
                    IsReOpened = table.Column<bool>(nullable: false),
                    IsTaxExempt = table.Column<bool>(nullable: false),
                    OwnerId = table.Column<int>(nullable: false),
                    Paid = table.Column<bool>(nullable: false),
                    PaidAmount = table.Column<double>(nullable: false),
                    Refunded = table.Column<bool>(nullable: false),
                    ServiceCharge = table.Column<double>(nullable: false),
                    Settled = table.Column<bool>(nullable: false),
                    ShiftId = table.Column<int>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    SubTotal = table.Column<double>(nullable: false),
                    TableId = table.Column<long>(nullable: false),
                    TerminalId = table.Column<int>(nullable: false),
                    TicketType = table.Column<string>(nullable: true),
                    TotalDiscount = table.Column<double>(nullable: false),
                    TotalPrice = table.Column<double>(nullable: false),
                    TotalTax = table.Column<double>(nullable: false),
                    VoidByUser = table.Column<int>(nullable: false),
                    VoidReason = table.Column<string>(nullable: true),
                    Voided = table.Column<bool>(nullable: false),
                    Wasted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TicketItem",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Beverage = table.Column<bool>(nullable: false),
                    CategoryName = table.Column<string>(nullable: true),
                    Discount = table.Column<double>(nullable: false),
                    FractionalUnit = table.Column<bool>(nullable: false),
                    GroupName = table.Column<string>(nullable: true),
                    HasModifiers = table.Column<bool>(nullable: false),
                    InventoryHandled = table.Column<bool>(nullable: false),
                    ItemCount = table.Column<int>(nullable: false),
                    ItemId = table.Column<long>(nullable: false),
                    ItemName = table.Column<string>(nullable: true),
                    ItemPrice = table.Column<double>(nullable: false),
                    ItemQty = table.Column<double>(nullable: false),
                    ItemTaxRate = table.Column<double>(nullable: false),
                    ItemUnitName = table.Column<string>(nullable: true),
                    PrintToKitchen = table.Column<bool>(nullable: false),
                    PrintedToKitchen = table.Column<bool>(nullable: false),
                    PrinterGroupId = table.Column<int>(nullable: false),
                    SeatNumber = table.Column<int>(nullable: false),
                    SizeModifierId = table.Column<int>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    StockAmountAdjusted = table.Column<bool>(nullable: false),
                    SubTotal = table.Column<double>(nullable: false),
                    SubTotalWithoutModifiers = table.Column<double>(nullable: false),
                    TaxAmount = table.Column<double>(nullable: false),
                    TaxAmountWithoutModifiers = table.Column<double>(nullable: false),
                    TicketId = table.Column<long>(nullable: false),
                    TotalPrice = table.Column<double>(nullable: false),
                    TotalPriceWithoutModifiers = table.Column<double>(nullable: false),
                    TreatAsSeat = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketItem_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TicketItem_TicketId",
                table: "TicketItem",
                column: "TicketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TicketItem");

            migrationBuilder.DropTable(
                name: "Tickets");
        }
    }
}
