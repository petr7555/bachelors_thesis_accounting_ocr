from pymagnitude import Magnitude
from pathlib import Path
from emoji_db import categories

docker_path = 'GoogleNews-vectors-negative300.magnitude'
local_path = '~/.magnitude/word2vec_heavy_GoogleNews-vectors-negative300.magnitude'
vec_file_path = docker_path if Path(docker_path).is_file() else local_path

vectors = Magnitude(vec_file_path)


def category(sentence):
    most_similar = vectors.most_similar_to_given(sentence, list(categories.keys()))
    emoji = categories[most_similar]
    return {
        "category": most_similar,
        "emoji": emoji,
    }
