// Creatives.tsx
import React, { useEffect, useState } from "react";
import "../creative/Creative.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearForm } from "../../store/actions";

interface CreativesProps {
  isDrawerOpen: boolean;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    subtitle: string,
    color: string
  ) => void; // Updated signature
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubtitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onColorChange: (color: string) => void;
  onToggleDrawer: () => void;
  isFormValid: boolean;
  title: string;
  subtitle: string;
  color: string;
}

const Creatives: React.FC<CreativesProps> = ({
  isDrawerOpen,
  onSubmit,
  onTitleChange,
  onSubtitleChange,
  onColorChange,
  onToggleDrawer,
  isFormValid,
  title,
  subtitle,
  color,
}) => {
  const [selectedColor,setSelectedColor] = useState('');
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const [isSubtitleTouched, setIsSubtitleTouched] = useState(false);
  const [isColorTouched, setIsColorTouched] = useState(false);

  const dispatch = useDispatch();
  const colors = useSelector((state: RootState) => state.colors);


  const isSelected = (currentColor:any) =>{
    return currentColor === selectedColor;
  }

  const resetState = () => {
    setSelectedColor('');
    setIsTitleTouched(false);
    setIsSubtitleTouched(false);
    setIsColorTouched(false);
  };
 {/* This component contains many functionality first one a form to add creatives to redux, second handle close drawer, and form validation*/}
  return (
    <section
      className={`creatives-container ${isDrawerOpen ? "active" : "inactive"}`}
    >
      {isDrawerOpen && (
        <div className="drawer">
          <div className="title-wrapper">
            <h1>Creative Creation</h1>
            <button className="cancel-button" onClick={()=>{
              onToggleDrawer();
              dispatch(clearForm());
              resetState();
            }}>
              X
            </button>
          </div>
          <form
            className="form"
            onSubmit={(e) => {
              onSubmit(e, title, subtitle, selectedColor);
              resetState();
            }}
          >
            <div className="input-container">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                placeholder="This is a title!"
                value={title}
                onChange={onTitleChange}
                onBlur={() => setIsTitleTouched(true)}
                required
              />
              {isTitleTouched && title === '' && <span>title is required</span>}
            </div>

            <div className="input-container">
              <label htmlFor="subtitle">Subtitle:</label>
              <input
                type="text"
                id="subtitle"
                placeholder="This is a subtitle!"
                value={subtitle}
                onChange={onSubtitleChange}
                onBlur={() => setIsSubtitleTouched(true)}
                required
              />
              {isSubtitleTouched && subtitle === '' && <span>subtitle is required</span>}
            </div>

            <div className="colors-container">
              <label htmlFor="title">Color</label>
              <div className="colors">
                {colors.map((currentColor, idx) => (
                  <div
                    onClick={() => {
                      onColorChange(`${currentColor}`);
                      setSelectedColor(`${currentColor}`);
                      setIsColorTouched(true);
                    }}
                    key={idx}
                    className="color"
                    style={{ backgroundColor: `${currentColor}`, border: isSelected(currentColor) ? '2px solid blue' : 'none' }}
                  />
                ))}
              </div>
              {isColorTouched && selectedColor === '' && <span>color is required</span>}
            </div>
            <button className="btn" type="submit" disabled={!isFormValid}>
              Done
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Creatives;
