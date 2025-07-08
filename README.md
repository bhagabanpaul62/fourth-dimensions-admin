# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## MongoDB Data Import

This project includes a file `mongodb-import-data.json` containing all the sample data used in the application. You can use this file to populate your MongoDB database.

### Instructions

You can use the `mongoimport` command-line tool to import the data into your database. For each key in the JSON file (`categories`, `testimonials`, etc.), you will need to run a separate command.

Replace `<your_database_name>` with the name of your database.

```bash
# Import Categories
mongoimport --db <your_database_name> --collection categories --file mongodb-import-data.json --jsonArray --query '{"categories": {"$exists": true}}' --drop

# Import Testimonials
mongoimport --db <your_database_name> --collection testimonials --file mongodb-import-data.json --jsonArray --query '{"testimonials": {"$exists": true}}' --drop

# Import Hero Images
mongoimport --db <your_database_name> --collection heroimages --file mongodb-import-data.json --jsonArray --query '{"heroimages": {"$exists": true}}' --drop

# Import Contact Requests
mongoimport --db <your_database_name> --collection contactrequests --file mongodb-import-data.json --jsonArray --query '{"contactrequests": {"$exists": true}}' --drop

# Import Quotation Requests
mongoimport --db <your_database_name> --collection quotationrequests --file mongodb-import-data.json --jsonArray --query '{"quotationrequests": {"$exists": true}}' --drop
```

**Note:** The `--drop` flag will delete the collection before importing the new data. Use it with caution if you have existing data.
