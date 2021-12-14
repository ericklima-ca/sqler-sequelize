const request = require("supertest");
const app = require("../../server/app/app");

describe("test for all models", () => {
  let Solicitation = global.db.Solicitation;
  let Product = global.db.Product;
  let User = global.db.User;
  let Center = global.db.Center;
  let Response = global.db.Response;
  let Token = global.db.Token;

  beforeAll(async () => {
    await Solicitation.sync({ force: true });
    await Product.sync({ force: true });
    await User.sync({ force: true });
    await Center.sync({ force: true });
    await Response.sync({ force: true });
    await Token.sync({ force: true });
  });

  afterAll(async () => {
    await Solicitation.sync({ force: true });
    await Product.sync({ force: true });
    await User.sync({ force: true });
    await Center.sync({ force: true });
    await Response.sync({ force: true });
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

  it("should create a new center", async () => {
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

  it("should create a new user", async () => {
    const fulano = await User.create({
      id: 12345,
      name: "Fulano",
      lastName: "Fulanito",
      CenterId: 102,
      password: "123123123",
      email: "fulano@email.com",
    });

    fulano.active = true;
    fulano.save();

    expect(fulano.name).toBe("Fulano");
    expect(fulano.lastName).toBe("Fulanito");
    expect(fulano.CenterId).toBe(102);
    expect(await fulano.checkPassword("123123123")).toBeTrue();
    expect(!(await fulano.checkPassword("123123123"))).toBeFalse();
    expect(fulano.email).toBe("fulano@email.com");
    expect(fulano.password).not.toBe("123123123");
  });

  it("should create a new solicitation", async () => {
    const solicitation = await Solicitation.create({
      order: "44002233",
      ProductId: "220021",
      UserId: 12345,
      CenterId: 102,
      amount: 2,
    });

    expect(solicitation).toBeTruthy();
  });

  it("should create a new response", async () => {
    const response = await Response.create({
      SolicitationId: 1,
      UserId: 12345,
      confirmed: true,
    });

    expect(response).toBeTruthy();
  });

  it("should create a new token", async () => {
    const token = await Token.create({
      token: "",
      UserId: 12345,
    });

    // function sleep(milliseconds) {
    //   const date = Date.now();
    //   let currentDate = null;
    //   do {
    //     currentDate = Date.now();
    //   } while (currentDate - date < milliseconds);
    // }
    expect(token).toBeTruthy();
    expect(token.token).not.toBe("");
    expect(token.expired()).toBe(false);
  });

  it("POST /api/auth/login get 501 for user not found", async () => {
    request(app)
      .post("/api/auth/login")
      .send({ id: 12346, password: "123123123" })
      .expect("Content-Type", /json/)
      .expect(501)
      .end(function (err, _res) {
        if (err) throw err;
      });
  });

  it("POST /api/auth/login get 503 for incorrect password", async () => {
    request(app)
      .post("/api/auth/login")
      .send({ id: 12345, password: "1" })
      .expect("Content-Type", /json/)
      .expect(503)
      .end(function (err, _res) {
        if (err) throw err;
      });
  });
  var token;
  it("POST /api/auth/login get 200 for successfull login", async (done) => {
    await User.create({
      id: 12346,
      name: "Fulano",
      lastName: "Fulanito",
      CenterId: 102,
      password: "123456",
      email: "fulano@email.com",
      active: true,
    });
    request(app)
      .post("/api/auth/login")
      .send({ id: 12346, password: "123456" })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        token = res.body.token;
        done();
      });
  });

  it("GET /api/solicitations get 200 for successfull req", async () => {
    request(app)
      .get("/api/solicitations")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("PUT /api/responses get 301 for unauthorized req", async () => {
    request(app)
      .put("/api/responses/1/ntp")
      .set("Authorization", "Bearer " + token)
      .expect(301)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("POST /api/auth/signup get 200 for user successfull created", async () => {
    request(app)
      .post("/api/auth/signup")
      .set("Content-Type", "application/json")
      .send({
        id: 12347,
        name: "Fulanilson",
        lastName: "Fulanélvis",
        CenterId: 102,
        password: "123123123",
        email: "fulano@email.com",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, _res) {
        if (err) throw err;
        return;
      });
    let user = await User.findOne({
      where: {
        id: 12347,
      },
    });
    expect(user.active).toBeFalse();
  });
});
