const logout = (setIsLoggedIn, setUserRole) => {
    // Remove user data from localStorage
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");

    // Optionally, reset any relevant state if you are using useState for isLoggedIn and userRole
    setIsLoggedIn(false);
    setUserRole(null);

    // Redirect to login page
    window.location.href = "/";  // Or you can use useNavigate() if you're inside a component
};

export default logout;
