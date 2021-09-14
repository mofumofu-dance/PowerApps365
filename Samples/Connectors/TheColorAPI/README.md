# The Color API

## Summary

The custom connector returns color pallets, information for given color, and convert color.



![Sample App image](https://github.com/mofumofu-dance/PowerApps365/raw/master/media/color_cap.png)

## Actions 

Actions that perform operations on color value in various format

### GenerateSchema

Generate color pallet from input seed color.

#### Syntax

```excel
GenerateSchema({count:6,hex:"48AD23",rgb:"32,45,200",mode:"monochrome-light"})
```


Parameter | Required | Type|Description
---|---|---|---
count| No | Number|Number of colors to return. Default: 5
hex|No|Text|Hex color code w/o '#'. Example:0047AB
rgb|No|Text|RGB color value. Example: 0,71,171
mode|No|String|Define mode by which to generate the scheme from the seed color. Default: monochrome


#### Output
See following example

```json
{
  "mode": "string",
  "count": 0,
  "colors": [
    {
      "hex": {
        "value": "string",
        "clean": "string"
      },
      "rgb": {
        "fraction": {
          "r": 0,
          "g": 0,
          "b": 0
        },
        "r": 0,
        "g": 0,
        "b": 0,
        "value": "string"
      },
      "hsl": {
        "fraction": {
          "h": 0,
          "s": 0,
          "l": 0
        },
        "h": 0,
        "s": 0,
        "l": 0,
        "value": "string"
      },
      "hsv": {
        "fraction": {
          "h": 0,
          "s": 0,
          "v": 0
        },
        "value": "string",
        "h": 0,
        "s": 0,
        "v": 0
      },
      "name": {
        "value": "string",
        "closest_named_hex": "string",
        "exact_match_name": true,
        "distance": 0
      },
      "cmyk": {
        "fraction": {
          "c": 0,
          "m": 0,
          "y": 0,
          "k": 0
        },
        "value": "string",
        "c": 0,
        "m": 0,
        "y": 0,
        "k": 0
      },
      "XYZ": {
        "fraction": {
          "X": 0,
          "Y": 0,
          "Z": 0
        },
        "value": "string",
        "X": 0,
        "Y": 0,
        "Z": 0
      },
      "image": {
        "bare": "string",
        "named": "string"
      },
      "contrast": {
        "value": "string"
      },
      "_links": {
        "self": {
          "href": "string"
        }
      },
      "_embedded": {}
    }
  ],
  "seed": {
    "hex": {
      "value": "string",
      "clean": "string"
    },
    "rgb": {
      "fraction": {
        "r": 0,
        "g": 0,
        "b": 0
      },
      "r": 0,
      "g": 0,
      "b": 0,
      "value": "string"
    },
    "hsl": {
      "fraction": {
        "h": 0,
        "s": 0,
        "l": 0
      },
      "h": 0,
      "s": 0,
      "l": 0,
      "value": "string"
    },
    "hsv": {
      "fraction": {
        "h": 0,
        "s": 0,
        "v": 0
      },
      "value": "string",
      "h": 0,
      "s": 0,
      "v": 0
    },
    "name": {
      "value": "string",
      "closest_named_hex": "string",
      "exact_match_name": true,
      "distance": 0
    },
    "cmyk": {
      "fraction": {
        "c": 0,
        "m": 0,
        "y": 0,
        "k": 0
      },
      "value": "string",
      "c": 0,
      "m": 0,
      "y": 0,
      "k": 0
    },
    "XYZ": {
      "fraction": {
        "X": 0,
        "Y": 0,
        "Z": 0
      },
      "value": "string",
      "X": 0,
      "Y": 0,
      "Z": 0
    },
    "image": {
      "bare": "string",
      "named": "string"
    },
    "contrast": {
      "value": "string"
    },
    "_links": {
      "self": {
        "href": "string"
      }
    },
    "_embedded": {}
  },
  "image": {
    "bare": "string",
    "named": "string"
  },
  "_links": {
    "self": "string",
    "schemes": {
      "monochrome": "string",
      "monochrome-dark": "string",
      "monochrome-light": "string",
      "analogic": "string",
      "complement": "string",
      "analogic-complement": "string",
      "triad": "string",
      "quad": "string"
    }
  },
  "_embedded": {}
}
```



### ColorIdentification
Return detail information of input color and convert color format.

#### Syntax

```excel
ColorIdentification({hex:"0047AB",rgb:"0,71,171",hsl:"215,100%,37%",cmyk:"100,58,0,33"})
```

Parameter | Required | Type|Description
---|---|---|---
hex | No | Text|Hex code w/o #. Example 0047AB
rgb | No | Text|RGB color, separated by comma. Example: 0,71,171
hsl | No | Text|HSL color. S and L are in %. Example: 215,100%,34%
cmyk | No | Text|CMYK color. Example: 100,58,0,33



#### Output
See following example

```json
{
  "hex": {
    "value": "string",
    "clean": "string"
  },
  "rgb": {
    "fraction": {
      "r": 0,
      "g": 0,
      "b": 0
    },
    "r": 0,
    "g": 0,
    "b": 0,
    "value": "string"
  },
  "hsl": {
    "fraction": {
      "h": 0,
      "s": 0,
      "l": 0
    },
    "h": 0,
    "s": 0,
    "l": 0,
    "value": "string"
  },
  "hsv": {
    "fraction": {
      "h": 0,
      "s": 0,
      "v": 0
    },
    "value": "string",
    "h": 0,
    "s": 0,
    "v": 0
  },
  "name": {
    "value": "string",
    "closest_named_hex": "string",
    "exact_match_name": true,
    "distance": 0
  },
  "cmyk": {
    "fraction": {
      "c": 0,
      "m": 0,
      "y": 0,
      "k": 0
    },
    "value": "string",
    "c": 0,
    "m": 0,
    "y": 0,
    "k": 0
  },
  "XYZ": {
    "fraction": {
      "X": 0,
      "Y": 0,
      "Z": 0
    },
    "value": "string",
    "X": 0,
    "Y": 0,
    "Z": 0
  },
  "image": {
    "bare": "string",
    "named": "string"
  },
  "contrast": {
    "value": "string"
  },
  "_links": {
    "self": {
      "href": "string"
    }
  },
  "_embedded": {}
}
```
