from pymagnitude import Magnitude
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
from pathlib import Path

docker_path = 'GoogleNews-vectors-negative300.magnitude'
local_path = '~/.magnitude/word2vec_heavy_GoogleNews-vectors-negative300.magnitude'
vec_file_path = docker_path if Path(docker_path).is_file() else local_path

vectors = Magnitude(vec_file_path)
vectorizer = CountVectorizer(stop_words="english")
# removes punctuation, removes stopwords, splits to words, makes all words lowercase
tokenize = vectorizer.build_analyzer()

def category(sentence):
    tokens = tokenize(sentence)
    mean_vec = np.mean(vectors.query(tokens), axis=0)
    most_similar = vectors.most_similar_to_given(mean_vec, list(categories.keys()))
    emoji = categories[most_similar]
    return {
        "category": most_similar,
        "emoji": emoji,
    }

categories = {
    "television" : "📺",
    "mobile" : "📱",
    "computer" : "💻",
    "watch": "⌚️",
    "camera": "📷",
    "headphones": "🎧",
    "videogame" : "🎮",
    "paper": "📄",
    "pencil": "✏️",
    "shirt": "👕",
    "jeans": "👖",
    "shoes": "👟",
    "coffee": "☕",
    "tea": "🍵",
    "book": "📚",
    "toy": "🧸",
    "bed": "🛏",
}
# TODO get categories and emojis from https://www.walmart.com/
