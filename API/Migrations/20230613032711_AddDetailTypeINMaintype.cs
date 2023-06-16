using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddDetailTypeINMaintype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DetailtypewithPrices_MaintenanceDetailTypeId",
                table: "DetailtypewithPrices");

            migrationBuilder.CreateIndex(
                name: "IX_DetailtypewithPrices_MaintenanceDetailTypeId",
                table: "DetailtypewithPrices",
                column: "MaintenanceDetailTypeId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DetailtypewithPrices_MaintenanceDetailTypeId",
                table: "DetailtypewithPrices");

            migrationBuilder.CreateIndex(
                name: "IX_DetailtypewithPrices_MaintenanceDetailTypeId",
                table: "DetailtypewithPrices",
                column: "MaintenanceDetailTypeId");
        }
    }
}
