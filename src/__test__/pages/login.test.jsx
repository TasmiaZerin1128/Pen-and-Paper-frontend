// import { fireEvent, render, screen } from "@testing-library/react";
// import {beforeEach, describe, expect, test} from 'vitest';
// import React from "react";
// import { act } from "react-dom/test-utils";
// import { MemoryRouter, Route } from "react-router-dom";
// import { AuthContext } from "../../contexts/Contexts";
// import Login from "../../pages/login/login";
// import { login } from "../../services/auth";
// import { showToast } from "../../services/toast";

// describe("Login", () => {
//   beforeEach(() => {
//     jest.spyOn(console, "error").mockImplementation(() => {}); // Ignore console errors/warnings

//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//     // console.error.mockRestore(); // Restore console.error to its original implementation
//     // showToast.showToast.mockRestore(); // Restore showToast function to its original implementation
//   });

//   test("should render the login form", () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     const usernameInput = screen.getByLabelText("Username");
//     expect(usernameInput).toBeInTheDocument();

//     const passwordInput = screen.getByLabelText("Password");
//     expect(passwordInput).toBeInTheDocument();

//     const loginButton = screen.getByRole("button", { name: "Login" });
//     expect(loginButton).toBeInTheDocument();

//     const signUpLink = screen.getByText("Sign Up");
//     expect(signUpLink).toBeInTheDocument();
//   });

//   test("should display login status message when error is true", () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     const errorMessage = "Invalid username or password";
//     const loginStatus = screen.getByText(errorMessage);
//     expect(loginStatus).toBeInTheDocument();
//     expect(loginStatus).toHaveStyle({ visibility: "visible" });
//   });

//   it("should call login function and navigate to dashboard when login is successful", async () => {
//     const mockLogin = jest
//       .spyOn(login, "login")
//       .mockResolvedValue({ status: 200 });

//     const setStatusSignedIn = jest.fn();

//     await act(async () => {
//       render(
//         <MemoryRouter initialEntries={["/login"]}>
//           <Route path="/dashboard">
//             <div>Dashboard Page</div>
//           </Route>
//           <AuthContext.Provider value={{ setStatusSignedIn }}>
//             <Login />
//           </AuthContext.Provider>
//         </MemoryRouter>
//       );
//     });

//     const usernameInput = screen.getByLabelText("Username");
//     const passwordInput = screen.getByLabelText("Password");
//     const loginButton = screen.getByRole("button", { name: "Login" });

//     fireEvent.change(usernameInput, { target: { value: "testuser" } });
//     fireEvent.change(passwordInput, { target: { value: "password" } });

//     await act(async () => {
//       fireEvent.click(loginButton);
//     });

//     expect(mockLogin).toHaveBeenCalledWith({
//       username: "testuser",
//       password: "password",
//     });
//     expect(setStatusSignedIn).toHaveBeenCalled();

//     const dashboardPage = screen.getByText("Dashboard Page");
//     expect(dashboardPage).toBeInTheDocument();

//     mockLogin.mockRestore();
//   });
});
