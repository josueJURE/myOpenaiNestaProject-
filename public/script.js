const userInput = document.getElementById("input");
const btn = document.getElementById("btn");


btn.addEventListener("click", async () => {
    console.log(userInput.value);
  
    try {
      const response = await fetch("/userInput", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: userInput.value }),
      });
  
      // Optionally handle the server response
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending input:", error);
    }
  });
  