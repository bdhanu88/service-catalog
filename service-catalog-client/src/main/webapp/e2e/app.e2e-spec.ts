import { DispatcherClientPage } from './app.po';

describe('service_catalog-client App', () => {
  let page: DispatcherClientPage;

  beforeEach(() => {
    page = new DispatcherClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
