from pymagnitude import Magnitude
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

vectors = Magnitude('GoogleNews-vectors-negative300.magnitude')
vectorizer = CountVectorizer(stop_words="english")
# removes punctuation, removes stopwords, splits to words, makes all words lowercase
tokenize = vectorizer.build_analyzer()

def similarity(word1, word2):
    return vectors.similarity(word1, word2)

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
}
# TODO get categories and emojis from https://www.walmart.com/
