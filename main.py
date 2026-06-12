from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

templates = Jinja2Templates(directory="templates")
dashboard_app_template = Jinja2Templates(directory="dashboard-app/dist")

@app.get("/", response_class=HTMLResponse)
def landing_page(request: Request):
  return templates.TemplateResponse(
    request=request,
    name="index.html"
  )

@app.get("/app/{path:path}", response_class=HTMLResponse)
@app.get("/app", response_class=HTMLResponse)
def dashboard_app(request: Request):
  return dashboard_app_template.TemplateResponse(
    request=request,
    name="index.html"
  )

app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/dashboard-app", StaticFiles(directory="dashboard-app/dist"), name="dashboard-app-static")

@app.get("/{path:path}", response_class=HTMLResponse)
def redirect_route(request: Request):
  return templates.TemplateResponse(
    request=request,
    name="not-found.html"
  )

