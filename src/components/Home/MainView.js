import ArticleList from '../ArticleList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Current List of nonoGrids
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({ type: 'CHANGE_TAB', tab, payload })
});

const MainView = props => {

if (props.token) {
  return (
    <div className="container col-md-10">
          <ul className="nav nav-pills outline-active">
            <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />
          </ul>

        <ArticleList
          articles={props.articles}
          loading={props.loading}
          articlesCount={props.articlesCount}
          currentPage={props.currentPage} />
      </div>
  );
} else {

  return (
    <div className="container">

      <img src="home_animated.gif" alt="Welcome" width="300" />

    </div>
  );
}

};


export default connect(mapStateToProps, mapDispatchToProps)(MainView);
