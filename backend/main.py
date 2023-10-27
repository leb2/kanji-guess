from fastapi import FastAPI

app = FastAPI()

words = ["apple", "banana", "cherry", "date"]  # Sample words, replace with your list

@app.get("/word/{index}")
def get_word(index: int):
    if index < len(words):
        return {"word": words[index]}
    return {"error": "Index out of range"}