using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editFollowed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Followed",
                table: "Articles",
                type: "INTEGER",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Followed",
                table: "Articles");
        }
    }
}
