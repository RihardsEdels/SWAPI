import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import { mdiArrowUp, mdiArrowDown, mdiClose } from "@mdi/js";

import classes from "./listing.module.css";
import ListingCard from "../ListingCard/ListingCard";
import { Person } from "@/types/types";

import Icon from "@mdi/react";

interface ListingProps {
  listingData: Person[];
}

const Listing: React.FunctionComponent<ListingProps> = ({ listingData }) => {
  const [filteredData, setFilteredData] = useState<Person[]>(listingData || []);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  const sortByName = () => {
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className={classes.root}>
      <div className="grid lg:grid-flow-col gap-2 lg:justify-start">
        <div className="grid grid-flow-col gap-1 justify-start items-center hover:underline">
          <span onClick={sortByName} role="button">
            Sort by name
          </span>
          {sortOrder && (
            <Icon
              size={"16px"}
              path={sortOrder === "desc" ? mdiArrowUp : mdiArrowDown}
            />
          )}
        </div>
      </div>
      <div className={classes.characterGrid}>
        {filteredData.map((person, index) => (
          <ListingCard key={index} characterData={person} />
        ))}
      </div>
    </div>
  );
};

export default Listing;
