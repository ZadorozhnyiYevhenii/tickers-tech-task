import { connectToTickersSocket } from "../store/thunks/connectTicketsSocket";
import { socket } from "../api/core";

jest.mock('../api/core', () => ({
  socket: {
    emit: jest.fn(),
    on: jest.fn(),
  },
}));

describe("connect To Tickers Socket", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("socket connect", async () => {
    await connectToTickersSocket()(dispatchMock);

    expect(socket.emit).toHaveBeenCalledWith("start");
    expect(socket.on).toHaveBeenCalledWith("ticker", expect.any(Function));
  });

  test("socket connect with null stored data", async () => {
    global.localStorage.getItem = jest.fn(() => null);

    await connectToTickersSocket()(dispatchMock);

    expect(socket.emit).toHaveBeenCalledWith("start");
    expect(socket.on).toHaveBeenCalledWith("ticker", expect.any(Function));
  });
});
