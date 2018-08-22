chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("something happening from the extension");
    var data = request.data || {};

    var linksList = document.querySelectorAll('a');
    [].forEach.call(linksList, function(header) {
        header.innerHTML = request.data;
    });
    sendResponse({data: data, success: true});
});


const anchor = document.createElement('div');
anchor.id = 'wc-anchor';
anchor.innerText = 'hello';

document.body.insertBefore(anchor, document.body.childNodes[0]);