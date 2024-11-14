import React, { useState } from "react";
import { Col, Row, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../styles/header.css";

interface HeaderProps {
  setSearchQuery: (query: string) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  onSave: () => void;
}

const Header: React.FC<HeaderProps> = ({
  setSearchQuery,
  editMode,
  setEditMode,
  onSave,
}) => {
  const handleSaveClick = () => {
    onSave();
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  return (
    <Row justify="space-between" align="middle" gutter={16} className="header">
      <Col span={12}>
        <h2 className="collection-title">Collections</h2>
        <h3 className="collection-subtitle">
          Personalised Content Storyboards
        </h3>
      </Col>
      <Col>
        {editMode ? (
          <Row
            gutter={16}
            align="middle"
            justify="start"
            style={{ padding: 10 }}
          >
            <Col>
              <Button
                onClick={handleSaveClick}
                size="large"
                className="header-btn save"
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                onClick={handleCancelClick}
                size="large"
                className="header-btn"
              >
                Cancel
              </Button>
            </Col>
          </Row>
        ) : (
          <>
            <Row
              gutter={16}
              align="middle"
              justify="start"
              style={{ padding: 10 }}
            >
              <Col>
                <Input
                  type="text"
                  placeholder="Type here to search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="large"
                  prefix={<SearchOutlined />}
                  style={{ width: 300, height: "40px" }} // Fixed height for alignment
                />
              </Col>
              <Col>
                <Button
                  icon={
                    <img
                      src="src/assets/wheel.png"
                      alt="wheel"
                      className="header-icon"
                    />
                  }
                  size="large"
                  style={{ height: "40px" }} // Ensure buttons have the same height
                />
              </Col>
            </Row>
            <Row
              gutter={16}
              align="middle"
              justify="start"
              style={{ padding: 10 }}
            >
              <Col>
                <Button
                  size="large"
                  icon={
                    <img
                      src="src/assets/t.png"
                      alt="t"
                      className="header-icon"
                    />
                  }
                  style={{ height: "40px" }}
                  onClick={handleEditClick} // Handle the click event
                />
              </Col>
              <Col>
                <Button
                  size="large"
                  icon={
                    <img
                      src="src/assets/delete.png"
                      alt="delete"
                      className="header-icon"
                    />
                  }
                  style={{ height: "40px" }}
                />
              </Col>
              <Col>
                <Button
                  size="large"
                  icon={
                    <img
                      src="src/assets/copy.png"
                      alt="clipboard"
                      className="header-icon"
                    />
                  }
                  style={{ height: "40px" }}
                />
              </Col>
              <Col>
                <Button
                  size="large"
                  icon={
                    <img
                      src="src/assets/new-collection.png"
                      alt="plus sign"
                      className="header-icon"
                    />
                  }
                  style={{ height: "40px" }}
                >
                  Create new collection
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Header;
