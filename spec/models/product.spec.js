describe("test for product model", () => {
  let Product = global.db.Product;

  beforeEach(async () => {
    await Product.sync({ force: true });
  });

  it("create a new product", async () => {
    const product = await Product.create({
      id: "220021",
      description: "TV 43 SAMSUNG ULHD 2022221",
      ean: "123456789000",
      imageUrl: "https://image.com.br/tv-43.png",
    });

    expect(product).toBeTruthy();
    expect(product.dataValues).toEqual({
      id: "220021",
      description: "TV 43 SAMSUNG ULHD 2022221",
      ean: "123456789000",
      imageUrl: "https://image.com.br/tv-43.png",
    });
  });
});
