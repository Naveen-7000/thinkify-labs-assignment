import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "../filter/Filter.css";
import { addColors } from "../../store/actions";

interface FilterProps {
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
}

const Filter: React.FC<FilterProps> = ({
  isDrawerOpen,
  onToggleDrawer,
}) => {
  const dispatch = useDispatch();
  const creatives = useSelector((state: RootState) => state.creatives);
  const [filteredCreatives, setFilteredCreatives] = useState(creatives);
  const colors = useSelector((state:RootState) => state.colors)
  const [color, setColor] = useState('');
  const [filterKey,setFilterKey] = useState('');


  const handleFilterKeyChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFilterKey(e.target.value);
  }

  const handleColorsChange = (color:string) =>{
    setColor(color);
  }

// this is for rendering the selected color by highlighting borders
  const isSelected = (currentColor:any) =>{
    return currentColor === color;
  }


  const fetchColor = async () => {
    const res = await fetch(
      "https://random-flat-colors.vercel.app/api/random?count=5"
    );
    const data = await res.json();
    dispatch(addColors(data?.colors));
  };

  useEffect(() => {
    const filtered = creatives.filter((creative) => {
      const titleMatch =
        !filterKey ||
        creative.title.toLowerCase().includes(filterKey.toLowerCase()) ||
        creative.subtitle.toLowerCase().includes(filterKey.toLowerCase());
      const colorMatch =
        !color || creative.color.toLowerCase() === color.toLowerCase();
      return titleMatch && colorMatch;
    });
    
    // Check if color and filterKey are empty strings because if they are empty then no need to show the empty filtered array
    if (color === '' && filterKey === '') {
      setFilteredCreatives(creatives);
    } else {
      setFilteredCreatives(filtered);
    }
  }, [creatives, filterKey, color]);
  

  useEffect(() => {
    fetchColor();
  }, []);

   {/* This component responsible to render the creatives preview card and also shows the filter ui with filter based on color and title/subtitle also i have added reset button to reset the filter as well added a edge cases of title/subtitle is empty then reset the filtered creatives to original*/}

  return (
    <aside className={`filter-container ${!isDrawerOpen ? "full-width" : ""}`}>
      <div className="filter-wrapper">
        <h1>Filter by:</h1>
        <div className="input-wrapper">
          <div className="colors-container">
            <label htmlFor="title">Color</label>
            <div className="colors">
              {colors?.map((color, idx) => (
                <div
                  onClick={() => {
                    handleColorsChange(`${color}`);
                  }}
                  key={idx}
                  className={`color `}
                  style={{ backgroundColor: `${color}`,border: isSelected(`${color}`) ? '2px solid black' : 'none', }}
                />
              ))}
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="title">Title / Subtitle</label>
            <input
              type="text"
              value={filterKey}
              onChange={(e)=>handleFilterKeyChange(e)}
              placeholder="Enter title or subtitle..."
              // disabled={isDrawerOpen}
            />
          </div>
        </div>

        <button className="btn"
        disabled={color === '' && filterKey === ''}
        onClick={()=>{
          setColor('');
          setFilterKey('');
        }} >Reset</button>

        <div className="progressive-container">
          <div className="progressive-wrapper">
            <div
              style={{ width: `${(creatives.length / 5) * 100}%` }}
              className={`progress`}
            ></div>
          </div>
          <p>{creatives?.length}/5 Creatives</p>
        </div>

        {/* Button to add more creatives */}
        <button
          className="btn"
          onClick={onToggleDrawer}
          disabled={isDrawerOpen || creatives.length === 5}
        >
          Add Creative
        </button>

        {/* Render filtered creatives */}
        <div className="creative-list">
          {filteredCreatives?.length > 0 ? filteredCreatives.map((creative, index) => (
            <div
              className="creative"
              key={index}
              style={{ backgroundColor: creative.color }}
            >
              <h2>{creative.title}</h2>
              <p>{creative.subtitle}</p>
            </div>
          )) : (
            <div
            >
              {
                filterKey ||  color ? 
                <p>No matching creatives found!</p> : null
              }
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Filter;
