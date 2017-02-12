export default (state = {}, action) => {
  switch (action.type) {
    case 'EDITOR_PAGE_LOADED':
      return {
        ...state,
        articleSlug: action.payload ? action.payload.article.slug : '',
        title: action.payload ? action.payload.article.title : '',
        // size: action.payload ? action.payload.article.size : 10,
        description: action.payload ? action.payload.article.description : '',
        body: action.payload ? action.payload.article.body : '',
        tagInput: '',
        tagList: action.payload ? action.payload.article.tagList : [],
        solution: action.payload ? action.payload.article.solution : [],
        solutionWidth: action.payload ? action.payload.article.solutionWidth : 10,
        solutionHeight: action.payload ? action.payload.article.solutionHeight : 10
      };
    case 'EDITOR_PAGE_UNLOADED':
      return {};
    case 'ARTICLE_SUBMITTED':
      return {
        ...state,
        inProgress: null,
        errors: action.error?
               (action.payload? action.payload.errors: ["Unauthorized"]) : null
      };
    case 'ASYNC_START':
      if (action.subtype === 'ARTICLE_SUBMITTED') {
        return { ...state, inProgress: true };
      }
      break;
    case 'ADD_TAG':
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      };
    case 'REMOVE_TAG':
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
      case 'UPDATE_FIELD_EDITOR':
        return { ...state, [action.key]: action.value };
      case 'SOLUTION_UPDATE':
        return { ...state, solution: action.sol };
    default:
  }

  return state;
};
