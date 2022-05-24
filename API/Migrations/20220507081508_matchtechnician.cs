using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class matchtechnician : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MatchTechnicians",
                columns: table => new
                {
                    TechnicianId = table.Column<int>(type: "INTEGER", nullable: false),
                    MaintenanceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchTechnicians", x => new { x.TechnicianId, x.MaintenanceId });
                    table.ForeignKey(
                        name: "FK_MatchTechnicians_Maintenances_MaintenanceId",
                        column: x => x.MaintenanceId,
                        principalTable: "Maintenances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MatchTechnicians_Technicians_TechnicianId",
                        column: x => x.TechnicianId,
                        principalTable: "Technicians",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MatchTechnicians_MaintenanceId",
                table: "MatchTechnicians",
                column: "MaintenanceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MatchTechnicians");
        }
    }
}
