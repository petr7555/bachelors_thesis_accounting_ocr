from pymagnitude import Magnitude
from pymagnitude import MagnitudeUtils
from pathlib import Path
from emoji_db import categories

docker_path = 'GoogleNews-vectors-negative300.magnitude'
local_path = '~/.magnitude/word2vec_medium_GoogleNews-vectors-negative300.magnitude'

if Path(docker_path).is_file():
    print("Running in docker, the model is already downloaded.")
    vectors = Magnitude(docker_path)
elif Path(local_path).expanduser().is_file():
    print("Running locally, the model is already downloaded.")
    vectors = Magnitude(local_path)
else:
    print("Running locally, the model will be downloaded.")
    vectors = Magnitude(MagnitudeUtils.download_model('word2vec/medium/GoogleNews-vectors-negative300'))

def category(sentence):
    most_similar = vectors.most_similar_to_given(sentence, list(categories.keys()))
    emoji = categories[most_similar]
    return {
        "category": most_similar,
        "emoji": emoji,
    }


# the first call of category function takes long,
# call it now so that all subsequent calls (from users) are fast
print("Calling category function for the first time...")
category("cat")
print("First call to category function done.")
