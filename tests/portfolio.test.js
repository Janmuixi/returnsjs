import Portfolio from "../lib/index";

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
  test("clear market values and transactions", () => {
    const portfolio = new Portfolio(exampleMarketValues, exampleTransactions);
    expect(portfolio.dailyMarketValues).toEqual(exampleMarketValues);
    expect(portfolio.transactions).toEqual(exampleTransactions);
    portfolio.clearDailyMarketValues();
    portfolio.clearTransactions();
    expect(portfolio.dailyMarketValues).toEqual([]);
    expect(portfolio.transactions).toEqual([]);
  });
  test("add market value and transactions", () => {
    const portfolio = new Portfolio([], []);
    expect(portfolio.dailyMarketValues).toEqual([]);
    expect(portfolio.transactions).toEqual([]);
    portfolio.addTransaction(exampleTransactions[0]);
    portfolio.addDailyMarketValue(exampleMarketValues[0]);
    expect(portfolio.dailyMarketValues.length).toEqual(1);
    expect(portfolio.transactions.length).toEqual(1);
    portfolio.addTransactions(exampleTransactions);
    portfolio.addDailyMarketValues(exampleMarketValues);
    expect(portfolio.dailyMarketValues.length).toEqual(4);
    expect(portfolio.transactions.length).toEqual(5);
  });
  test("sum up all transactions from one day", () => {
    const portfolio = new Portfolio(exampleMarketValues, exampleTransactions);
    expect(portfolio.sumDailyTransactions(new Date("2024-01-03"))).toEqual(
      -100,
    );
  });
  test("calculate daily portfolio return", () => {
    const portfolio = new Portfolio(exampleMarketValues, exampleTransactions);
    expect(
      portfolio.calculatePeriodReturn(
        new Date("2024-01-01"),
        new Date("2024-01-03"),
      ),
    ).toEqual(0.27966462603140796);
  });
});
