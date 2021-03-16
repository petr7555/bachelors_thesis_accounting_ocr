import { by, device, element, expect } from 'detox';

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    // await device.launchApp({ newInstance: true });
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Receipts scanner'))).toBeVisible();
  });

  it('email is required', async () => {
    await element(by.label('Email')).typeText('test@example.com');
    await element(by.label('Password')).typeText('passwyord');
  });
});
