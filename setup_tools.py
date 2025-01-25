from dotenv import load_dotenv
from crewai_tools import SerperDevTool, WebsiteSearchTool

# Load environment variables
load_dotenv()

# -----------------------------------
# Tool Instances
# -----------------------------------

# Initialize SerperDevTool (structured web search tool)
serper_tool_instance = SerperDevTool()

# Initialize WebsiteSearchTool (general-purpose web search tool)
websearch_tool_instance = WebsiteSearchTool()

# -----------------------------------
# Utility Functions
# -----------------------------------

def get_serper_tool():
    """
    Returns the initialized instance of SerperDevTool.

    SerperDevTool is designed for structured web searches, ideal for 
    retrieving high-quality, precise results from search engines like Google.

    Returns:
        SerperDevTool: The initialized instance of SerperDevTool.
    """
    return serper_tool_instance


def get_websearch_tool():
    """
    Returns the initialized instance of WebsiteSearchTool.

    WebsiteSearchTool performs general-purpose web searches, making it
    suitable for gathering unstructured data and exploring diverse sources.

    Returns:
        WebsiteSearchTool: The initialized instance of WebsiteSearchTool.
    """
    return websearch_tool_instance
