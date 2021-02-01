let items = await loadItems()

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
    w.centerAlignContent()
    let titleTxt = w.addText(item.title)
    titleTxt.applyHeadlineTextStyling()
    titleTxt.textColor = Color.white()
    let authorsTxt = w.addText("by " + authors)
    authorsTxt.applyBodyTextStyling()
    authorsTxt.textColor = Color.white()
    authorsTxt.textOpacity = 0.8
    let dateTxt = w.addText(strDate)
    dateTxt.applyBodyTextStyling()
    dateTxt.textColor = Color.white()
    dateTxt.textOpacity = 0.8
    let image = w.addImage(item["user"]["profile_image_url"])
    image.leftAlignImage()
    image.imageSize = new Size(150,150)
    return w
}

async function loadItems() {
    let url = "https://qiita.com/api/v2/items?page=1&per_page=1&query=qiita+tag%3APowerAutomate"
    let req = new Request(url)
    let json = await req.loadJSON()
    return json.items
}


function decode(str) {
    let regex = /&#(\d+);/g
    return str.replace(regex, (match, dec) => {
        return String.fromCharCode(dec)
    })
}
