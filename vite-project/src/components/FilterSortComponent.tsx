import { useState } from "react";
import { Button, Select, Row, Col } from "antd";
import "../styles/filter.css";

const { Option } = Select;

type FilterOption = "All" | "Videos" | "Photos" | "Documents";
type SortOption = "title" | "itemCount" | "createdDate";

interface FilterSortProps {
  onFilterChange: (filter: FilterOption) => void;
  onSortChange: (sortOption: SortOption) => void;
}

const FilterSortComponent: React.FC<FilterSortProps> = ({
  onFilterChange,
  onSortChange,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("All");
  const [selectedSort, setSelectedSort] = useState<SortOption>("title");

  const handleFilterChange = (filter: FilterOption) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  const handleSortChange = (sortOption: SortOption) => {
    setSelectedSort(sortOption);
    onSortChange(sortOption);
  };

  return (
    <Row
      // justify="space-between"
      className="filter-sort-component"
      align="middle"
    >
      <Col>
        <Button
          shape="circle"
          icon={
            <img src="src/assets/plus.png" alt="plus" className="upload-icon" />
          }
          size="large"
          className="upload-button"
        >
          <span className="extra-text"> new folder</span>
        </Button>

        <Button
          className={`filter-button ${
            selectedFilter === "All" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("All")}
          size="large"
        >
          All
        </Button>
        <Button
          className={`filter-button ${
            selectedFilter === "Videos" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("Videos")}
          size="large"
        >
          Videos
        </Button>
        <Button
          className={`filter-button ${
            selectedFilter === "Photos" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("Photos")}
          size="large"
        >
          Photos
        </Button>
        <Button
          className={`filter-button ${
            selectedFilter === "Documents" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("Documents")}
          size="large"
        >
          Documents
        </Button>
      </Col>
      <Col>
        <label style={{ display: "block" }}>Sort by:</label>

        <Select
          value={selectedSort}
          onChange={handleSortChange}
          style={{ width: 150 }}
          size="large"
          bordered={false} // Remove the border
        >
          <Option value="title">Title</Option>
          <Option value="itemCount">Number of Items</Option>
          <Option value="createdDate">Created Date</Option>
        </Select>
        <Button className="hamburger-menu" size="large">
          ☰
        </Button>
      </Col>
    </Row>
  );
};

export default FilterSortComponent;
