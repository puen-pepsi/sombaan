using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class Address : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Provinces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<int>(type: "INTEGER", nullable: false),
                    Name_th = table.Column<string>(type: "TEXT", maxLength: 150, nullable: true),
                    Name_en = table.Column<string>(type: "TEXT", maxLength: 150, nullable: true),
                    GeographyId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provinces", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Amphures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<int>(type: "INTEGER", nullable: false),
                    Name_th = table.Column<string>(type: "TEXT", maxLength: 150, nullable: true),
                    Name_en = table.Column<string>(type: "TEXT", maxLength: 150, nullable: true),
                    ProvinceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Amphures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Amphures_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Districts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ZipCode = table.Column<int>(type: "INTEGER", nullable: false),
                    Name_th = table.Column<string>(type: "TEXT", maxLength: 150, nullable: true),
                    Name_en = table.Column<string>(type: "TEXT", maxLength: 150, nullable: true),
                    AmphureId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Districts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Districts_Amphures_AmphureId",
                        column: x => x.AmphureId,
                        principalTable: "Amphures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Amphures_ProvinceId",
                table: "Amphures",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_Districts_AmphureId",
                table: "Districts",
                column: "AmphureId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Districts");

            migrationBuilder.DropTable(
                name: "Amphures");

            migrationBuilder.DropTable(
                name: "Provinces");
        }
    }
}
