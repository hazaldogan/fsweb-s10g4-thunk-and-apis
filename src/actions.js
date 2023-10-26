import axios from "axios";
import { toast } from "react-toastify";
export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info };
};

export const removeFav = (fav) => {
  toast.warn("Favorilerinizden çıkarıldı!");
  return { type: FAV_REMOVE, payload: fav };
};

export const fetchAnother = () => (dispatch) => {
  dispatch(fetchLoading());
  const loadingToast = toast.loading("Lütfen bekleyin...", {
    autoClose: 2000,
    closeOnClick: true,
  });
  axios
    .get("https://catfact.ninja/fact")
    .then((res) => {
      toast.update(loadingToast, {
        render: "İşlem başarılı!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
      });
      dispatch(fetchSuccess(res.data));
    })
    .catch((err) => {
      toast.update(loadingToast, {
        render: "İşlem başarısız!",
        type: "error",
        isLoading: false,
        closeOnClick: true,
      });
      dispatch(fetchError(err.message));
    });
};

const fetchLoading = () => {
  return { type: FETCH_LOADING };
};
const fetchSuccess = (data) => {
  return { type: FETCH_SUCCESS, payload: data };
};
const fetchError = (message) => {
  return { type: FETCH_ERROR, payload: message };
};
