const CONTEXT_MENU_ID = "MARKDOWN_IMAGE_RESIZER_CONTEXT_MENU";

chrome.contextMenus.create({
  title: "Replace Image Tag",
  contexts: ["selection"],
  id: CONTEXT_MENU_ID,
});

function modifyText(selectionText) {
  const REG_EXP = /!\[(.*)\]\((.*)\)/gm;
  const PATTERN_STR = '<img src="$2" width="300" />';

  let modifiedText = '';
  if (selectionText.search(REG_EXP) >= 0) {
    modifiedText = selectionText.replace(REG_EXP, PATTERN_STR);
    document.execCommand("insertText", false, modifiedText);
  } else {
    alert('No image found in the selected text');
  }
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== CONTEXT_MENU_ID || tab.url.includes('chrome://')) {
    return;
  }

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: modifyText,
    args: [info.selectionText]
  });
});
