import { Angular2DateValueAccessorPage } from './app.po';

describe('angular2-date-value-accessor App', function() {
  let page: Angular2DateValueAccessorPage;

  beforeEach(() => {
    page = new Angular2DateValueAccessorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
