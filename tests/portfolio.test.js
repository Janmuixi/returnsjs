import Portfolio from "../index";

const exampleMarketValues = [
  { value: 1020, day: new Date("2024-01-01") },
  { value: 1105, day: new Date("2024-01-02") },
  { value: 1201, day: new Date("2024-01-03") },
];
const exampleTransactions = [
  { value: 120, day: new Date("2024-01-01") },
  { value: 205, day: new Date("2024-01-02") },
  { value: -100, day: new Date("2024-01-03") },
  { value: 0, day: new Date("2024-01-03") },
];
describe("Portfolio", () => {
  test("should create a portfolio", () => {
    const portfolio = new Portfolio(exampleMarketValues, exampleTransactions);
    expect(portfolio.dailyMarketValues).toEqual(exampleMarketValues);
    expect(portfolio.transactions).toEqual(exampleTransactions);
  });
  test("should create an empty portfolio", () => {
    const portfolio = new Portfolio([], []);
    expect(portfolio.dailyMarketValues).toEqual([]);
    expect(portfolio.transactions).toEqual([]);
  });
  test("should calculate overall return", () => {
    const portfolio = new Portfolio(exampleMarketValues, exampleTransactions);
    expect(portfolio.calculateOverallReturn()).toEqual(0.07941176470588235);
  });
});
