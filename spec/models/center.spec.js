describe("test for center model", () => {
  let Center = global.db.Center;

  beforeEach(async () => {
    await Center.sync({ force: true });
  });

  it("should create center 102", async () => {
    const center102 = await Center.create({
      id: 102,
      storeName: "Online",
      warehouseEmail: "online@email.com",
      managementEmail: "management@email.com",
    });

    expect(center102.id).toBe(102);
    expect(center102.storeName).toBe("Online");
    expect(center102.warehouseEmail).toBe("online@email.com");
    expect(center102.managementEmail).toBe("management@email.com");
  });
});
