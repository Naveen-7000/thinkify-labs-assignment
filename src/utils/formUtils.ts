// formHandlers.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import * as actions from "../store/actions";

interface FormHandlers {
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubtitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleColorChange: (color: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, title: string, subtitle: string, color: string) => void;
  handleToggleDrawer: () => void;
}

export const useFormHandlers = (): FormHandlers => {
  const dispatch = useDispatch();
  const { title, subtitle, color } = useSelector((state: RootState) => state);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setTitle(e.target.value));
    validateForm(e.target.value);
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setSubtitle(e.target.value));
    validateForm(undefined, e.target.value);
  };

  const handleColorChange = (color:string) => {
    dispatch(actions.setColor(color));
    validateForm(undefined, undefined, color);
  };

  const validateForm = (newTitle?: string, newSubtitle?: string, newColor?: string) => {
    const updatedTitle = newTitle ?? title;
    const updatedSubtitle = newSubtitle ?? subtitle;
    const updatedColor = newColor ?? color;
    dispatch(actions.setFormValid(updatedTitle !== "" && updatedSubtitle !== "" && updatedColor !== ""));
  };

  // this function handles the onSubmit form for creative
  // it stores the creatives and then clears the form states
  // after that closes the drawer
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, title: string, subtitle: string, color: string) => {
    e.preventDefault();
    dispatch(actions.addCreative({ title, subtitle, color }));
    dispatch(actions.clearForm());
    dispatch(actions.toggleDrawer());
  };

  const handleToggleDrawer = () => {
    dispatch(actions.toggleDrawer());
  };

  return {
    handleTitleChange,
    handleSubtitleChange,
    handleColorChange,
    handleSubmit,
    handleToggleDrawer
  };
};
