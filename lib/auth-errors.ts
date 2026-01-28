export function getAuthErrorMessage(code?: string) {
    switch (code) {
        case "auth/network-request-failed":
            return "Network error. Please check your connection.";
        case "auth/invalid-verification-code":
            return "Incorrect code. Please try again.";
        case "auth/code-expired":
            return "This code has expired. Request a new one.";
        case "auth/too-many-requests":
            return "Too many attempts. Try again later.";
        default:
            return "Something went wrong. Please try again.";
    }
}
