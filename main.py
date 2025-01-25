import json
from fastapi import FastAPI
from pydantic import BaseModel
from think_tank_crews import IdeaGenerationCrew
from fastapi.middleware.cors import CORSMiddleware


# Initialize FastAPI
app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend's URL in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class TopicInput(BaseModel):
    topic: str

# Endpoint to trigger the crew
@app.post("/generate-ideas/")
async def generate_ideas(input_data: TopicInput):
    crew = IdeaGenerationCrew()
    inputs = {"topic": input_data.topic}

    # Run the crew
    result = crew.think_tank_crew().kickoff(inputs)
    print(result.raw)

    return {"result": json.loads(result.raw.strip("```python\n").strip("```json\n").strip("```"))}
