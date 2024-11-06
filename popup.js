(async () => {
  const input = document.querySelector("textarea");
  const output = document.querySelector("output");
  const form = document.querySelector("form");
  const detected = document.getElementById("detectedLanguage");
  const languageSelect = document.getElementById("language");

  // Check if Summarization, Prompt, and Translation APIs are supported
  const featuresSupported = {
    summarizer: "summarizer" in self.ai,
  };

  // Display message if a feature is unsupported
  if (!featuresSupported.summarizer) {
    document.querySelector(".not-supported-message").hidden = false;
  }

  // Initialize the language detector if supported
  // let detector;
  // if (featuresSupported.translation) {
  //   detector = await self.translation.createDetector();
  // }

  // // Helper function to convert language tags to readable format
  // const languageTagToHumanReadable = (languageTag, targetLanguage) => {
  //   const displayNames = new Intl.DisplayNames([targetLanguage], {
  //     type: "language",
  //   });
  //   return displayNames.of(languageTag);
  // };

  // Language Detection
  // document
  //   .getElementById("detectLanguageButton")
  //   .addEventListener("click", async () => {
  //     if (input.value.trim() && detector) {
  //       const { detectedLanguage, confidence } = (
  //         await detector.detect(input.value.trim())
  //       )[0];
  //       detected.textContent = `${(confidence * 100).toFixed(
  //         1
  //       )}% sure this is ${languageTagToHumanReadable(detectedLanguage, "en")}`;
  //     } else {
  //       detected.textContent =
  //         "No text detected or language detection not available.";
  //     }
  //   });

  // Summarize Text
  document
    .getElementById("summarizeButton")
    .addEventListener("click", async () => {
      if (input.value.trim() && featuresSupported.summarizer) {
        try {
          const summarizer = await ai.summarizer.create();
          const summary = await summarizer.summarize(input.value.trim());
          output.textContent = `Summary: ${summary}`;
          summarizer.destroy();
        } catch (error) {
          console.error("Summarization error:", error);
          output.textContent = "Failed to summarize. Try again.";
        }
      } else {
        output.textContent = "Summarization not supported or no text entered.";
      }
    });

  // Generate Prompt
  // document
  //   .getElementById("promptButton")
  //   .addEventListener("click", async () => {
  //     const promptText = prompt("Enter a prompt for text generation:");
  //     if (promptText && featuresSupported.prompter) {
  //       try {
  //         const promptSession = await ai.prompter.create();
  //         const response = await promptSession.prompt(promptText);
  //         output.textContent = `Generated Text: ${response}`;
  //         promptSession.destroy();
  //       } catch (error) {
  //         console.error("Prompt generation error:", error);
  //         output.textContent = "Failed to generate prompt. Try again.";
  //       }
  //     } else {
  //       output.textContent =
  //         "Prompt generation not supported or prompt not entered.";
  //     }
  //   });

  // Translate Text
  // form.addEventListener("submit", async (e) => {
  //   e.preventDefault();
  //   if (input.value.trim() && detector && featuresSupported.translation) {
  //     try {
  //       const sourceLanguage = (await detector.detect(input.value.trim()))[0]
  //         .detectedLanguage;
  //       if (!["en", "ja", "es"].includes(sourceLanguage)) {
  //         output.textContent =
  //           "Only English ↔ Spanish and English ↔ Japanese supported.";
  //         return;
  //       }

  //       const translator = await self.translation.createTranslator({
  //         sourceLanguage,
  //         targetLanguage: languageSelect.value,
  //       });
  //       output.textContent = await translator.translate(input.value.trim());
  //     } catch (error) {
  //       output.textContent = "Translation failed. Try again.";
  //       console.error("Translation error:", error);
  //     }
  //   } else {
  //     output.textContent = "Translation not supported or no text entered.";
  //   }
  // });
})();
