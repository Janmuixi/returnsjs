/**
 * Represents a financial portfolio
 */
class Portfolio {
  /**
   * Gets the return of a portfolio/day/period
   * @param {number} initialValue
   * @param {number} finalValue
   * @param {number} cashFlow
   * @returns {number} Return based on the initial value, final value and the cash flow
   */
  #getReturn(initialValue, finalValue, cashFlow) {
    return (finalValue + cashFlow - initialValue) / initialValue;
  }

  /**
   * Given a list of daily returns from a period, it compounds the returns to give you the period return
   * @param {number[]} returns - list of daily returns from the period you want to calculate
   * @returns {number} TWR formula result
   */
  #compoundReturns(returns) {
    return (
      returns.reduce((acc, currentValue) => acc * (1 + currentValue), 1) - 1
    );
  }
  /**
   *
   * @param {{value: number, day: Date}[]} dailyMarketValues - The market value of every day
   * @param {{value: number, day: Date}[]} transactions
   */
  constructor(dailyMarketValues, transactions) {
    this.dailyMarketValues = dailyMarketValues;
    this.transactions = transactions;
  }

  /**
   * Calculates the overall return of the portfolio from the first day to the last. It doesn't calculate daily returns.
   * @returns {number} Return of the portfolio within a period without daily calculations
   */
  calculateOverallReturn() {
    if (this.dailyMarketValues.length > 0) {
      const firstDayMarketValue = this.dailyMarketValues[0];
      const lastDayMarketValue =
        this.dailyMarketValues[this.dailyMarketValues.length - 1];
      const lastDayCashFlow =
        this.transactions
          .filter(
            ({ day }) => day.getTime() === lastDayMarketValue.day.getTime(),
          )
          ?.reduce((acc, curr) => acc + curr.value, 0) ?? 0;
      return this.#getReturn(
        firstDayMarketValue.value,
        lastDayMarketValue.value,
        lastDayCashFlow,
      );
    }
    throw new Error("No daily market values informed");
  }
}
export default Portfolio;
