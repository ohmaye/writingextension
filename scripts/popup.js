document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("status").textContent = "Extension loaded";
  var button = document.getElementById("changelinks");
  button.addEventListener("click", function() {
    chrome.windows.create({ url: "localhost:3000", type: "popup" });

    $("#status").html("Clicked change links button");
    var text = $("#linkstext").val();
    if (!text) {
      $("#status").html("Invalid text provided");
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: text }, function(response) {
        $("#status").html("Changed data in page");
        console.log("success");
      });
    });
  });
});

let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.backgroundColor = "' + color + '";'
    });
  });
};
