describe("test for user model", () => {
  let User = global.db.User;
  let Center = global.db.Center;

  beforeEach(async () => {
    await User.sync({ force: true });
    await Center.create({
      id: 104,
      storeName: "Online",
      warehouseEmail: "online@email.com",
      managementEmail: "management@email.com",
    });
  });

  it("should create user 'Fulano Fulanito'", async () => {
    const fulano = await User.create({
      id: 12345,
      name: "Fulano",
      lastName: "Fulanito",
      CenterId: 104,
      password: "123123123",
      email: "fulano@email.com",
    });

    expect(fulano.name).toBe("Fulano");
    expect(fulano.lastName).toBe("Fulanito");
    expect(fulano.CenterId).toBe(104);
    expect(fulano.email).toBe("fulano@email.com");
    expect(fulano.password).not.toBe("123123123");
  });
});
