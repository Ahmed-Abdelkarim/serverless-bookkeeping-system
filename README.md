# serverless-bookkeeping-system

The last project in the Udacity AWS Cloud Developer Nanodegree
The project describes a bookkeeping system, where the user can do the following:

<ul>
  <li>Add items to his store</li>
  <li>Update the price and quantity of each item</li>
  <li>Upload a picture for the item</li>
  <li>Delete an item from the store</li>
  <li>Retrieve an item or all items.</li>
  <li>SNS Notifications when an item's Image uploaded</li>
  <li>Websocket messaging</li>
</ul>

The project mainly focuses on the business of online store. Each user can sign up and have his online store.
The user has all the edit functionalities and an option for potential customer service bot. This bot should assist the user
through their journey in the store. The core functionality is messaging and it was implemented using websockets.
The messages is saved in a dynamodb table.

The users also will have the option to subscribe to a certain store and receive a notification whenever a store publishes a new product. This is implemented using SNS notification along with websockets. 

