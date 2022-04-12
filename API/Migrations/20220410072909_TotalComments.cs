using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TotalComments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalComments",
                table: "Articles",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalComments",
                table: "Articles");
        }
    }
}
