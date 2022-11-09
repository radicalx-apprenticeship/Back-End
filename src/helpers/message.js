module.exports = {
    SUCCESS_ADD: "Apprenticeship has been created!",
    SUCCESS_UPDATE: "Apprenticeship has been updated!",
    SUCCESS_READ: "Apprenticeship has been read!",
    SUSCCESS_DELETE:"Apprenticeship has been removed!",
    AUTH_FAIL: "You're not authorized to access this content.",
    NOT_FOUND_FAIL: "You're trying to access a resource that doesn't exist!",
    SYNTAX_FAIL: "Hold on, you have a syntax error on the body, make sure it's a valid JSON.",
    NOT_ALLOWED_UPLOAD: "You can't upload this type of content, please check the docs.",
    UNEXPECTED_UPLOAD: "Unexpected error while attempting to upload this content, check the size and ext.",
    INTERNAL_ERROR: "Unexpected error with the server, due to some internal failures.",
    SUSCCESS_DELETE_MEDIA: function (name) {
        return `${name} has been deleted sucessfully.`
    },
    SUCCESS_UPLOAD: function (type) {
        return `${type} has been uploaded sucessfully to the server.`
    }
}
