from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

templates = Jinja2Templates(directory="templates")
dashboard_app = Jinja2Templates(directory="dashboard-app/dist")

@app.get("/", response_class=HTMLResponse)
def landing_page(request: Request):
  return templates.TemplateResponse(
    request=request,
    name="index.html"
  )

@app.get("/app", response_class=HTMLResponse)
def landing_page(request: Request):
  return dashboard_app.TemplateResponse(
    request=request,
    name="index.html"
  )

app.mount("/dashboard-app", StaticFiles(directory="dashboard-app/dist"), name="static")
