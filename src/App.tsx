import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import EditItem from "./routes/editItem";
import ItemDetails from "./routes/ItemDetails";
import ItemList from "./routes/ItemList";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<ItemList />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </Router>
  );
}

export default App;
