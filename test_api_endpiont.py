import requests

# Define the API endpoint
url = "http://127.0.0.1:8000/generate-ideas/"

# Define the payload (input topic)
payload = {
    "topic": "Artificial Intelligent Agents"
}

# Make the POST request to the FastAPI endpoint
try:
    print(f"Hitting the FastAPI endpoint: {url} with topic: {payload['topic']}")
    response = requests.post(url, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        print("\nAPI Response:")
        print(response.json())
    else:
        print(f"Failed with status code: {response.status_code}")
        print(response.text)

except requests.exceptions.RequestException as e:
    print(f"An error occurred while making the request: {e}")
