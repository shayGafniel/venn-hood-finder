# Venn Hood Finder Task


## Installation and Usage
1. Clone the repository
```bash
    git clone 
```

2. Install dependencies:
```bash
 npm install
 ```

3. Run a local instance of mongoDB on your local machine. By default the app will look for an instance at ```mongodb://localhost:27017/venn``` but you can provide a custom URI as an environment variable under ```MONGO_URI```. 

    3.1. If you don't have an instance of the `neighborhood` collection under `X` db, then you can run `add name of script` to initiate the collection and data.
    
4. To run the project, use the following command:
```bash
npm start
```
By default, the srever will start on port `3000`, but this is customisable and can be change by providing a value under the `PORT` environment variable.

## Tests
I tested each function separately to check their accuracy and how they handle different situations. Also, I checked how different parts of the system work together to ensure they communicate properly. Lastly, I tested the API to make sure it responds correctly in different scenarios, making the system more reliable.

This project uses `jest.js` and `sinon.js`.
To run use:
```bash
npm run test
```

## API Documentation
You can view the API documentation after initiation (step 4 of the [Installation and Usage Guide](#installation)) at: [http://localhost:3000/api-docs/#/default/get_neighborhood_](#http://localhost:3000/api-docs/#/default/get_neighborhood_)

**Important**: If you changed your port, then please change the port in the URI as well.

## Some Notes and Thoughts
### Why Mongo?
**Some Background**: For the past several years, I've closely worked with MongoDB, implementing several different services using this database. Therfore, it's my go-to choice when implementing a new service.

There were also a couple more reasons why I eventually choose to implement this project using a NoSQL database, and specifically MongoDB:
* **Data Structure** - The given structure was relatively straightforward. Assuming this is not the final structure, and that it will evolve and change, a flexible schema-less database may have an advantage over a relational database. 
* **Query Flexibility** - Based on the specified query, filter and sorting needs, MongoDB provides an easy query language. 

### Scalability snd Deployment
To scale the application effectively with server growth, I'd continuously optimize database queries based on usage trends and load changes. This involves fine-tuning query performance, indexing strategies, and data caching. Additionally, I'd implement horizontal scaling using load balancers to manage increased user volumes and consider containerization with Kubernetes for streamlined deployment and scalability management.