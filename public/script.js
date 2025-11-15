const userInput = document.getElementById("input");
const btn = document.getElementById("btn");
const responseDiv = document.getElementById("response");


btn.addEventListener("click", async () => {
    console.log(userInput.value);

    // Show loading message
    responseDiv.textContent = "Loading...";
    responseDiv.className = "loading";
    btn.disabled = true;

    try {
      const response = await fetch("/userInput", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: userInput.value }),
      });

      const data = await response.json();
      console.log(data);

      // Display the AI response
      if (data.response) {
        responseDiv.textContent = data.response;
        responseDiv.className = "";
      } else if (data.error) {
        responseDiv.textContent = "Error: " + data.error;
        responseDiv.className = "error";
      }
    } catch (error) {
      console.error("Error sending input:", error);
      responseDiv.textContent = "Error: " + error.message;
      responseDiv.className = "error";
    } finally {
      btn.disabled = false;
    }
  });
