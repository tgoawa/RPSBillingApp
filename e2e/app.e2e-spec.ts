import { RpsAppPage } from './app.po';

describe('rps-app App', () => {
  let page: RpsAppPage;

  beforeEach(() => {
    page = new RpsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
