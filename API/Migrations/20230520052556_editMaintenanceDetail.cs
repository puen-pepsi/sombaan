using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editMaintenanceDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceDetailTypes_TechnicianTypes_TechnicianTypeId",
                table: "MaintenanceDetailTypes");

            migrationBuilder.AlterColumn<int>(
                name: "TechnicianTypeId",
                table: "MaintenanceDetailTypes",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceDetailTypes_TechnicianTypes_TechnicianTypeId",
                table: "MaintenanceDetailTypes",
                column: "TechnicianTypeId",
                principalTable: "TechnicianTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceDetailTypes_TechnicianTypes_TechnicianTypeId",
                table: "MaintenanceDetailTypes");

            migrationBuilder.AlterColumn<int>(
                name: "TechnicianTypeId",
                table: "MaintenanceDetailTypes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceDetailTypes_TechnicianTypes_TechnicianTypeId",
                table: "MaintenanceDetailTypes",
                column: "TechnicianTypeId",
                principalTable: "TechnicianTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
