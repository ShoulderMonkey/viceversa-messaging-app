# Viceversa | Software Engineer Interview Challenge

*Please read instructions carefully*

Use this file as part of the `README.md` in your repository, and invite su on github (@go-viceversa) when you're done!

## General pointers
We are looking for an experienced engineer who found the sweet spot between pragmatism and idealism.
Your challenge will be evaluated on:
 * Architectural decisions (also implied ones)
 * Test coverage 
 * Adherence to instructions  
 * Cost of further upgrades
 * Cost of maintenance
 * Readability
 * Commit history
 

**Please #1:** make it easy for us to try your project on our machines 🙏  
**Please #2:** if you start with a boilerplate/starter project make it the first commit separated from your contributions 🙏

> **Note:** To balance the need to best show what you can do and the precious time you are dedicating to us: if you want to add something that you would have included it in a real project but you can't do it in the test time constraints, feel free to mock it instead. Beats not letting us know you know 😁


## Requirements

You're building a simple messenger service.

We would like you to implement:

- a POST endpoint `/add-message` with body as follows, that adds this information to an in-memory store.  
As a **side effect**, when a message is successfully added, an event should be triggered that sends an email
 > you can mock the email sending by adding a console log "email sent to \${user} with \${message}" with a timeout of 1 second.  
You have freedom to design the `Message` object however you see fit.

**Bonus:** Generally we would like to prevent duplicate sending, but sometimes it makes sense to send a message with the same text to the same user. How can you handle this situation?

```javascript
{
    user: string,
    message: string,
}
```
example:
```javascript
{
    user: "123@email.com"
    message: "Lorem Ipsum"
}
```

- a GET endpoint `/messages` that returns the full list of user/messages, with filters by user, message body and pagination  

Note: In the future we expect more events to be triggered, of different kind (ex. event that sends an sms)! think about it

- add any kind of API authentication, explaining your choice 

- don't forget the tests!

- Please include a postman export in the repo to try your project

The requirements are very purposefully very easy so you can space and prove your competence however you see fit. Good luck! 😄