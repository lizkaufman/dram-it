import React from 'react';
//FIXME: write tests for criteriaReducer here!!

//---TEST CODE FROM VOLT FOR REFERENCE:---

//import { matchReducer } from './index';

// import { SWIPE_RIGHT, SWIPE_LEFT } from './actiontypes';

// const initialMatchState = { matchResults: [], swipeRights: 0 };
// const org = { orgName: 'Test Org' };

// describe('matchReducer', () => {
//   it('should add test org to matchResults array when swiped right', function () {
//     const actual = matchReducer(initialMatchState, {
//       type: SWIPE_RIGHT,
//       payload: org,
//     });
//     expect(actual).toEqual({ matchResults: [org], swipeRights: 1 });
//   });
//   it('should not add test org to matchResults array when swiped left', function () {
//     const actual = matchReducer(initialMatchState, {
//       type: SWIPE_LEFT,
//       payload: org,
//     });
//     expect(actual).toEqual(initialMatchState);
//   });
//   it('should not add test org to matchResults array when an undefined action happens', function () {
//     const actual = matchReducer(initialMatchState, {
//       type: 'swipe-undefined',
//       payload: org,
//     });
//     expect(actual).toEqual(initialMatchState);
//   });
// });
