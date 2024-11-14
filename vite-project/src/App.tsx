import React, { useState } from "react";
import { Row, Col, Layout, Menu } from "antd";
import Header from "./components/Header";
import FilterSortComponent from "./components/FilterSortComponent";
import CollectionCard from "./components/CollectionCard";
import "./App.css";

const { Sider, Content } = Layout;

type FilterOption = "All" | "Videos" | "Photos" | "Documents";
type SortOption = "title" | "itemCount" | "createdDate";

interface Collection {
  id: number;
  title: string;
  type: FilterOption;
  itemCount: number;
  thumbnail: string;
  createdDate: string;
}

const initialCollections: Collection[] = [
  {
    id: 1,
    title: "Collection 1",
    type: "Photos",
    itemCount: 5,
    thumbnail: "Charlie-Chaplin.png",
    createdDate: "2024-01-01",
  },
  {
    id: 2,
    title: "Collection 2",
    type: "Videos",
    itemCount: 3,
    thumbnail: "disha.png",
    createdDate: "2024-01-03",
  },
  {
    id: 3,
    title: "Collection 3",
    type: "Photos",
    itemCount: 3,
    thumbnail: "hello.png",
    createdDate: "2024-08-02",
  },
  {
    id: 4,
    title: "Collection 4",
    type: "Documents",
    itemCount: 3,
    thumbnail: "lab.png",
    createdDate: "2024-11-02",
  },
  {
    id: 5,
    title: "Collection 5",
    type: "Videos",
    itemCount: 3,
    thumbnail: "paper.png",
    createdDate: "2024-11-02",
  },
  {
    id: 6,
    title: "Collection 6",
    type: "Documents",
    itemCount: 6,
    thumbnail: "architectural-drawings-1.png",
    createdDate: "2024-11-02",
  },
  {
    id: 7,
    title: "Collection 7",
    type: "Documents",
    itemCount: 4,
    thumbnail: "fish.png",
    createdDate: "2024-11-02",
  },
  {
    id: 8,
    title: "Collection 8",
    type: "Photos",
    itemCount: 2,
    thumbnail: "wall.png",
    createdDate: "2024-11-02",
  },
];

function App() {
  const [collections, setCollections] =
    useState<Collection[]>(initialCollections);
  const [filteredCollections, setFilteredCollections] =
    useState<Collection[]>(collections);
  const [filter, setFilter] = useState<FilterOption>("All");
  const [sort, setSort] = useState<SortOption>("title");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>("2"); // Track selected menu item
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedTitles, setEditedTitles] = useState<{ [key: number]: string }>(
    {}
  );

  const handleFilterChange = (filter: FilterOption) => {
    setFilter(filter);
    filterCollections(filter, sort, searchQuery);
  };

  const handleSortChange = (sortOption: SortOption) => {
    setSort(sortOption);
    filterCollections(filter, sortOption, searchQuery);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    filterCollections(filter, sort, query);
  };

  const filterCollections = (
    filter: FilterOption,
    sortOption: SortOption,
    searchQuery: string
  ) => {
    let updatedCollections = collections.filter((collection) => {
      const matchesFilter =
        filter === "All" ||
        collection.type.toLowerCase() === filter.toLowerCase();
      const matchesSearch = collection.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    updatedCollections.sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "itemCount") {
        return a.itemCount - b.itemCount;
      } else if (sortOption === "createdDate") {
        return (
          new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
        );
      }
      return 0;
    });

    setFilteredCollections(updatedCollections);
  };

  const handleMenuClick = (e: { key: string }) => {
    setSelectedMenuKey(e.key);
  };

  const handleSave = () => {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        editedTitles[collection.id]
          ? { ...collection, title: editedTitles[collection.id] }
          : collection
      )
    );
    setEditMode(false);
    setEditedTitles({});
  };

  const setNewTitleForCollection = (id: number, newTitle: string) => {
    setEditedTitles((prevTitles) => ({
      ...prevTitles,
      [id]: newTitle,
    }));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar with Menu */}
      <Sider width={80} className="sidebar">
        <div className="menu-container">
          <Menu
            mode="vertical"
            selectedKeys={[selectedMenuKey]}
            onClick={handleMenuClick}
            className="sidebar-menu"
          >
            <Menu.Item
              key="1"
              icon={
                <img
                  src="src/assets/search.png"
                  alt="search"
                  className="sidebar-icon"
                />
              }
            />
            <Menu.Item
              key="2"
              icon={
                <img
                  src="src/assets/rectangle.png"
                  alt="rectangle"
                  className="sidebar-icon"
                />
              }
            />
            <Menu.Item
              key="3"
              icon={
                <img
                  src="src/assets/diamond.png"
                  alt="diamond"
                  className="sidebar-icon"
                />
              }
            />
            <Menu.Item
              key="4"
              icon={
                <img
                  src="src/assets/chat.png"
                  alt="chat"
                  className="sidebar-icon"
                />
              }
            />
            <Menu.Item
              key="5"
              icon={
                <img
                  src="src/assets/eye.png"
                  alt="eye"
                  className="sidebar-icon"
                />
              }
            />
            <Menu.Item
              key="6"
              icon={
                <img
                  src="src/assets/rocket.png"
                  alt="rocket"
                  className="sidebar-icon"
                />
              }
            />
          </Menu>

          <Menu
            mode="vertical"
            selectedKeys={[selectedMenuKey]}
            onClick={handleMenuClick}
            className="sidebar-menu"
          >
            <Menu.Item
              key="7"
              icon={
                <img
                  src="src/assets/wheel.png"
                  alt="wheel"
                  className="sidebar-icon"
                />
              }
            />
            <Menu.Item
              key="8"
              icon={
                <img
                  src="src/assets/square-dot.png"
                  alt="square"
                  className="sidebar-icon"
                />
              }
            />
          </Menu>
        </div>
      </Sider>

      {/* Main Content Area */}
      <Layout
        style={{
          paddingLeft: "150px",
          paddingRight: "50px",
          backgroundColor: "#FAFAFA",
          borderRadius: "16px",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
        className="main-layout"
      >
        <Header
          setSearchQuery={handleSearchQueryChange}
          editMode={editMode}
          setEditMode={setEditMode}
          onSave={handleSave}
        />
        <div className="filter-sort-container">
          <FilterSortComponent
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>

        <Content>
          {/* Card Grid */}
          <Row gutter={[16, 16]} className="card-row">
            {filteredCollections.map((collection) => (
              <Col key={collection.id} xs={24} sm={12} md={8} lg={6}>
                <div className="card-container">
                  <CollectionCard
                    id={collection.id}
                    title={collection.title}
                    subtitle={`${collection.itemCount} ${collection.type}`}
                    thumbnail={collection.thumbnail}
                    editMode={editMode}
                    onSave={setNewTitleForCollection}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
