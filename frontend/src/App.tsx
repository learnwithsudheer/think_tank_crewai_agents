import React, { useState } from 'react';
import { Search, BookOpen, Brain, CheckCircle, Loader2, Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface IdeaItem {
  Title: string;
  Description: string;
  "Target Audience": string;
  "Problem Solved": string;
  Competitors: string[];
  impact_metrics: {
    "Market Size": string;
    Beneficiaries: string;
    "Key Outcomes": string;
  }[];
  feasibility: {
    "Feasibility Score": number;
    "Time to Market": number;
    "Key Risks": string[];
  }[];
}

interface ApiResponse {
  result: {
    ideas: IdeaItem[];
  };
}

function App() {
  const [ideas, setIdeas] = useState<IdeaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchResearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/generate-ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: query }),
      });
      const data: ApiResponse = await response.json();
      setIdeas([...data.result.ideas, ...ideas]);
    } catch (error) {
      console.error('Error fetching research:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchResearch(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Think Tank Buddy</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl text-black font-medium mb-2">Welcome to your personal ideation companion!</h2>
          <p className="text-gray-700">Let's explore, brainstorm, and generate innovative ideas together. Share a topic, and I'll help you uncover its full potential.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter a topic to research..."
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent shadow-sm"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Researching...
                </>
              ) : (
                'Research'
              )}
            </button>
          </div>
        </form>

        <div className="space-y-8">
          {ideas.map((idea, ideaIndex) => (
            <div key={ideaIndex} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 last:border-0">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-black mb-4">{idea.Title}</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-5 w-5 text-gray-700" />
                          <h3 className="text-lg font-medium text-black">Description</h3>
                        </div>
                        <p className="text-gray-600">{idea.Description}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-5 w-5 text-gray-700" />
                          <h3 className="text-lg font-medium text-black">Target Audience</h3>
                        </div>
                        <p className="text-gray-600">{idea["Target Audience"]}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-gray-700" />
                          <h3 className="text-lg font-medium text-black">Problem Solved</h3>
                        </div>
                        <p className="text-gray-600">{idea["Problem Solved"]}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-5 w-5 text-gray-700" />
                          <h3 className="text-lg font-medium text-black">Competitors</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {idea.Competitors.map((competitor, i) => (
                            <li key={i}>{competitor}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-5 w-5 text-gray-700" />
                          <h3 className="text-lg font-medium text-black">Impact Metrics</h3>
                        </div>
                        <div className="space-y-2 text-gray-600">
                          <p>Market Size: {idea.impact_metrics[0]["Market Size"]}</p>
                          <p>Beneficiaries: {idea.impact_metrics[0].Beneficiaries}</p>
                          <p>Key Outcomes: {idea.impact_metrics[0]["Key Outcomes"]}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-gray-700" />
                          <h3 className="text-lg font-medium text-black">Feasibility</h3>
                        </div>
                        <div className="space-y-2 text-gray-600">
                          <p>Score: {idea.feasibility[0]["Feasibility Score"]}/10</p>
                          <p>Time to Market: {idea.feasibility[0]["Time to Market"]} months</p>
                          <div className="mt-2">
                            <p className="font-medium mb-1 text-black">Key Risks:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {idea.feasibility[0]["Key Risks"].map((risk, i) => (
                                <li key={i}>{risk}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {ideas.length === 0 && !loading && (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black">No research topics yet</h3>
            <p className="text-gray-600">Enter a topic above to start researching</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;