from flask import Flask, request, jsonify
import os
from shoe_recommender import ShoeRecommender  # Import from our module

app = Flask(__name__)

# Load the pre-trained model when the app starts
MODEL_PATH = "shoe_recommender_model.pkl"

# Check if model exists - if not, train it
if not os.path.exists(MODEL_PATH):
    # You could train here or just raise an error
    raise FileNotFoundError(f"Model file {MODEL_PATH} not found. Please train the model first.")

# Load the model
recommender = ShoeRecommender.load_model(MODEL_PATH)
print("Recommender model loaded successfully!")

@app.route('/recommend/<int:shoe_id>', methods=['GET'])
def get_recommendations(shoe_id):
    """API endpoint to get shoe recommendations."""
    # Get parameters from request
    # shoe_id = request.params.shoe_id
    # print(shoe_id)
    # shoe_id = request.args.get('shoe_id', type=int)
    count = request.args.get('count', default=3, type=int)
    
    # Validate parameters
    if shoe_id is None:
        return jsonify({"error": "Missing required parameter: shoe_id"}), 400
    
    # Generate recommendations
    try:
        recommendations = recommender.recommend(shoe_id, n_recommendations=count)
        return jsonify({
            "selected_shoe_id": shoe_id,
            "recommendations": recommendations
        })
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/inventory', methods=['GET'])
def get_inventory():
    """API endpoint to get the full inventory."""
    # Optional pagination parameters
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=20, type=int)
    
    # Calculate start and end indices for pagination
    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page
    
    # Get paginated inventory
    inventory_subset = recommender.shoes_df.iloc[start_idx:end_idx].to_dict('records')
    
    return jsonify({
        "total_items": len(recommender.shoes_df),
        "page": page,
        "per_page": per_page,
        "items": inventory_subset
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)