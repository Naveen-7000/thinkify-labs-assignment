// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../actions/index";

interface Creative {
  title: string;
  subtitle: string;
  color: string;
}

interface Colors {
  color: string;
}

// Api returning new colors on every fetch thats why I have to replace 
// each result with previous so that they don't keep adding colors in array
const addColorReducer = createReducer<Colors[]>([], (builder) => {
  builder.addCase(actions.addColors, (state, action) => {
    return action.payload;
  });
});

const creativesReducer = createReducer<Creative[]>([], (builder) => {
  builder.addCase(actions.addCreative, (state, action) => {
    state.push(action.payload);
  });
});

const isDrawerOpenReducer = createReducer(false, (builder) => {
  builder.addCase(actions.toggleDrawer, (state) => !state);
});

const titleReducer = createReducer("", (builder) => {
  builder
    .addCase(actions.setTitle, (state, action) => action.payload)
    .addCase(actions.clearForm, () => "");
});

const subtitleReducer = createReducer("", (builder) => {
  builder
    .addCase(actions.setSubtitle, (state, action) => action.payload)
    .addCase(actions.clearForm, () => "");
});

const colorReducer = createReducer("", (builder) => {
  builder
    .addCase(actions.setColor, (state, action) => action.payload)
    .addCase(actions.clearForm, () => "");
});

const isFormValidReducer = createReducer(false, (builder) => {
  builder.addCase(actions.setFormValid, (state, action) => action.payload);
});

const rootReducer = combineReducers({
  creatives: creativesReducer,
  isDrawerOpen: isDrawerOpenReducer,
  title: titleReducer,
  subtitle: subtitleReducer,
  color: colorReducer,
  isFormValid: isFormValidReducer,
  colors: addColorReducer,
});

export default rootReducer;
