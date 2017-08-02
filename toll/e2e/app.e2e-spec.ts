import { TollPage } from './app.po';

describe('toll App', () => {
  let page: TollPage;

  beforeEach(() => {
    page = new TollPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
