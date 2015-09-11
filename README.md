react-datepicker
================
Pagination React component 

demo: http://xuluxi.github.io/react-pagination/

![](http://xuluxi.github.io/react-pagination/img/demo.png)

## Configuration

- totalPage : (number) total page number
- selectPage : (function) callback function when you select one page,the argument is the page number

## Usage 
npm: npm install react-pagination
The css is in package folder, I haven't pack it in JS, you should add it by youself;
```jsx

var React = require('react');
var Pagination = require('react-pagination');

React.render(<Pagination 
  totalPage={ 100 }
  selectPage={ changePageFn }
  />, document.body);

```jsx

