import { by, device, element, expect } from 'detox';

describe('Sign in screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    // await device.launchApp({ newInstance: true });
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Receipts scanner'))).toBeVisible();
  });

  it('should be possible to sign in with test account', async () => {
    await element(by.label('Email')).typeText('test@example.comm');
    await element(by.label('Password')).typeText('password');

    await element(by.text('Sign in')).tap();

    await expect(element(by.text('My receipts'))).toBeVisible();
    await expect(element(by.label('Email'))).not.toBeVisible();
  });
});
