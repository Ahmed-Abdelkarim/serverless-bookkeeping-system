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

Here's a screenshot of the working messaging:

![alt text](https://github.com/Ahmed-Abdelkarim/serverless-bookkeeping-system/blob/main/websocketMessage.png?raw=true)


The users also will have the option to subscribe to a certain store and receive a notification whenever a store publishes a new product. This is implemented using SNS notification along with websockets. 

Here's a screenshot of the working notification:

![alt text](https://github.com/Ahmed-Abdelkarim/serverless-bookkeeping-system/blob/main/SNSnot.png?raw=true)


Also Here's the information needed to test the app:

const apiId = i21edtcyhb


id token:  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik8xZmM1eU5VVU9jRzVHNWRqT1RWVyJ9.eyJpc3MiOiJodHRwczovL2Rldi1oYWNrLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMjkzMTk4Mjg5MDUwOTkwMzkyNiIsImF1ZCI6Imh4ZGkxQ00xOHNmQnJiWXpMUXN6clJGZ1RBTE9oNzQxIiwiaWF0IjoxNjI0MzgwNDUyLCJleHAiOjE2MjQ0MTY0NTIsImF0X2hhc2giOiJKSkp0SVpncXVHNW9aZnZwaVAyMW5BIiwibm9uY2UiOiJlMEdsYzFPU1kybXRDUEpYSi5JR1U4eGgtbzRvS2tQMSJ9.ylKXe0ATHfHh0XKiomtgjjBNzJvkVi4h2g6UB9qBG3CIaTbYQouzzV8xhnuhauCKVsCDMxG26K0SDxvieEpZnfPNa7ncovWboz16qQkrkQMERUzNFxCJ6gSzJCZKeOPl22vvY1i7nqAvscSjQ059sCBgP5yQZEjIQu6FIb8yL_wRn4ZCJR9AB7oOMDQEw2YfrsDTp_3ixjAKzM5cveV-rJV4A7ceAK4auEneSBcJD9jfM35IKd3d2X2EHTq3iKs04iA-YkawT1Sp-8HEQg8SIyNLZv9HUcCviY0tn9rF62zvGIkQ0hJZYlVw_QynyGXOrObxfm45R45f8QWY3YAPLw



id token:  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik8xZmM1eU5VVU9jRzVHNWRqT1RWVyJ9.eyJpc3MiOiJodHRwczovL2Rldi1oYWNrLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMjkzMTk4Mjg5MDUwOTkwMzkyNiIsImF1ZCI6Imh4ZGkxQ00xOHNmQnJiWXpMUXN6clJGZ1RBTE9oNzQxIiwiaWF0IjoxNjI0Mzg2MDM2LCJleHAiOjE2MjQ0MjIwMzYsImF0X2hhc2giOiJLa0llV3hCckpGZFhmNWdCTUtKQlhBIiwibm9uY2UiOiJaVW9lY3F3QXQzSVpDVnpzdGhKMGhQRU0ydmxQeFhtUyJ9.RrLawF6LIutgyCjw3zQ-maB2ZITchtpAR4e1YgZ6ae4QGUnj4V7xACVMJ7UPKcCAC_nejH8j2ANWbFB_Kfg2um7p_QdMt7iZVOniruXbHf1iZRrwlp4rFsYFLXXCSgccGqRUPR2cDXOIEu4BRlOxrg2_8RJ2r_QuJXYiACrE-HgLRHXy7vPE87v05h3LVNF5RL19FtEgcKvH2J5EjEK0SZjtFmp4KYiuooYCIIJoESuWOzkBKzusf2_78KZiEQ-l5Osghk8mgcVC83pcHixgbtLitS8GdbMSNISmXVzgW4A9FG-QSwAFacjcLnUVkKYY3WLKSeSjAHJJLu6HMHpJJg


Notes:

<ol>
	<li>make sure that the region is us-east-2</li>
	<li>To check the other requests you have to create an arbitary item and copy the id of the item and paste it on the other requests</li>
	<li>to test the messaging use wscat -c wss://sptekx2w75.execute-api.us-east-2.amazonaws.com/dev</li>
	<li>to send a message you have to use the following format {"message": "ENTER YOUR MESSAGE HERE", "action": "message"}<li>
	<li>to test the SNS, try to upload an image while leaving the connection open and wait a few seconds you will receive a notification from the API.</li>

</ol>
