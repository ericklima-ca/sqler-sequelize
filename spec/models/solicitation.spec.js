describe("test for solicitation model", () => {
  let Solicitation = global.db.Solicitation;
  let Product = global.db.Product;
  let User = global.db.User;
  let Center = global.db.Center;
  //   afterAll(async () => {
  //     await Solicitation.sync({ force: true });
  //     await Product.sync({ force: true });
  //     await User.sync({ force: true });
  //     await Center.sync({ force: true });
  //   });

  beforeAll(async () => {
    await Solicitation.sync({ force: true });
    await Product.create({
      id: "220022",
      description: "TV 43 SAMSUNG ULHD 2022221",
      ean: "123456789000",
      imageUrl: "https://image.com.br/tv-43.png",
    });

    await User.create({
      id: 12346,
      name: "Fulano",
      lastName: "Fulanito",
      CenterId: 102,
      password: "123123123",
      email: "fulano@email.com",
    });
    await Center.create({
      id: 103,
      storeName: "Online",
      warehouseEmail: "online@email.com",
      managementEmail: "management@email.com",
    });
  });

  it("should create a new solicitation", async () => {
    const solicitation = await Solicitation.create({
      order: "44002233",
      ProductId: "220022",
      UserId: 12346,
      CenterId: 103,
      amount: 2,
    });

    expect(solicitation).toBeTruthy();
  });
});
