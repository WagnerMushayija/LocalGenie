import requests
from dotenv import load_dotenv
import os
load_dotenv()

api_key = os.getenv('RAPIDAPI_KEY')
api_host = os.getenv('RAPIDAPI_HOST')
def send_request_gpt(query):
    url = f'https://{api_host}/gpt4'
    headers = {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': api_host,
        'Content-Type': 'application/json'
    }
    data = {
        "messages": [{"role": "user", "content": query}],
        "web_access": True
    }

# Sending the API request
    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        # Parsing the response (no "choices", using "result" instead)
        data = response.json()
        return data.get("result", "No response available.")
    else:
        return "❌ Error: Unable to get a valid response."

# Example usage
user_input = input("What would you like to ask the model? ")
response = send_request_gpt(user_input)
print("Model's response:", response)