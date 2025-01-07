from flask import Blueprint, jsonify, request
from app.services.selenium_service import login_and_fetch_X_trends
from app.services.mongodb_service import save_to_mongodb, get_all_records
import os

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return "Server is running. Use the endpoints to interact."

@main.route('/fetch_trends', methods=['GET'])
def fetch_trends():
    try:
        data = login_and_fetch_X_trends()
        print("raw_data",data)
        
        if not data or len(data) != 2:
            return jsonify({"error": "Failed to fetch data"}), 500

        ip_address, trends = data

        try:
            object_id = save_to_mongodb(trends, ip_address)
            print("object_id saved to the database: ",object_id)
        except Exception as e:
            return jsonify({"error": f"MongoDB Error: {str(e)}"}), 500

        return jsonify({
            "trends": trends,
            "ip_address": ip_address,
            "object_id": str(object_id),
            "error": "false"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main.route('/dashboard', methods=['GET'])
def dashboard():
    try:
        records = get_all_records()
        print("Records :", records)
        return jsonify({"records": records, "error": "false"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
