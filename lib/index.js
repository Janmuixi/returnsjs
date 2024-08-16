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

  calculatePeriodReturn(startDate, endDate) {
    const filteredDailyReturns = this.dailyMarketValues.filter(
      ({ day }) => day >= startDate && day <= endDate,
    );
    return (
      filteredDailyReturns
        .map(({ day, value }, index) => {
          return index === 0
            ? 0
            : this.#getReturn(
                filteredDailyReturns[index - 1].value,
                value,
                this.sumDailyTransactions(day),
              );
        })
        .reduce((acc, curr) => acc * (1 + curr), 1) - 1
    );
  }

  /**
   * Sums the transaction from one day
   * @param dateToSum - date when we whan to sum the transactions
   * @returns sum of all the transactions of that day
   */
  sumDailyTransactions(dateToSum) {
    return this.transactions
      .filter(
        (transaction) => transaction.day.getTime() === dateToSum.getTime(),
      )
      .reduce((acc, curr) => acc + curr.value, 0);
  }

  /**
   * Clears daily market value from the porfolio
   */
  clearDailyMarketValues() {
    this.dailyMarketValues = [];
  }
  /**
   * Clears transactions from the portfolio
   */
  clearTransactions() {
    this.transactions = [];
  }

  /**
   * Adds a single market value
   * @param {{value: number, day: Date}} dailyMarketValue
   */
  addDailyMarketValue(dailyMarketValue) {
    this.dailyMarketValues.push(dailyMarketValue);
  }
  /**
   * Adds a single transaction
   * @param {{value: number, day: Date}} transaction
   */
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
  /**
   * Adds a list of transactions
   * @param {{value: number, day: Date}[]} transactions
   */
  addTransactions(transactions) {
    this.transactions.push(...transactions);
  }
  /**
   * Adds a list of market values
   * @param {{value: number, day: Date}[]} dailyMarketValues
   */
  addDailyMarketValues(dailyMarketValues) {
    this.dailyMarketValues.push(...dailyMarketValues);
  }
}
export default Portfolio;
