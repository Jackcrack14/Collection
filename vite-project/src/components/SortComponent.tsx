import React, { useState } from "react";

const SortComponent: React.FC<SortProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>("title");

  const handleSortChange = (sortOption: SortOption) => {
    setSelectedSort(sortOption);
    onSortChange(sortOption);
  };

  return (
    <div className="sort-component">
      <label>Sort by: </label>
      <select
        value={selectedSort}
        onChange={(e) => handleSortChange(e.target.value as SortOption)}
      >
        <option value="title">Title</option>
        <option value="itemCount">Number of Items</option>
        <option value="createdDate">Created Date</option>
      </select>
      <button className="hamburger-menu">☰</button>
    </div>
  );
};

export default SortComponent;
