
class ShareSaleException extends Error {
    constructor(message) {
      super(message);
      this.name = 'ShareSaleException';
    }
  }

class StockPort {
    constructor() {
      this.holdings = {};
    }
  
    isEmpty() {
      return Object.keys(this.holdings).length === 0;
    }
  
    addStock(ticker, shares) {
      this.holdings[ticker] = (this.holdings[ticker] || 0) + shares;
    }

    countUniqueTickerSymbols() {
        return Object.keys(this.holdings).length;
    }

    purchase(ticker, shares) {
        this.addStock(ticker, shares);
    }

    sale(ticker, shares) {
        if (this.holdings[ticker]) {
          if (this.holdings[ticker] >= shares) {
            this.holdings[ticker] -= shares;
            if (this.holdings[ticker] <= 0) {
              delete this.holdings[ticker];
            }
          } else {
            throw new ShareSaleException(`Not enough shares of ${ticker} to sell.`);
          }
        } else {
          throw new ShareSaleException(`${ticker} is not in the portfolio.`);
        }
      }
    
    
    getShares(ticker) {
        return this.holdings[ticker] || 0;
    }
    getSymbols() {
        return Object.keys(this.holdings);
      }
  }
  
  module.exports = StockPort;