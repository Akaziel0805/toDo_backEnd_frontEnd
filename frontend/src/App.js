import React from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TodoListPage from "./pages/TodoListPage";
import LoginPage from "./pages/LoginPage";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/todo" element={<TodoListPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
