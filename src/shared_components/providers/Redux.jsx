import React from 'react'
import { Provider } from "react-redux";
import store from "../../redux/store";


function Redux({children}) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default Redux