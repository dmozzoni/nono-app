export default (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE_FAVORITES_PAGE_LOADED':
    console.log('here in profav reducer');
      return {
        ...action.payload[0].profile
      };
    case 'PROFILE_FAVORITES_PAGE_UNLOADED':
      return {};
    default:
  }

  return state;
};
