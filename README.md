# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Environment Variables

To run this application, you need to set up a `.env` file in the project's root directory. Create a file named `.env` and add the following variable:

```bash
MONGODB_URI="your_mongodb_connection_string"
```

Replace `"your_mongodb_connection_string"` with the actual connection string for your MongoDB database. The connection string should include your database name, like `mongodb://user:password@host:port/your_database_name`.

## MongoDB Data Import

This project includes a file `mongodb-import-data.json` containing all the sample data used in the application. You can use this file to populate your MongoDB database.

### Instructions

You can use the `mongoimport` command-line tool to import the data into your database. For each key in the JSON file (`categories`, `testimonials`, etc.), you will need to run a separate command.

Replace `<your_database_name>` with the name of your database.

```bash
# Import Categories
mongoimport --uri "<your_mongodb_connection_string>" --collection categories --file mongodb-import-data.json --jsonArray --query '{"categories": {"$exists": true}}' --drop

# Import Testimonials
mongoimport --uri "<your_mongodb_connection_string>" --collection testimonials --file mongodb-import-data.json --jsonArray --query '{"testimonials": {"$exists": true}}' --drop

# Import Hero Images
mongoimport --uri "<your_mongodb_connection_string>" --collection heroimages --file mongodb-import-data.json --jsonArray --query '{"heroimages": {"$exists": true}}' --drop

# Import Contact Requests
mongoimport --uri "<your_mongodb_connection_string>" --collection contactrequests --file mongodb-import-data.json --jsonArray --query '{"contactrequests": {"$exists": true}}' --drop

# Import Quotation Requests
mongoimport --uri "<your_mongodb_connection_string>" --collection quotationrequests --file mongodb-import-data.json --jsonArray --query '{"quotationrequests": {"$exists": true}}' --drop
```

**Note:** The `--drop` flag will delete the collection before importing the new data. Use it with caution if you have existing data.

### Granting Database Permissions

After importing the data, you need to ensure that the user specified in your `MONGODB_URI` has the correct permissions to read and write to the database. If you see a "not authorized" error, it means the user lacks the necessary roles.

You can grant the `readWrite` role to your user using the MongoDB Shell (`mongosh`).

1.  Connect to your MongoDB instance with an administrative user.
2.  Switch to the `admin` database: `use admin`
3.  Run the following command, replacing `<your_username>` and `<your_database_name>` with your specific details:

```javascript
db.grantRolesToUser("<your_username>", [{ role: "readWrite", db: "<your_database_name>" }])
```

For example, if your database is named `archicontrol` and your user is `admin`, the command would be:

```javascript
db.grantRolesToUser("admin", [{ role: "readWrite", db: "archicontrol" }])
```

This will give your user the necessary permissions to run the application.
