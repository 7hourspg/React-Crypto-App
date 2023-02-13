import React, {useEffect, useState, useCallback} from "react";
import "./app.scss";
import {FaSearch} from "react-icons/fa";
import axios from "axios";
import {BsArrowDown, BsArrowUp} from "react-icons/bs";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [AtoZ, setAtoZ] = useState(false);
  const [marketCap, setMarketCap] = useState(false);
  const [priceSorting, setPriceSorting] = useState(false);
  const [percentageSorting, setPercentageSorting] = useState(false);

  const handleGetData = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => setCoins(res.data))
      .catch((error) => console.log(error));
  };

  // handling input

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  // Handling search
  const handleSearch = () => {
    let filteredCoins = coins.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setCoins(filteredCoins);
  };
  // search
  useEffect(() => {
    if (search.length > 2) {
      search.length > 2 && handleSearch();
    } else {
      handleGetData();
    }
    console.log("Hola");
  }, [search]);

  // Price percentage sorting

  const handleNegative = () => {
    coins.sort(function (a, b) {
      if (a.current_price < b.current_price) {
        return -1;
      }
      if (a.current_price > b.current_price) {
        return 1;
      }
      return 0;
    });
  };
  const handlePositive = () => {
    coins.sort(function (a, b) {
      if (a.current_price > b.current_price) {
        return -1;
      }
      if (a.current_price < b.current_price) {
        return 1;
      }
      return 0;
    });
  };

  //  Alphabetically sorting

  //   If the result is negative, a is sorted before b.
  // If the result is positive, b is sorted before `a'.
  // If the result is 0, no changes are made to the sort order of the two values

  const sortAtoZ = () => {
    coins.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  };

  const sortZtoA = () => {
    coins.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  };
  // MarketCap sorting
  const marketCapPositive = () => {
    coins.sort(function (a, b) {
      if (a.market_cap > b.market_cap) {
        return -1;
      }
      if (a.market_cap < b.market_cap) {
        return 1;
      }
      return 0;
    });
  };
  const marketCapNegative = () => {
    coins.sort(function (a, b) {
      if (a.market_cap < b.market_cap) {
        return -1;
      }
      if (a.market_cap > b.market_cap) {
        return 1;
      }
      return 0;
    });
  };

  // price_change_percentage_24h

  const handlePositivePercentage = () => {
    coins.sort(function (a, b) {
      if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
        return -1;
      }
      if (
        a.price_change_percentage_24h < b.maprice_change_percentage_24hrket_cap
      ) {
        return 1;
      }
      return 0;
    });
  };
  const handleNegativePercentage = () => {
    coins.sort(function (a, b) {
      if (a.price_change_percentage_24h < b.price_change_percentage_24h) {
        return -1;
      }
      if (
        a.price_change_percentage_24h > b.maprice_change_percentage_24hrket_cap
      ) {
        return 1;
      }
      return 0;
    });
  };

  //Handling based on t of f

  const handleAtoz = () => {
    setAtoZ(!AtoZ);
    if (AtoZ) {
      sortAtoZ();
    } else {
      sortZtoA();
    }
  };

  const handleMarketCap = () => {
    setMarketCap(!marketCap);
    if (marketCap) {
      marketCapPositive();
    } else {
      marketCapNegative();
    }
  };

  const handlePriceSorting = () => {
    setPriceSorting(!priceSorting);
    if (priceSorting) {
      handlePositive();
    } else {
      handleNegative();
    }
  };

  const handlePercentageSorting = () => {
    setPercentageSorting(!percentageSorting);
    if (percentageSorting) {
      handlePositivePercentage();
    } else {
      handleNegativePercentage();
    }
  };

  return (
    <div className="container">
      <div className="containerWrapper">
        <div className="searchContainer">
          <span className="searchSpan">
            <input
              className="searchBar"
              type="text"
              placeholder="search here"
              onChange={handleChange}
            />
            <FaSearch
              onClick={handleSearch}
              className="FaSearch"
              size={"22px"}
            />
          </span>
        </div>
        <div className="contentContainer">
          <div className="filterContainer">
            <button className="btn" onClick={handleAtoz}>
              A-Z {AtoZ ? <BsArrowUp /> : <BsArrowDown />}
            </button>
            <button className="btn" onClick={handlePriceSorting}>
              Sort {priceSorting ? <BsArrowUp /> : <BsArrowDown />}
            </button>
            <button className="btn" onClick={handlePercentageSorting}>
              Sort {percentageSorting ? <BsArrowDown /> : <BsArrowUp />}
            </button>
            <button className="btn" onClick={handleMarketCap}>
              Sort {marketCap ? <BsArrowDown /> : <BsArrowUp />}
            </button>
          </div>
          {coins.map((item) => {
            return (
              <div className="contentWrapper" key={item.id}>
                <div className="coinDetails">
                  <img src={item.image} alt="logo" />
                  <span className="coinName">{item.name}</span>
                </div>
                <div className="priceDetails">
                  <span>RS. {item.current_price}//</span>
                  <span>Rs.</span>
                </div>
                <p
                  style={{
                    color:
                      item.price_change_percentage_24h > 0 ? "green" : "red",
                  }}
                >
                  {item.price_change_percentage_24h.toFixed(2)}
                </p>
                <div className="marketCap">
                  <span>Mkt Cap:</span>
                  <span>{item.market_cap}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
