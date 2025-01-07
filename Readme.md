# Twitter Trends Fetcher

A Flask web application that fetches and displays the top 5 trending topics from Twitter using Selenium for web scraping and MongoDB for data storage.

## Features

- Fetches current trending topics from Twitter
- Displays trends in a clean web interface
- Stores trend data in MongoDB with associated IP addresses
- Uses proxy support for reliable scraping using proxymesh

## Prerequisites

- Python 3.10.12
- Chrome browser and web driver installed
- MongoDB instance (Atlas)
- Twitter account credentials
- Proxy server details (ProxyMesh)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
cd frontend
npm install
```

4. Create a `.env` file in the root directory and fill in your credentials:

```plaintext
PROXY_USERNAME = "your_proxy_username"
PROXY_PASSWORD = "your_proxy_password"
PROXY_HOST = "your_proxy_host"
PROXY_PORT = "your_proxy_port"
TWITTER_USERNAME = "your_twitter_username"
TWITTER_PASSWORD = "your_twitter_password"
TWITTER_EMAIL = "your_twitter_email"
```
The Mongo URI needs to be entered in the mongodb_service.py file

## Running the Application

1. Ensure all environment variables are properly set in the `.env` file

2. Start the Flask application:

```bash
python run.py
```

   Start the Frontend

```bash
npm run dev
```

3. Open your web browser and navigate to:

```
http://localhost:5173
```

# Project Finalization Screenshots

Here are the screenshots captured during the project finalization process:

![Screenshot 1](./images/Screenshot_from_2025-01-07_16-30-49.png)

![Screenshot 2](./images/Screenshot_from_2025-01-07_16-30-56.png)

![Screenshot 3](./images/Screenshot_from_2025-01-07_17-38-24.png)

![Screenshot 4](./images/Screenshot_from_2025-01-07_17-38-29.png)

![Screenshot 5](./images/Screenshot_from_2025-01-07_17-38-41.png)

![Screenshot 6](./images/Screenshot_from_2025-01-07_17-39-06.png)

![Screenshot 7](./images/Screenshot_from_2025-01-07_17-39-47.png)

![Screenshot 8](./images/Screenshot_from_2025-01-07_17-40-43.png)

![Screenshot 9](./images/Screenshot_from_2025-01-07_17-41-02.png)


## Usage

1. Open the homepage in your web browser
2. Click the "Fetch Latest Trends" button
3. The application will:
   - Log into Twitter using provided credentials
   - Fetch the current trending topics
   - Store the data in MongoDB
   - Display the trends on the webpage

## Error Handling

The application handles various error scenarios:

- Various Login flows by twitter
- Failed Twitter login attempts
- MongoDB connection problems
- Proxy configuration errors and IP rotation using Proxymesh

Error messages will be displayed on the web interface if any issues occur.
