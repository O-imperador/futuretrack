from flask import Flask, request, jsonify
from flask_cors import CORS  
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import KNeighborsClassifier

app = Flask(__name__)
CORS(app)  

def get_career_recommendation(sample):
    df = pd.read_csv("./Data_final.csv")
    X = df.drop('Career', axis=1)
    y = df['Career']
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    model = KNeighborsClassifier(n_neighbors=5)
    model.fit(X, y_encoded)

    distances, indices = model.kneighbors(sample)
    nearest_careers = label_encoder.inverse_transform(y_encoded[indices[0]])

    career_results = []
    for rank, (career, distance) in enumerate(zip(nearest_careers, distances[0]), start=1):
        career_results.append({'rank': rank, 'career': career, 'distance': distance})

    return career_results

@app.route('/get-career-recommendation', methods=['POST'])
def get_recommendation():
    data = request.json
    sample = [data['sample']]
    recommendations = get_career_recommendation(sample)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
