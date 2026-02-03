const validateEmail = (Email) => {
    return String(Email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
const validateEmailOrPhone = (value) => {
    if (!value) return false;

    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const phoneRegex = /^0\d{9}$/;

    return emailRegex.test(value) || phoneRegex.test(value);
};
const validatePassword = (Password) => {

    return /[A-Z]/.test(Password) &&
        /[a-z]/.test(Password) &&
        /[0-9]/.test(Password) &&
        /[^A-Za-z0-9]/.test(Password) &&
        Password.length > 4;

}
const validateUsername = (Username) => {
    return Username.length > 4 && Username.length < 20;
}
const validateName = (name) => {
    return name.length <= 255;
}
const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
};

const checkRoleUrlFormat = (roleUrl) => {
    if (!roleUrl || typeof roleUrl !== "string") return null;

    const trimmed = roleUrl.trim();

    /*
        Regex giải thích:
        ^\/                         -> bắt đầu bằng /
        (?:                         -> group không capture
            [a-z0-9-]+              -> segment thường (user, order, item)
            |                       -> HOẶC
            :[a-zA-Z][a-zA-Z0-9_]*  -> param (:id, :userId)
        )
        (?:                         -> các segment tiếp theo
            \/                      -> dấu /
            (?:[a-z0-9-]+|:[a-zA-Z][a-zA-Z0-9_]*)
        )*
        $                           -> kết thúc
    */

    const ROLE_URL_REGEX =
        /^\/(?:[a-z0-9-]+|:[a-zA-Z][a-zA-Z0-9_]*)(?:\/(?:[a-z0-9-]+|:[a-zA-Z][a-zA-Z0-9_]*))*$/;

    if (!ROLE_URL_REGEX.test(trimmed)) {
        return null;
    }

    return trimmed.toLowerCase();
};
const validateMethod = (methodValue) => {
    // 1. Danh sách các method cho phép
    const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']; 

    
    if (!ALLOWED_METHODS.includes(methodValue.toUpperCase())) {
        return false;
    }

   
    return true;
};
export {
    validateEmail, validatePassword, validateUsername,
    validateName, validatePhone, validateEmailOrPhone,
    checkRoleUrlFormat, validateMethod
}