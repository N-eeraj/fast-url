from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")
dashboard_app_template = Jinja2Templates(directory="dashboard-app/dist")
