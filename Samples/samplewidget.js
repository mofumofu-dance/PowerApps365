
if (config.runsInWidget) {
    let widget = createWidget(items)
    Script.setWidget(widget)
    Script.complete()
} else {
    let item = items[0]
    Safari.open(item.url)
}

function createWidget(items) {
    let item = items[0]
    let authors = item["user"]["name"]
    let rawDate = item["created_at"]
    let date = new Date(Date.parse(rawDate))
    let df = new DateFormatter()
    df.useFullDateStyle()
    df.useShortTimeStyle()
    let strDate = df.string(date)
    let w = new ListWidget()
    w.backgroundColor = new Color("#55c500")
    let titleTxt = w.addText(item.title)
    titleTxt.font=Font.boldSystemFont(16)
    let authorsTxt = w.addText("by " + authors)
    authorsTxt.font=Font.mediumSystemFont(12)
    authorsTxt.textColor = Color.white()
    authorsTxt.textOpacity = 0.8
    let dateTxt = w.addText(strDate)
    dateTxt.font=Font.mediumSystemFont(12)
    dateTxt.textColor = Color.white()
    dateTxt.textOpacity = 0.8
    w.addImage(loadImage(item["user"]["profile_image_url"]))

    return w
}

async function loadItems() {
    let url = "https://qiita.com/api/v2/items?page=1&per_page=1&query=qiita+tag%3A"+args.widgetParameter
    let req = new Request(url)
    let json = await req.loadJSON()
    return json
}

async function loadImage(imgurl){
  let req = new Request(imgurl)
  let img= await req.loadImage()
  let img2 = new Image()
  img2=img
  return img2}
  
function decode(str) {
    let regex = /&#(\d+);/g
    return str.replace(regex, (match, dec) => {
        return String.fromCharCode(dec)
    })
}
