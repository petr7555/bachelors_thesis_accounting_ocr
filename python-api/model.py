from pymagnitude import Magnitude
vectors = Magnitude('GoogleNews-vectors-negative300.magnitude')

def similarity(word1, word2):
    return vectors.similarity(word1, word2)

def category(word):
    most_similar = vectors.most_similar_to_given(word, list(categories.keys()))
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
