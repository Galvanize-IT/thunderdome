import {Item} from '../src/js/model.js';

describe('Item', function() {
  it('should', function() {
    expect((new Item()).limit).to.equal(10);
  });
});
