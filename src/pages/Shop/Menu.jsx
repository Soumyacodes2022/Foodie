import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState("all");
  const [sortItems, setSortItems] = useState("default");

  //loading Data
  useEffect(() => {
    //fetching data from the backend
    const fetchedData = async () => {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (e) {
        console.error("Internal Server Error", e);
      }
    };
    fetchedData();
  }, []);

  //filtering Data
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((items) => {
            items.category === category;
          });
    setFilteredItems(filtered);
    setCategoryItems(category);
  };

  //show All Data
  const showAll = () => {
    setFilteredItems(menu);
    setCategoryItems("all");
  };

  //sorting All Data according to A-Z , Z-A ,price low to high, price high to low
  const handleSortItems = (option) => {
    setSortItems(option);

    let sortedItems = [...filteredItems];
    switch (option) {
      case "A-Z":
        //code
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        //code
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "low-to-high":
        //code
        sortedItems.sort((a, b) => a.price - b.price);
        break;

      case "high-to-low":
        //code
        sortedItems.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }
    setFilteredItems(sortedItems);
  };

  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-48 flex flex-col  justify-center items-center gap-8">
        {/* Menu Banner */}
        <div className="text-center space-y-7 px-4 md:w-5/6 mx-auto">
          <h2 className="md:text-5xl text-4xl font-bold leading-snug text-black">
            For the Love of Delicious <span className="text-green">Food</span>
          </h2>
          <p className="text-xl text-[#4A4A4A] ">
            Come with family & feel the joy of mouthwatering food such as Greek
            Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Ollevus Revenus
            and more for a moderate cost
          </p>
          <button className="btn bg-green text-white hover:text-black rounded-full px-6 ">
            Order Now
          </button>
        </div>

        {/* Products */}
        <div className="">
          {/* Filtering and Sorting */}
          <div>
            {/* All Categories btns */}
            <div className="flex flex-row flex-wrap gap-4 md:gap-8 justify-start md:items-center my-8 font-semibold">
              <button
                className={categoryItems === "all" ? "active" : ""}
                onClick={showAll}
              >
                All
              </button>
              <button
                className={categoryItems === "salad" ? "active" : ""}
                onClick={() => filterItems("salad")}
              >
                Salad
              </button>
              <button
                className={categoryItems === "pizza" ? "active" : ""}
                onClick={() => filterItems("pizza")}
              >
                Pizza
              </button>
              <button
                className={categoryItems === "soup" ? "active" : ""}
                onClick={() => filterItems("soup")}
              >
                Soups
              </button>
              <button
                className={categoryItems === "dessert" ? "active" : ""}
                onClick={() => filterItems("dessert")}
              >
                Dessert
              </button>
              <button
                className={categoryItems === "drinks" ? "active" : ""}
                onClick={() => filterItems("drinks")}
              >
                Drinks
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12">
            {filteredItems.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
