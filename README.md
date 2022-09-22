# Personal Blog

<p>I recently (re)started a web development course and between sections I decided to get some coding in my fingers.</p>
<p>I wanted to create a personal blog, where I can easily create new posts with HTML, CSS and JS. </p>


## Links

- [Live](<https://www.hetlabovandavid.be/david/> "Live View")

## Screenshots

### Home Page

![Home Page](/screenshots/homepage.png "Home Page")

### WYSIWYG

![Post Detail](/screenshots/detailpage_01.png "Post Detail")

![Post Detail](/screenshots/detailpage_02.png "Post Detail")

### WYSIWYG

![WYSIWYG](/screenshots/WYSIWYG_800.gif "WYSIWYG")


## Built With

![HTML](https://img.shields.io/badge/-HTML-orange "HTML")

![CSS](https://img.shields.io/badge/-CSS-blue "CSS")

![JavaScript](https://img.shields.io/badge/-JavaScript-yellow "JavaScript")


## Sources

I didn't know how to create the pagination in JavaScript, so I followed the tutorial below and adapted it to my needs:

- [Tutsplus tutorial](<https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896> "Tutsplus tutorial")


## What I have learned

As I still have to learn a lot, it was interesting to create an own design and transforming it with HTML, CSS and JavaScript in a working website. What I experienced is I need a lot more practice. The most challenging part was creating the WYSIWYG editor. 

- I used [Window.getSelection()](<https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection> "Window.getSelection()"). It was a learning process to detect which part of the contenteditable div was selectable and which not

- I learned about async function to fetch a JSON-file. But I probably did some things wrong (see below in the Things I may change in the future).

- How to retrieve a query parameter in an URL

- Played a little bit with a Date object

- It is not possible to write data to a JSON-file with JavaScript only


## Things I may change in the future

I think there are still a lot of tweaks possible, but the current goal is not to make every project perfect. But try to learn as much as possible.

- I didn't know anything about fetch/async/promises. Currently I fetch the JSON-file multiple times. I think it is possible to fetch it once and store it, but wasn't able to achieve this. In the course I'm following it's one of the upcoming sections. After these section I can probably change this.

- Using a technique to write my data to a JSON-file instead of copying it to the clipboard

- Adding a favicon

- If you paste text in the WYSIWYG editor it keeps it lay-out. I would like to keep the plain text only

- When I am more experienced I think I can make it more performant in all domains: HTML, CSS, JavaScript

- Same as above: refactor


## Conclusion

> This is not something I would deliver to a client, but it was a great learning process