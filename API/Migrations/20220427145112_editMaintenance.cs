using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editMaintenance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Maintenances_Area_AreaId",
                table: "Maintenances");

            migrationBuilder.DropForeignKey(
                name: "FK_Maintenances_TechnicianTypes_TypesId",
                table: "Maintenances");

            migrationBuilder.DropIndex(
                name: "IX_Maintenances_TypesId",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "TypesId",
                table: "Maintenances");

            migrationBuilder.AlterColumn<int>(
                name: "AreaId",
                table: "Maintenances",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Maintenances",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Maintenances",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "MaintenanceTypes",
                columns: table => new
                {
                    MaintenanceId = table.Column<int>(type: "INTEGER", nullable: false),
                    TypeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceTypes", x => new { x.MaintenanceId, x.TypeId });
                    table.ForeignKey(
                        name: "FK_MaintenanceTypes_Maintenances_MaintenanceId",
                        column: x => x.MaintenanceId,
                        principalTable: "Maintenances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaintenanceTypes_TechnicianTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "TechnicianTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Maintenances_UserId",
                table: "Maintenances",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceTypes_TypeId",
                table: "MaintenanceTypes",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Maintenances_Area_AreaId",
                table: "Maintenances",
                column: "AreaId",
                principalTable: "Area",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Maintenances_AspNetUsers_UserId",
                table: "Maintenances",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Maintenances_Area_AreaId",
                table: "Maintenances");

            migrationBuilder.DropForeignKey(
                name: "FK_Maintenances_AspNetUsers_UserId",
                table: "Maintenances");

            migrationBuilder.DropTable(
                name: "MaintenanceTypes");

            migrationBuilder.DropIndex(
                name: "IX_Maintenances_UserId",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Maintenances");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Maintenances");

            migrationBuilder.AlterColumn<int>(
                name: "AreaId",
                table: "Maintenances",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "TypesId",
                table: "Maintenances",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Maintenances_TypesId",
                table: "Maintenances",
                column: "TypesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Maintenances_Area_AreaId",
                table: "Maintenances",
                column: "AreaId",
                principalTable: "Area",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Maintenances_TechnicianTypes_TypesId",
                table: "Maintenances",
                column: "TypesId",
                principalTable: "TechnicianTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
