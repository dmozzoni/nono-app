import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import GameEdit from './GameEdit';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: 'ADD_TAG' }),
  onSolutionUpdate: (sol) =>
    dispatch({ type: 'SOLUTION_UPDATE', sol }),
  onLoad: payload =>
    dispatch({ type: 'EDITOR_PAGE_LOADED', payload }),
  onRemoveTag: tag =>
    dispatch({ type: 'REMOVE_TAG', tag }),
  onSubmit: payload =>
    dispatch({ type: 'ARTICLE_SUBMITTED', payload }),
  onUnload: payload =>
    dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value })
});

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
      this.changeTitle = updateFieldEvent('title');
      this.changesolutionHeight = updateFieldEvent('solutionHeight');
      this.changesolutionWidth = updateFieldEvent('solutionWidth');
      this.changeDescription = updateFieldEvent('description');
      this.changeBody = updateFieldEvent('body');
      this.changeTagInput = updateFieldEvent('tagInput');

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList,
        solution: this.props.solution,
        solutionWidth: this.props.solutionWidth,
        solutionHeight: this.props.solutionHeight
      };

      const slug = { slug: this.props.articleSlug };
      const promise = this.props.articleSlug ?
        agent.Articles.update(Object.assign(article, slug)) :
        agent.Articles.create(article);

      this.props.onSubmit(promise);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.slug !== nextProps.params.slug) {
      if (nextProps.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  onChildChanged(newState) {
    this.props.onSolutionUpdate(newState.map( (i) => { return i ? 1:0 }));
  }

  render() {

    let editGrid;
    if (this.props.location.pathname === '/editor') {
      editGrid = 'new';
    } else {
      editGrid = 'edit';
    }

    return (
      <div className="editor-page">
        <div className="container page">

          <hr />
          <div className="row">

              <ListErrors errors={this.props.errors}></ListErrors>

              <form className="container">
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="nonoGrid Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>

                  <fieldset className="form-group">
                    <div id="foo" className="input-group form-inline">
                      <div className="input-group-addon">Width</div>
                      <input
                        id="formGroupWidth"
                        className="form-control form-control-lg form-inline"
                        type="number"
                        placeholder="Width"
                        min="5"
                        max="20"
                        value={this.props.solutionWidth}
                        onChange={this.changesolutionWidth} />
                    </div>

                    <div id="foo2" className="input-group form-inline">
                      <div className="input-group-addon">Height</div>
                      <input
                        id="formGroupHeight"
                        className="form-control form-control-lg"
                        type="number"
                        placeholder="Height"
                        min="5"
                        max="20"
                        value={this.props.solutionHeight}
                        onChange={this.changesolutionHeight} />
                    </div>

                  </fieldset>

                  <fieldset className="form-group lol">
                    <GameEdit callbackParent={ (newState) => this.onChildChanged(newState) } 
                              solution={this.props.solution} solutionWidth={this.props.solutionWidth}
                              solutionHeight={this.props.solutionHeight} editGrid={editGrid}
                              />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Briefly describe your nonoGrid?"
                      value={this.props.description}
                      onChange={this.changeDescription} />
                  </fieldset>

                  <button
                    className="btn btn-block btn-lgbtn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Submit Your nonoGrid Design
                  </button>

                </fieldset>
              </form>

          </div>
          <hr />

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
