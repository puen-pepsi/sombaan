using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class Phonetech : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LineId",
                table: "Technicians",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Technicians",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LineId",
                table: "Technicians");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Technicians");
        }
    }
}
