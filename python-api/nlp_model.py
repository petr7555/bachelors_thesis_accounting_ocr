from pymagnitude import Magnitude
from pathlib import Path
from emoji_db import categories

docker_path = 'wiki-news-300d-1M.magnitude'
local_path = '~/.magnitude/wiki-news-300d-1M.magnitude'

if Path(docker_path).is_file():
    print("Running in docker, the model is already downloaded.")
    vectors = Magnitude(docker_path)
elif Path(local_path).expanduser().is_file():
    print("Running locally, the model is already downloaded.")
    vectors = Magnitude(local_path)
else:
    exit("ERROR: Make sure to download the model first from 'http://magnitude.plasticity.ai/fasttext/medium/wiki-news-300d-1M.magnitude'.")
    
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
