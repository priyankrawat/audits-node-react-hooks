import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();

const createStore = (WrappedComponent) => {
  return function StoreProvider(props) {
    const [state, setState] = useState({});

    const store = {
      get: (key) => state[key],
      set: (key, value) => setState(prevState => ({ ...prevState, [key]: value })),
      remove: (key) => {
        const newState = { ...state };
        delete newState[key];
        setState(newState);
      },
    };

    return (
      <StoreContext.Provider value={store}>
        <WrappedComponent store={store} {...props} />
      </StoreContext.Provider>
    );
  };
};

const withStore = (WrappedComponent) => {
  return function Wrapper(props) {
    const store = useContext(StoreContext);
    return <WrappedComponent store={store} {...props} />;
  };
};

export { StoreContext, createStore, withStore };
