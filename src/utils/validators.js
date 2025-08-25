const validateEmail = (Email) => {
    return String(Email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

}
const validatePassword=(Password) =>{

    return /[A-Z]/.test(Password) &&
           /[a-z]/.test(Password) &&
           /[0-9]/.test(Password) &&
           /[^A-Za-z0-9]/.test(Password) &&
           Password.length > 4;

}
const validateUsername=(Username)=>{
    return Username.length>4;
}
const validateNameQuiz=(name)=>{
    return name.length>5;
}

export { validateEmail ,validatePassword,validateUsername,
        validateNameQuiz

}