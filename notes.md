# Checklist

<!-- Make sure you fill out this checklist with what you've done before submitting! -->

- [x] Read the README [please please please]
- [x] Something cool!
- [ ] Back-end
  - [ ] Minimum Requirements
    - [x] Setup MongoDB database
    - [x] Setup item requests collection
    - [x] `PUT /api/request`
        id can be provided if importing data from a prior db/format, or if no idea is provided a random Object id is generated
    - [x] `GET /api/request?page=_`
  - [ ] Main Requirements
    - [x] `GET /api/request?status=pending`
    - [x] `PATCH /api/request`
  - [ ] Above and Beyond
    -  [x] Batch edits
          - Execute Batch edits by provideing a list of objects to be updates in the body of the PATCH/api/request. Id value for each object must be provided and any additional values will be updated. Resposne message will say how many edits executed sucessfully
    - [x] Batch deletes
          - Batch Deletes read a list of ids provided in the body in the form of  list of strings
          - 
- [ ] Front-end
  - [ ] Minimum Requirements
    - [x] Dropdown component
    - [x] Table component
    - [x] Base page [table with data]
    - [x] Table dropdown interactivity
  - [ ] Main Requirements
    - [x] Pagination
    - [x] Tabs
  - [ ] Above and Beyond
    - [ ] Batch edits
    - [ ] Batch deletes

# Notes

While I'v used next js and mongo for differnt porjects before, Ive never used them together, so part of the challenge I had making the backend was figuring out how the integration works and stylistically how the structure should work. Most of the backend I didnt find to be too difficult, however the frontend was a bit more difficult for me as I don't have a ton of front end experience (I've made only one serious React based website before and a couple other jsut using html and css), so while I did my best to emulate the style guide on figma, most of teh frontend was trial and error and the best I could get. 

I didnt finish the Bath edits and Deletes of frontend (even though i think with a bit more time i couldve knocked them out), mostly because i spent most of last week at band camp and most of my spare time this week studying for a cs placement exam. Overall I had a lot of fun working on this as especially the frontend bits challenged me to think and relally design out how i wanted component, prop and element flow to work. 

Thoughs about the proejct in general
The way I implmeneted the pagination using the ?pages query felt very redundant and made superfluous calls. I couldnt think of a better way to do it using the pages query. IMO I think it wouldve been better just to query all the requests based on status in the db and then paginate in a server or client componenet, since you have to query all the requests of a certain status anyway to determine the number of requests to send to the pagination componenet. 
<!-- Notes go here -->
