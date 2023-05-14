from fastapi.routing import APIRouter
from pydantic import BaseModel
import os
import subprocess

capture_router = APIRouter()
ORG_PATH = os.path.expanduser("~/org")
DOOM_BIN_PATH = os.path.expanduser("~/.config/emacs/bin/")
ORG_CAPTURE_BIN_PATH = os.path.join(DOOM_BIN_PATH, "org-capture")


class Capture(BaseModel):
    content: str
    href: str
    title: str
    note: str


@capture_router.post("/capture_fullpage/{des_file}")
async def doom_capture(data: Capture, des_file: str):
    # if capture_type:
    plaintext_content = data.content
    title = data.title
    href = data.href
    note = data.note

    if ".org" not in des_file[-4:]:
        des_file += ".org"

    if not os.path.exists(os.path.join(ORG_PATH, des_file)):
        # create file
        with open(os.path.join(ORG_PATH, des_file), "w") as f:
            f.write(f"""#+TITLE: {des_file}""")

    written = f"""** {note}
    
    #+begin_quote
    {plaintext_content}
    #+end_quote
    
    [[{href}][{title}]]
    
    """

    with open(os.path.join(ORG_PATH, des_file), "a") as f:
        f.write(written)

    return {
        "result": "success",
    }


@capture_router.post("/doom/debug")
async def doom_capture_debug(data: Capture):
    print(data.content)
    return {
        "result": "success",
        "content": data.content
    }
