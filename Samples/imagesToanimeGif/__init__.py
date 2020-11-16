import logging
from io import BytesIO
import azure.functions as func
from PIL import Image
import base64
import json
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    req_body = req.get_json()
    imgs = req_body.get('images')
    logging.info(len(imgs))
    frames =[]

    for i in range(len(imgs)):
        data = imgs[i].get('imguri')
        frames.append(Image.open(BytesIO(base64.b64decode(data))))
    
    frames[0].save('/tmp/tmpgif.gif',
               format='GIF',
               append_images=frames[1:],
               save_all=True,
               duration=req_body.get('duration'),
               loop=0)
    with open("/tmp/tmpgif.gif",'rb') as f1:
        b64_img = base64.b64encode(f1.read())

        resp={"data":"data:image/gif;base64,"+str(b64_img)[2:len(str(b64_img))-1]}
        
    return func.HttpResponse(
                     json.dumps(resp),
        mimetype="application/json",
             status_code=200
        )
