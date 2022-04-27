using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editMaintenance2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Maintenances");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Maintenances",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
