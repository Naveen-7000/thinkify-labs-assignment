// App.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../src/store/store";
import Filter from "./components/filter/Filter";
import Creatives from "./components/creative/Creative";
import "../src/App.css";
import { useFormHandlers } from "./utils/formUtils";

const App: React.FC = () => {
  const { isDrawerOpen, title, subtitle, color, isFormValid } = useSelector((state: RootState) => state);
  const { handleTitleChange, handleSubtitleChange, handleColorChange, handleSubmit, handleToggleDrawer } = useFormHandlers();

  return (
    <div className="wrapper">
      {/* Component for filter and render creatives */}
      <Filter
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={handleToggleDrawer}
      />
      {/* Component for handling creatives add form */}
      <Creatives
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={handleToggleDrawer}
        onSubmit={(e) => handleSubmit(e, title, subtitle, color)}
        onTitleChange={handleTitleChange}
        onSubtitleChange={handleSubtitleChange}
        onColorChange={handleColorChange}
        isFormValid={isFormValid}
        title={title}
        subtitle={subtitle}
        color={color}
      />
    </div>
  );
};

export default App;
