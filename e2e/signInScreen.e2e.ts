import { by, device, element, expect, waitFor } from 'detox';

describe('Sign in screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    // await device.launchApp({ newInstance: true });
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Receipts scanner'))).toBeVisible();
  });

  it('should be possible to sign in with test account', async () => {
    await element(by.label('Email')).typeText('test@example.com');
    await element(by.label('Password')).typeText('password');

    await element(by.text('Sign in')).tap();

    // https://github.com/wix/Detox/blob/master/docs/Troubleshooting.RunningTests.md#test-tries-to-find-my-component-before-its-created
    await waitFor(element(by.text('My receipts')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.label('Email'))).not.toBeVisible();
  });
});
