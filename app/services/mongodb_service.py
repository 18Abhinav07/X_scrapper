from pymongo import MongoClient
from datetime import datetime
from app.config import Config
from urllib.parse import quote_plus

USERNAME = quote_plus(Config.MONGO_USERNAME)
PASSWORD = quote_plus(Config.MONGO_PASSWORD)
MONGODB_URI = f"mongodb+srv://{USERNAME}:{PASSWORD}@temporary.whk7x.mongodb.net/?retryWrites=true&w=majority&appName=Temporary"
DB_NAME = Config.DB_NAME
COLLECTION_NAME = Config.COLLECTION_NAME

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

def get_all_records():
    try:
        global client, db, collection
        # Check if client is closed and reconnect if necessary
        print("Checking records.")
        print("Client: ",client)
        if not client.is_primary:  
            client = MongoClient(MONGODB_URI)
            print("Client: ",client)
            db = client[DB_NAME]
            collection = db[COLLECTION_NAME]
        
        records = list(collection.find())
        
        # Convert ObjectId to string 
        for record in records:
            record['_id'] = str(record['_id'])
        
        return records
    except Exception as e:
        print(f"Error retrieving records from MongoDB: {e}")
        return []

def save_to_mongodb(trends, ip_address):
    try:
        global client, db, collection

        if not client.is_primary:
            client = MongoClient(MONGODB_URI)
            db = client[DB_NAME]
            collection = db[COLLECTION_NAME]

        document = {
            "trends": trends,
            "timestamp": datetime.now(),
            "ip_address": ip_address
        }
        result = collection.insert_one(document)
        print("result of the insertion: ",result)
        return result.inserted_id
    except Exception as e:
        print(f"Error saving to MongoDB: {e}")
        return None
