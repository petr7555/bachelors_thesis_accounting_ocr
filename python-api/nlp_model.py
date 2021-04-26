from pymagnitude import Magnitude
from pathlib import Path
from emoji_db import categories

# 'light' | 'medium' | 'heavy', see https://github.com/plasticityai/magnitude#pre-converted-magnitude-formats-of-popular-embeddings-models
model_type = 'light'
docker_path = 'GoogleNews-vectors-negative300.magnitude'
local_path = f'~/.magnitude/word2vec_{model_type}_GoogleNews-vectors-negative300.magnitude'

if Path(docker_path).is_file():
    print("Running in docker, the model is already downloaded.")
    vectors = Magnitude(docker_path)
elif Path(local_path).expanduser().is_file():
    print("Running locally, the model is already downloaded.")
    vectors = Magnitude(local_path)
else:
    exit(f"ERROR: Make sure to download the model first from 'http://magnitude.plasticity.ai/word2vec/{model_type}/GoogleNews-vectors-negative300.magnitude'.")
    
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
