import { type Locator, type Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly signInButton: Locator

    constructor(page: Page) {
        this.page = page
        this.emailField = page.getByRole("textbox", { name: "email"})
        this.passwordField = page.getByRole("textbox", { name: "password"})
        this.signInButton = page.getByRole("button", { name: "Sign in" })
    }

    async goto() {
        await this.page.goto('/')
        await this.logout()
    }

    async logout() {
        await this.page.evaluate(() => window.localStorage.clear())
    }

    async signIn(email: string, password: string) {
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.signInButton.click()
        
    }
}