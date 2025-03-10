import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const newFavsState = [...state.favs, action.payload];
      const newState = { ...state, favs: newFavsState };
      writeFavsToLocalStorage(newState);
      return newState;

    case FAV_REMOVE:
      const removedState = {
        ...state,
        favs: state.favs.filter((f) => f.fact !== action.payload),
      };
      writeFavsToLocalStorage(removedState);
      return removedState;

    case FETCH_SUCCESS:
      return { ...state, current: action.payload, loading: false };

    case FETCH_LOADING:
      return { ...state, loading: true, error: null };

    case FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };

    case GET_FAVS_FROM_LS:
      const lsData = readFavsFromLocalStorage();
      return { ...state, favs: lsData ? lsData : initial.favs };

    default:
      return state;
  }
}
