const passwordInput = document.getElementById("password");
const passwordVisibilityImg = document.getElementById("pwd-visibility-img");

passwordVisibilityImg.addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "text";

    if (isPasswordVisible) {
        passwordVisibilityImg.setAttribute("src", "Assets/eye-closed.svg");
        passwordInput.setAttribute("type", "password");
    } else {
        passwordVisibilityImg.setAttribute("src", "Assets/eye-open.svg");
        passwordInput.setAttribute("type", "text");
    }
});
