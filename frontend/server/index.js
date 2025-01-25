import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/research', (req, res) => {
  const { topic } = req.body;
  
  // Mock response data
  const mockResponse = {
    "ideas": [
      {
        "Title": `AI-Powered Solution for ${topic}`,
        "Description": `Develop an innovative AI-driven solution that addresses key challenges in ${topic}.`,
        "Target Audience": "Enterprise businesses and organizations",
        "Problem Solved": "Improves efficiency and reduces operational costs",
        "Competitors": [
          "Microsoft Azure Solutions",
          "IBM Watson Services",
          "Google Cloud AI"
        ]
      }
    ],
    "impact_metrics": [
      {
        "Market Size": "$5 billion",
        "Beneficiaries": "100 million",
        "Key Outcomes": "30% efficiency improvement, 25% cost reduction"
      }
    ],
    "feasibility": [
      {
        "Feasibility Score": 8,
        "Time to Market": 12,
        "Key Risks": [
          "Technical implementation challenges",
          "Market adoption rate",
          "Regulatory compliance"
        ]
      }
    ]
  };

  res.json(mockResponse);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});