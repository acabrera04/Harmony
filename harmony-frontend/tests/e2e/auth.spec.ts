import { expect, test, type Page, type TestInfo } from '@playwright/test';
import {
  DEV_ADMIN_EMAIL,
  DEV_ADMIN_PASSWORD,
  DEFAULT_JOIN_SERVER_SLUG,
  SEEDED_PRIVATE_CHANNEL,
  SEEDED_PUBLIC_CHANNEL,
  SIGNUP_USER,
} from './support/stack.shared.mjs';

async function signUpMember(page: Page, testInfo: TestInfo) {
  const { project, retry } = testInfo;
  const normalizedProject = project.name.replace(/[^a-z0-9_-]/gi, '-').toLowerCase();
  const normalizedRetry = `r${retry}`;
  const emailLocalPart = `${SIGNUP_USER.username}-${normalizedProject}-${normalizedRetry}`.replace(
    /_/g,
    '-',
  );
  const email = `${emailLocalPart}@harmony.test`;
  const username = `${SIGNUP_USER.username}_${normalizedProject}_${normalizedRetry}`.slice(0, 32);

  await page.goto('/auth/signup');
  await page.getByLabel(/^Email/).fill(email);
  await page.getByLabel(/^Username/).fill(username);
  await page.getByLabel('Display Name').fill(SIGNUP_USER.displayName);
  await page.getByLabel(/^Password/).fill(SIGNUP_USER.password);
  await page.getByRole('button', { name: 'Continue' }).click();
}

test.describe('True E2E auth and access flows', () => {
  test('guest can read a seeded public channel', async ({ page }) => {
    await page.goto(`/c/${SEEDED_PUBLIC_CHANNEL.serverSlug}/${SEEDED_PUBLIC_CHANNEL.channelSlug}`);

    await expect(
      page.getByRole('banner').getByText(SEEDED_PUBLIC_CHANNEL.serverName, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: SEEDED_PUBLIC_CHANNEL.channelName, exact: true }),
    ).toBeVisible();
    await expect(page.getByText(SEEDED_PUBLIC_CHANNEL.welcomeText).first()).toBeVisible();
    await expect(page.getByLabel('Join server promotion')).toBeVisible();
  });

  test('guest is denied access to a private channel', async ({ page }) => {
    await page.goto(
      `/c/${SEEDED_PRIVATE_CHANNEL.serverSlug}/${SEEDED_PRIVATE_CHANNEL.channelSlug}`,
    );

    await expect(page.getByText('This channel is private')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log In' })).toHaveAttribute(
      'href',
      new RegExp(
        `returnUrl=%2Fc%2F${SEEDED_PRIVATE_CHANNEL.serverSlug}%2F${SEEDED_PRIVATE_CHANNEL.channelSlug}$`,
      ),
    );
  });

  test('dev admin can log in through the real backend and access a private channel', async ({
    page,
  }) => {
    await page.goto(
      `/channels/${SEEDED_PRIVATE_CHANNEL.serverSlug}/${SEEDED_PRIVATE_CHANNEL.channelSlug}`,
    );

    await expect(page).toHaveURL(
      new RegExp(
        `/auth/login\\?returnUrl=%2Fchannels%2F${SEEDED_PRIVATE_CHANNEL.serverSlug}%2F${SEEDED_PRIVATE_CHANNEL.channelSlug}$`,
      ),
    );

    await page.getByLabel('Email').fill(DEV_ADMIN_EMAIL);
    await page.getByLabel('Password').fill(DEV_ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page).toHaveURL(
      new RegExp(
        `/channels/${SEEDED_PRIVATE_CHANNEL.serverSlug}/${SEEDED_PRIVATE_CHANNEL.channelSlug}$`,
      ),
    );
    await expect(page.getByLabel(`Message #${SEEDED_PRIVATE_CHANNEL.channelName}`)).toBeVisible();
  });

  test('newly registered users join the seeded default server and land on the authenticated channel view', async ({
    page,
  }, testInfo) => {
    await signUpMember(page, testInfo);

    await expect(page).toHaveURL(
      new RegExp(`/channels/${DEFAULT_JOIN_SERVER_SLUG}/${SEEDED_PUBLIC_CHANNEL.channelSlug}$`),
    );
    await expect(page.getByLabel(`Message #${SEEDED_PUBLIC_CHANNEL.channelName}`)).toBeVisible();
    await expect(page.getByText(SEEDED_PUBLIC_CHANNEL.welcomeText).first()).toBeVisible();
  });
});
