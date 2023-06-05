const controller = require("../controllers/home.js");
const { mockRequest, mockResponse } = require("../util/interceptor.js");

describe("Home Controller", () => {
  let request;
  let response;

  beforeEach(async () => {
    request = mockRequest();
    response = mockResponse();
  });

  test("Get data without page number and page size", async () => {
    const responseObject = await controller.get(request, response);
    expect(responseObject.data).toHaveLength(10);
  });

  test("Get data with page number=0 and page size=10", async () => {
    request.query.page = 0;
    request.query.size = 10;
    const responseObject = await controller.get(request, response);
    expect(responseObject.data).toHaveLength(10);
  });

  test("Get data with page number=0 and page size=4", async () => {
    request.query.page = 0;
    request.query.size = 4;
    const responseObject = await controller.get(request, response);
    expect(responseObject.data).toHaveLength(4);
    expect(responseObject.data[0].id).toBe("7111");
  });

  test("Get data with page number=1 and page size=4", async () => {
    request.query.page = 1;
    request.query.size = 4;
    const responseObject = await controller.get(request, response);
    expect(responseObject.data).toHaveLength(4);
    expect(responseObject.data[0].id).toBe("7130");
  });

  test("Get data with page number=2 and page size=4", async () => {
    request.query.page = 2;
    request.query.size = 4;
    const responseObject = await controller.get(request, response);
    expect(responseObject.data).toHaveLength(4);
    expect(responseObject.data[0].id).toBe("7147");
  });

  test("Get data with page number=3 and page size=4", async () => {
    request.query.page = 3;
    request.query.size = 4;
    const responseObject = await controller.get(request, response);
    expect(responseObject.data).toHaveLength(3);
    expect(responseObject.data[0].id).toBe("7160");
  });

  test("Get data with page number=4 and page size=4", async () => {
    request.query.page = 4;
    request.query.size = 4;
    const responseObject = await controller.get(request, response);
    expect(responseObject.data).toHaveLength(0);
  });
});
