# csv_split_to_json

## Prerequisite
Run the following command to install prerequisite modules

```
npm install csvtojson fs path yargs valid-url request
```

## Usage
To split CSV into smaller pieces:

```
  $ node csv_splitter.js --i <input file> --s <how many lines in a batch>
```

To encode CSV into JSON and upload with POST method with a URL

```
  $ node csv_to_json.js --i <input csv file> --u <URL to upload the JSON>
```

To encode CSV into JSON only (without uploading the JSON)

```
  $ node csv_to_json.js --i <input csv file>
```
