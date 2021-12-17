function createMessage(message = "An error occured.") {
    const html = `<div class="error">${message}</div>`;
    return html;
}