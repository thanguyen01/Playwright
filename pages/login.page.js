import { BasePage } from './base.page.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput      = page.getByLabel('User Name');
    this.passwordInput      = page.getByLabel('Password');
    this.rememberMeCheckbox = page.getByLabel('Keep me signed in');
    this.signInButton       = page.getByRole('button', { name: 'Sign In' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.createAccountLink  = page.getByRole('link', { name: 'Create one' });
    this.backToHomeLink     = page.getByRole('link', { name: 'Back to Home' });
    this.usernameError      = page.locator('[data-valmsg-for="UserName"]');
    this.passwordError      = page.locator('[data-valmsg-for="Password"]');
  }

  async goto() {
    await this.navigate('/Account/Login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
