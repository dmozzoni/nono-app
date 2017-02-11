import ArticleList from '../ArticleList';
import React from 'react';
import agent from '../../agent';
import Game from '../Game'
import { connect } from 'react-redux';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed());
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

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

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
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

      <img src="188.jpg" alt="Welcome" width="300" />

    </div>
  );
}

};


export default connect(mapStateToProps, mapDispatchToProps)(MainView);
