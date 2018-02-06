# scraper
Scrapes internet for data to be displayed in the app

## Installation
1) `npm install`
2) Create a secrets folder with secrets.json file `mkdir secrets && touch secrets/secrets.json`
3) Add the following secrets to the created json
```json
{
  "facebook": {
    "accessToken": ""
  },
  "twitter": {
    "consumerKey": "",
    "consumerSecret": "",
    "user": {
      "accessToken": "",
      "accessTokenSecret": ""
    }
  },
  "IBM": {
    "NLUUsername": "",
    "NLUPassword": "" 
  }
}
```

## Usage
`npm start`

## Testing
`npm test`

## Code Coverage
`npm run coverage`

## Job dashboard
Manage jobs with a nice GUI
`npm run agendash`

## Documentation
Generate docs
`npm run docs`

### Example
Example client implementation in `client.js`

#### TODO:
1) How to not save same stuff twice on the database?
2) Get events by geocode
3) Get london traffic data
4) Any other APIs?
5) How to handle facebook comments pagination?
