const { customErros } = require("../middlewares/CustomErrors");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockLogRegister = jest.fn();

jest.mock("../tools/log", () => {
  return {
    logRegister: mockLogRegister,
  };
});

describe("Custom Errors Middleware", () => {
  it("should return error details and log the error", () => {
    const err = new Error("Test Error");
    err.status = 400;
    err.errors = ["Error 1", "Error 2"];

    const req = {
      path: "/test",
    };
    const res = mockResponse();

    customErros(err, req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      path: "/test",
      status: 400,
      message: "Test Error",
      error: ["Error 1", "Error 2"],
      stack: err.stack,
    });
    expect(mockLogRegister).toHaveBeenCalledWith("Test Error");
  });

  it("should handle errors without status and errors properties", () => {
    const err = new Error("Internal Server Error");
    const req = {
      path: "/test",
    };
    const res = mockResponse();

    customErros(err, req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      path: "/test",
      status: 500,
      message: "Internal Server Error",
      error: undefined,
      stack: err.stack,
    });
    expect(mockLogRegister).toHaveBeenCalledWith("Internal Server Error");
  });
});
