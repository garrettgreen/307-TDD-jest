const StockPortfolio = require('./stockPort');

test('A new portfolio is empty', () => {
  const portfolio = new StockPortfolio();
  expect(portfolio.isEmpty()).toBe(true);
});

test('A portfolio with stocks is not empty', () => {
    const portfolio = new StockPortfolio();
    portfolio.addStock('AAPL', 10); // Add some stocks
    expect(portfolio.isEmpty()).toBe(false);
  });

test('# ticker symbols in the portfolio', () => {
    const portfolio = new StockPortfolio();
    portfolio.addStock('GME', 5);
    portfolio.addStock('RBLX', 10);
    portfolio.addStock('GME', 3); // Adding more shares of 'GME'
    expect(portfolio.countUniqueTickerSymbols()).toBe(2);
  });


test('update the portfolio with new purchase', () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase('AAPL', 10);
    expect(portfolio.getShares('AAPL')).toBe(10);
  });

test('update portfolio with sale', () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase('AAPL', 10);
    portfolio.sale('AAPL', 5);
    expect(portfolio.getShares('AAPL')).toBe(5);
  });  

test('number of shares for a given symbol', () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase('AAPL', 10);
    expect(portfolio.getShares('AAPL')).toBe(10);
  });

  est('The portfolio only keeps owned symbols', () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase('AAPL', 10);
    portfolio.purchase('GOOGL', 5);
    portfolio.sale('AAPL', 5); // Selling some shares of AAPL
    expect(portfolio.getSymbols()).toEqual(['AAPL', 'GOOGL']);
  });

  test('raise ShareSaleException on attempt to sell more shares than owned', () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase('AAPL', 10);
    expect(() => portfolio.sale('AAPL', 15)).toThrow('ShareSaleException');
  });