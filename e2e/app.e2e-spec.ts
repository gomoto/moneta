import { MonetaPage } from './app.po';

describe('moneta App', () => {
  let page: MonetaPage;

  beforeEach(() => {
    page = new MonetaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
