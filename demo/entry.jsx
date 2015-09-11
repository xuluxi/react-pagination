var React = require('react');
var Pagination = require('../src/Pagination.jsx');

require('../src/pagination.css');


window.onload = function() {

    var demo1 = document.getElementById('demo1');
    var demo2 = document.getElementById('demo2');
    var p1 = document.getElementById('page-content1');
    var p2 = document.getElementById('page-content2');

    function changePage1(page) {
        p1.innerText = 'page'+page;
    };

    function changePage2(page) {
        p2.innerText = 'page'+page;
    };

    React.render(<Pagination 
      totalPage={ 100 }
      selectPage={ changePage1 }
      />, demo1);

    React.render(<Pagination 
      totalPage={ 6 }
      selectPage={ changePage2 }
      />, demo2);
};
