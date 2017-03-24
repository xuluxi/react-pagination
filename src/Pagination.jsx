/*
* 分页模块
*/
'use strict'
var React = require('react');

var Pagination = React.createClass({
    propTypes : {
        totalPage : React.PropTypes.number.isRequired,
        selectPage : React.PropTypes.func.isRequired,
        prevText: React.PropTypes.string.isRequired,
        nextText: React.PropTypes.string.isRequired,
    },
    getInitialState : function() {
        return {
            current : 1
        }
    },
    _renderPaginate : function(current) {
        var totalPage = this.props.totalPage;
        var pageArr = [];
        var pageCont = [];
        if (totalPage <= 7) {
            for (var p=1;p<=totalPage;p++) {
                pageArr.push({
                    page : p,
                    currentPage : (p === current)
                });
            };
        } else {
            if (current < 4) {
                for (var p=1;p<=6;p++) {
                    pageArr.push({
                        page : p,
                        currentPage : (p === current)
                    });
                };
                pageArr.push({
                    page : '...',
                    dot : true,
                    currentPage : false
                });
                pageArr.push({
                    page : totalPage,
                    currentPage : false
                });
            } else {
                if ((current - 3) <= 1) {
                    for (var i=1;i<=current;i++) {
                        pageArr.push({
                            page : i,
                            currentPage : (i === current)
                        });
                    };
                } else {
                    pageArr.push({
                        page : 1,
                        currentPage : false
                    });
                    pageArr.push({
                        page : '...',
                        dot : true,
                        currentPage : false
                    });
                    if ((totalPage - current) >= 3) {
                        for (var j=(current-2); j <= current;j++) {
                            pageArr.push({
                                page : j,
                                currentPage : (j === current)
                            });
                        }
                    } else {
                        for (var j=(current-(5-(totalPage-current))); j <= current;j++) {
                            pageArr.push({
                                page : j,
                                currentPage : (j === current)
                            });
                        }
                    }
                };
                if ((current + 3) >= totalPage) {
                    for (var m = (current+1);m <= totalPage;m++) {
                        pageArr.push({
                            page : m,
                            currentPage : false
                        });
                    };
                } else {
                    for (var n = (current+1);n <= (current+2);n++) {
                        pageArr.push({
                            page : n,
                            currentPage : false
                        });
                    };
                    pageArr.push({
                        page : '...',
                        dot : true,
                        currentPage : false
                    });
                    pageArr.push({
                        page : totalPage,
                        currentPage : false
                    });
                };
            }
        }
        pageCont = pageArr.map(function(item,index) {
            var pageClass = item.dot ? 'paginate-dot' : '';
            pageClass += item.currentPage ? ' paginate-current' : '';
            return <li className={ pageClass } key={ index }>{ item.page }</li>;
        });
        return pageCont;
    },
    _handlePageClick : function(e) {
        var target = e.target;
        if (target.tagName !== 'LI' || /paginate-current/.test(target.className) || /paginate-dot/.test(target.className)) return;
        var page = parseInt(target.innerHTML);
        this.setState({
            current : page
        });
        this.props.selectPage(page);
    },
    _handlePrevClick : function() {
        var current = parseInt(this.state.current);
        if (current === 1) return;
        this.setState({
            current : (current - 1)
        });
        this.props.selectPage(current - 1);
    },
    _handleNextClick : function() {
        var current = parseInt(this.state.current);
        if (current === this.props.totalPage) return;
        this.setState({
            current : (current + 1)
        });
        this.props.selectPage(current + 1);
    },
    render : function() {
        var paginate = this._renderPaginate(this.state.current);
        var prevClass = (this.state.current === 1) ? 'prev-page unavailable' : 'prev-page';
        var nextClass = (this.state.current === this.props.totalPage) ? 'next-page unavailable' : 'next-page';
        return (
            <div id="pagination">
                <span className={ nextClass } onClick={ this._handleNextClick }>{ nextText }<i></i></span>
                <ul onClick={ this._handlePageClick }>{ paginate }</ul>
                <span className={ prevClass } onClick={ this._handlePrevClick }><i></i>{ prevText }</span>
            </div>
        )
    }
});
module.exports = Pagination;
