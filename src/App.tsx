import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { RouterProvider } from 'react-router-dom';
import routers from './router';
function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={routers}></RouterProvider>
		</Provider>
	);
}

export default App;
