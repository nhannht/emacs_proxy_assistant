chrome.commands.onCommand.addListener((shortcut) => {
    console.log('lets reload');
    console.log(shortcut);
    if(shortcut.includes("+M")) {
        chrome.runtime.reload();
    }
})