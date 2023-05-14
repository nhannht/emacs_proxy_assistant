import * as readability from '@mozilla/readability';
import axios from "axios";

function capture() {
    const documentClone = document.cloneNode(true);
    const article = new readability.Readability(documentClone).parse();
    console.log(article)
    return article
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "capture") {
        const captureContent = capture()
        console.log(captureContent)
        sendResponse({message: "captureSuccess", data: captureContent})

    }
})