import pandas as pd
import numpy as np
import pickle
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

class ShoeRecommender:
    def __init__(self, n_neighbors=5):
        self.n_neighbors = n_neighbors
        self.shoes_df = None
        self.preprocessor = None
        self.knn_model = None
        
    def fit(self, file_path):
        """Train the recommender system on the provided dataset."""
        # Load and prepare data
        self.shoes_df = self._load_shoe_data(file_path)
        
        # Prepare features
        feature_matrix, self.preprocessor = self._prepare_features(self.shoes_df)
        
        # Build KNN model
        self.knn_model = self._build_knn_model(feature_matrix)
        
        return self
    
    def _load_shoe_data(self, file_path):
        """Load shoe data from CSV file and perform initial preprocessing."""
        shoes_df = pd.read_csv(file_path)
        
        # Check for missing values
        if shoes_df.isnull().sum().any():
            print("Warning: Dataset contains missing values")
            for column in shoes_df.columns:
                if shoes_df[column].dtype in ['int64', 'float64']:
                    shoes_df[column].fillna(shoes_df[column].mean(), inplace=True)
                else:
                    shoes_df[column].fillna(shoes_df[column].mode()[0], inplace=True)
        
        return shoes_df
    
    def _prepare_features(self, shoes_df):
        """Transform raw features into a format suitable for KNN."""
        numeric_features = ['size', 'price', 'rating']
        categorical_features = ['brand', 'style']
        
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), numeric_features),
                ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
            ])
        
        feature_matrix = preprocessor.fit_transform(shoes_df)
        
        return feature_matrix, preprocessor
    
    def _build_knn_model(self, feature_matrix):
        """Create a KNN model for finding similar shoes."""
        knn_model = NearestNeighbors(
            n_neighbors=self.n_neighbors, 
            algorithm='auto', 
            metric='euclidean'
        )
        knn_model.fit(feature_matrix)
        
        return knn_model
    
    def recommend(self, selected_shoe_id, n_recommendations=3):
        """Recommend shoes similar to the selected shoe."""
        if self.knn_model is None:
            raise ValueError("Model has not been trained yet. Call fit() first.")
            
        # Find the index of the selected shoe
        if selected_shoe_id not in self.shoes_df['shoe_id'].values:
            raise ValueError(f"Shoe ID {selected_shoe_id} not found in the dataset")
        
        selected_index = self.shoes_df[self.shoes_df['shoe_id'] == selected_shoe_id].index[0]
        
        # Get the feature vector for the selected shoe
        selected_shoe_features = self.preprocessor.transform(self.shoes_df.iloc[[selected_index]])
        
        # Find nearest neighbors
        distances, indices = self.knn_model.kneighbors(selected_shoe_features)
        
        # Get recommendations (excluding the selected shoe itself)
        recommendations = []
        for i in range(1, min(n_recommendations + 1, len(indices[0]))):
            idx = indices[0][i]
            recommendations.append({
                'shoe_id': int(self.shoes_df.iloc[idx]['shoe_id']),
                'brand': str(self.shoes_df.iloc[idx]['brand']),
                'style': str(self.shoes_df.iloc[idx]['style']),
                'size': float(self.shoes_df.iloc[idx]['size']),
                'price': float(self.shoes_df.iloc[idx]['price']),
                'rating': float(self.shoes_df.iloc[idx]['rating']),
                'similarity_score': float(1 / (1 + distances[0][i]))
            })
        
        return recommendations

    def save_model(self, file_path):
        """Save the trained model to a file using pickle."""
        if self.knn_model is None:
            raise ValueError("Model has not been trained yet. Call fit() first.")
            
        model_data = {
            'shoes_df': self.shoes_df,
            'preprocessor': self.preprocessor,
            'knn_model': self.knn_model,
            'n_neighbors': self.n_neighbors
        }
        
        with open(file_path, 'wb') as f:
            pickle.dump(model_data, f)
            
        print(f"Model successfully saved to {file_path}")
    
    @classmethod
    def load_model(cls, file_path):
        """Load a trained model from a file."""
        with open(file_path, 'rb') as f:
            model_data = pickle.load(f)
        
        recommender = cls(n_neighbors=model_data['n_neighbors'])
        recommender.shoes_df = model_data['shoes_df']
        recommender.preprocessor = model_data['preprocessor']
        recommender.knn_model = model_data['knn_model']
        
        return recommender

# Usage example for training and saving the model
if __name__ == "__main__":
    # Create and train the recommender
    file_path = "new_shoes.csv"  # Replace with your actual file path
    recommender = ShoeRecommender(n_neighbors=5).fit(file_path)
    
    # Test the recommender
    selected_shoe_id = 100  # Replace with an actual shoe ID from your data
    recommendations = recommender.recommend(selected_shoe_id)
    
    print(f"Recommended shoes similar to shoe ID {selected_shoe_id}:")
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec['brand']} {rec['style']} (${rec['price']:.2f}) - Similarity: {rec['similarity_score']:.2f}")
    
    # Save the model
    recommender.save_model("shoe_recommender_model.pkl")
    
    # Example of loading the model
    loaded_recommender = ShoeRecommender.load_model("shoe_recommender_model.pkl")
    print("Model loaded successfully!")