using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class EditMaintenanceDetailType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ParentId",
                table: "MaintenanceDetailTypes",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "uuId",
                table: "MaintenanceDetailTypes",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "uuId",
                table: "MaintenanceDetailTypes");

            migrationBuilder.AlterColumn<int>(
                name: "ParentId",
                table: "MaintenanceDetailTypes",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
