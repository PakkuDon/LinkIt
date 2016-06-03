# URL Shortener Microservice

## User Stories

1.  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2.  If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3.  When I visit that shortened URL, it will redirect me to my original link.

## Example

### Usage

`http://localhost:3000/api/shorten/https://www.freecodecamp.com`  

### Result

`{"original_url":"https://www.freecodecamp.com","shortened_url":"http://localhost:3000/ec2fed04"}`

* * *

Written as part of [Free Code Camp's](http://www.freecodecamp.com/) Back End Development curriculum.