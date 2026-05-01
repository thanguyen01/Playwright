import { BasePage } from './base.page.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // Nav links
    this.navHomeLink      = page.locator('a.nav-link[href="/"]');
    this.navEmployeesLink = page.locator('a.nav-link[href="/Employee"]');
    this.navDashboardLink = page.locator('a.nav-link[href="/Home/Dashboard"]');
    this.navAboutLink     = page.locator('a.nav-link[href="/Home/About"]');
    this.navRegisterLink  = page.getByRole('link', { name: 'Register' });
    this.navLoginLink     = page.getByRole('link', { name: 'Login' });
    // Hero CTAs
    this.heroViewEmployeesBtn = page.getByRole('link', { name: 'View Employees' });
    this.heroSignInBtn        = page.getByRole('link', { name: 'Sign In' });
    // Feature card buttons
    this.browseEmployeesBtn = page.getByRole('link', { name: 'Browse Employees' });
    this.signInToViewBtn    = page.getByRole('link', { name: 'Sign in to view' });
    this.createAccountBtn   = page.getByRole('link', { name: 'Create Account' });
  }

  async goto() {
    await this.navigate('/');
  }

  async clickLogin() {
    await this.navLoginLink.click();
  }

  async clickRegister() {
    await this.navRegisterLink.click();
  }

  async clickViewEmployees() {
    await this.heroViewEmployeesBtn.click();
  }
}
