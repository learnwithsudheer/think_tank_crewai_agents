import json
from crewai import Agent, Crew, Task, Process
from crewai.project import CrewBase, agent, task, crew
from setup_tools import get_serper_tool, get_websearch_tool


@CrewBase
class IdeaGenerationCrew:
    """Idea Generation Crew to scout, analyze, and evaluate ideas in a given topic."""

    # Paths to configuration files for agents and tasks
    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    # -----------------------------------
    # Agents
    # -----------------------------------

    @agent
    def idea_scout(self) -> Agent:
        """
        Agent responsible for scouting innovative ideas.
        Tools: SerperTool (structured web search), WebSearchTool (general search).
        """
        return Agent(
            config=self.agents_config['idea_scout'],
            verbose=True,
            tools=[get_serper_tool(), get_websearch_tool()]
        )

    @agent
    def context_analyzer(self) -> Agent:
        """
        Agent responsible for analyzing ideas and enriching them with
        contextual details (e.g., audience, competitors).
        Tool: WebSearchTool for supplementary data retrieval.
        """
        return Agent(
            config=self.agents_config['context_analyzer'],
            verbose=True,
            tools=[get_websearch_tool()]
        )

    @agent
    def impact_estimator(self) -> Agent:
        """
        Agent responsible for estimating the market impact of ideas.
        No external tools required.
        """
        return Agent(
            config=self.agents_config['impact_estimator'],
            verbose=True
        )

    @agent
    def turnaround_evaluator(self) -> Agent:
        """
        Agent responsible for evaluating feasibility and time-to-market.
        No external tools required.
        """
        return Agent(
            config=self.agents_config['turnaround_evaluator'],
            verbose=True
        )

    @agent
    def report_generator(self) -> Agent:
        """
        Agent responsible for compiling all outputs into a structured report.
        No external tools required.
        """
        return Agent(
            config=self.agents_config['report_generator'],
            verbose=True
        )

    # -----------------------------------
    # Tasks
    # -----------------------------------

    @task
    def idea_scouting_task(self) -> Task:
        """Task to scout for innovative ideas."""
        return Task(
            config=self.tasks_config['idea_scouting_task']
        )

    @task
    def context_enrichment_task(self) -> Task:
        """Task to enrich raw ideas with contextual insights."""
        return Task(
            config=self.tasks_config['context_enrichment_task']
        )

    @task
    def impact_estimation_task(self) -> Task:
        """Task to estimate the market impact of ideas."""
        return Task(
            config=self.tasks_config['impact_estimation_task']
        )

    @task
    def turnaround_evaluation_task(self) -> Task:
        """Task to evaluate feasibility and time-to-market."""
        return Task(
            config=self.tasks_config['turnaround_evaluation_task']
        )
    
    @task
    def report_generation_task(self) -> Task:
        """Task to generate a structured report summarizing all outputs."""
        return Task(
            config=self.tasks_config['report_generation_task']
        )

    # -----------------------------------
    # Crew
    # -----------------------------------

    @crew
    def think_tank_crew(self) -> Crew:
        """
        Crew to execute all tasks sequentially to generate actionable insights and reports.
        """
        return Crew(
            agents=[
                self.idea_scout(),
                self.context_analyzer(),
                self.impact_estimator(),
                self.turnaround_evaluator(),
                self.report_generator()
            ],
            tasks=[
                self.idea_scouting_task(),
                self.context_enrichment_task(),
                self.impact_estimation_task(),
                self.turnaround_evaluation_task(),
                self.report_generation_task()
            ],
            process=Process.sequential,  # Tasks are executed one after the other
            verbose=True
        )


if __name__ == "__main__":
    # Instantiate the crew
    ideas = IdeaGenerationCrew()

    # Input for the pipeline
    inputs = {"topic": "Artificial Intelligent Agents"}

    # Run the crew and retrieve results
    result = ideas.think_tank_crew().kickoff(inputs)
    print("Final Result:", json.loads(result.raw))
