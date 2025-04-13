import { useContext, useState, createContext } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  surveys: [],
  questionTypes: [],
  toast: {
    message: null,
    show: false,
  },
  setCurrentUser: () => {},
  setUserToken: () => {},
});

const tmpSurveys = [];

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("import.meta.env.VITE_LOCALSTORAGE_TOKEN") || ""
  );
  const [surveys, setSurveys] = useState(tmpSurveys);
  const [questionTypes] = useState([
    "text",
    "select",
    "radio",
    "checkbox",
    "textarea",
  ]);
  const [toast, setToast] = useState({ message: "", show: false });

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("import.meta.env.VITE_LOCALSTORAGE_TOKEN", token);
    } else {
      localStorage.removeItem("import.meta.env.VITE_LOCALSTORAGE_TOKEN");
    }
    _setUserToken(token);
  };

  const showToast = (message) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: "", show: false });
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        surveys,
        setSurveys,
        questionTypes,
        toast,
        showToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
