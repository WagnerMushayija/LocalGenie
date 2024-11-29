document.getElementById('aiForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userInput = document.getElementById('userInput').value;
    const action = document.getElementById('action').value;

    const formContainer = document.querySelector('.form-container');
    const responseText = document.getElementById('responseText');
    const loadingBarContainer = document.getElementById('loadingBarContainer');
    const loadingBar = document.getElementById('loadingBar');

    if (action && userInput) {
        try {
            // Show loading bar
            formContainer.style.transform = 'scale(1.1)';
            loadingBarContainer.style.display = 'block';
            loadingBar.style.width = '0';

            // Make the API request
            const result = await fetch('/api/send-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userInput })
            });

            const response = await result.json();

            // Hide loading bar and show response
            formContainer.style.transform = 'scale(1)';
            loadingBarContainer.style.display = 'none';

            if (response && response.result) {
                responseText.textContent = response.result;
            } else {
                responseText.textContent = "Sorry, there was an issue processing your request.";
            }
        } catch (error) {
            console.error('Error:', error);
            formContainer.style.transform = 'scale(1)';
            loadingBarContainer.style.display = 'none';
            responseText.textContent = "An error occurred while fetching the response.";
        }
    } else {
        responseText.textContent = "Please select an action and enter a query.";
    }
});
