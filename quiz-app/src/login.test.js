import React from "react";
import Login from "./components/loginComponents/loginComponent";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import store from './redux/store/store';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { screen, configure } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import QuizList from './components/quizComponents/quizListComp';
import DoQuiz from './components/quizComponents/doQuizComp';
import Score from './components/quizComponents/scoreComp';
let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});
it("renders with or without a name", () => {
    act(() => {
        render(<Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                </Routes>
            </BrowserRouter></Provider>, container);
    });
    expect(container.textContent).toContain("Locked");
    expect(container.textContent).toContain("Quizzix");
    expect(screen.getByText('Locked')).toHaveAttribute('type', 'submit');
    act(() => {
        render(<Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<QuizList />} />
                </Routes>
            </BrowserRouter></Provider>, container);
    })
    expect(container.textContent).toContain("Quizzix");
    expect(container.textContent).toContain("history");
    act(() => {
        render(<Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<DoQuiz />} />
                </Routes>
            </BrowserRouter></Provider>, container);
    })
    expect(container.textContent).toContain("Quizzix");
    expect(screen.getByText('Locked until you answer all question')).toHaveAttribute('type', 'submit');
    act(() => {
        render(<Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Score />} />
                </Routes>
            </BrowserRouter></Provider>, container);
    })
    expect(container.textContent).toContain("Quizzix");
    expect(screen.getByRole('button', { name: "Click here to submit your test" })).toHaveClass('to-menu-button')
});