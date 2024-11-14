import React, { useState, useEffect } from "react";
import "../styles/card.css";

interface CollectionCardProps {
  id: number;
  title: string;
  subtitle: string;
  thumbnail?: string; // Optional prop for thumbnail image
  editMode: boolean;
  onSave: (id: number, newTitle: string) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  id,
  title,
  subtitle,
  thumbnail,
  editMode,
  onSave,
}) => {
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    if (editMode) {
      setNewTitle(title); // Prefill input with card meta title
    }
  }, [editMode, title]);

  return (
    <div className="collection-card-container">
      <div className="image-container">
        <img
          alt={title}
          src={`src/assets/${thumbnail}`} // Ensure this path is correct
          className="card-image"
        />
      </div>
      <div className="card-meta">
        {editMode ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="card-input"
          />
        ) : (
          <>
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionCard;
