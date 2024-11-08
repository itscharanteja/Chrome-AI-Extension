(async () => {
  const summarizeButton = document.getElementById("summarizeButton");
  const output = document.getElementById("output");

  const featuresSupported = {
    summarizer: "summarizer" in self.ai,
  };

  if (!featuresSupported.summarizer) {
    document.querySelector(".not-supported-message").hidden = false;
    return; // Exit if summarization is unsupported
  }

  // Function to get the selected text from the active tab
  const getSelectedText = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const response = await chrome.tabs.sendMessage(tab.id, {
      type: "GET_SELECTED_TEXT",
    });
    return response?.text || "";
  };

  // Summarize the selected text when the button is clicked
  summarizeButton.addEventListener("click", async () => {
    const selectedText = await getSelectedText();

    if (selectedText.trim()) {
      output.textContent = "Summarizing...";
      try {
        console.log("Hi");

        const summarizer = await ai.summarizer.create();
        const summary = await summarizer.summarize(selectedText);
        output.textContent = `Summary: ${summary}`;
        summarizer.destroy();
      } catch (error) {
        console.log("Bye2");

        console.error("Summarization error:", error);
        output.textContent = "Failed to summarize. Try again.";
      }
    } else {
      console.log("Bye");

      output.textContent =
        "No text selected! Please select text on the page to summarize.";
    }
  });
})();
