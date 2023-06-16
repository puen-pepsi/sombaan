using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class DetailWithPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DetailtypewithPrices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Price = table.Column<double>(type: "REAL", nullable: false),
                    Desc = table.Column<string>(type: "TEXT", nullable: true),
                    MaintenanceDetailTypeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailtypewithPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailtypewithPrices_MaintenanceDetailTypes_MaintenanceDetailTypeId",
                        column: x => x.MaintenanceDetailTypeId,
                        principalTable: "MaintenanceDetailTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetailtypewithPrices_MaintenanceDetailTypeId",
                table: "DetailtypewithPrices",
                column: "MaintenanceDetailTypeId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetailtypewithPrices");
        }
    }
}
