# Bookmarks API 📒
## Tools ⚙️
- Built on Express and Node with NestJs 🦁
- Data stored on POSTGRES DB 🐘 running on Docker 🐳
- ORM schema and db manipulation with Prisma 🔼
- API testing with Postman👨🏾‍🚀, Pactum, and Jest 🃏
- Authentication with JWT and Passport 🛂 
- Input validation and transformation with Class (transformer + validator) libraries ✅

##Functionality⚒️
- sign up and login as a user
- create, edit, retrieve, and delete bookmarks
- protected routing such that only authenticated and authorized users can manipulate bookmarks
- input validation using DTOs to ensure only expected data is accepted to the server

## Motivations and Thoughts 💪🏾💭
I built this API to give myself a little refresher in backend dev cause its been ages! 
Nest made my life so easy with its robust library of tools. I liked how it helped me modularize my code with its concept of modules, controllers, and services. It helps you keep your code clean by relegating business logic to the service and routing to the controller, using dependency injection to make services available to other modules. I also loved its decorator feature that helps you easily define and handle http routes and (Req,Res) parameters. This feature reminded me a lot of Java 😄. 
Nest's Validation Pipes made input validation a breeze, providing security and an intuitive way to ensure I was only handling data I was expecting (goodbye Injection attacks💉). No more racking my brain figuring out how to make sure a user could only send an Int as their phone number lol.

However, out of all these amazing features, Nests's custom decorator was the one that blew me away. Its a powerful feature that lets you create YOUR OWN DECORATORS, giving you access to the Req and Res objects and even letting you parse data from them! All I had to do was use its Execution Context interface to retrieve the request and I could get access to my user's request data from any module at all! How cool is that?!

Nest's awesome features let me structure my code, making it super easy to find and squash bugs 🪳 and giving me freedom to do what we all love to do, build stuff. It abstracts away all of Express's excesses (lol rhyme) and makes it a joy to write server side logic. I'll definitely be using this framework more in the future!
