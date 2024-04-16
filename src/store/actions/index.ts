import { createAction } from "@reduxjs/toolkit";

interface Creative {
  title: string;
  subtitle: string;
  color: string;
}

interface Colors {
  color: string;
}

export const toggleDrawer = createAction<void>("TOGGLE_DRAWER");
export const setTitle = createAction<string>("SET_TITLE");
export const setSubtitle = createAction<string>("SET_SUBTITLE");
export const setColor = createAction<string>("SET_COLOR");
export const setFormValid = createAction<boolean>("SET_FORM_VALID");
export const clearForm = createAction<void>("CLEAR_FORM");
export const addCreative = createAction<Creative>("ADD_CREATIVE");
export const addColors = createAction<Colors[]>("ADD_COLORS");
