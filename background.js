// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: "#3aa757" }, () => {
    console.log("The color is green");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "www.google.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.windows.create(
    {
      url: "localhost:3000",
      type: "popup"
    },
    () => {
      console.log("Window opene");
    }
  );
});

const anchor = document.createElement('div');
anchor.id = 'wc-anchor';
anchor.innerText = 'hello';

document.body.insertBefore(anchor, document.body.childNodes[0]);
