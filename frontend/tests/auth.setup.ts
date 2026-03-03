import { test as setup, expect } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'
import { LoginPage } from './login/login-page'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const authFile = path.join(__dirname, '../playwright/.auth/user.json')

setup('authenticate', async ({ page }) => {
    const email = process.env.TEST_EMAIL
    const password = process.env.TEST_PASSWORD
    if (email == undefined || password == undefined) {
        throw new Error("test email or password are undefined")
    }
    
    const login = new LoginPage(page)
    await login.goto()
    await login.signIn(email, password)

    await expect(page.getByText('ExpenseTracker')).toBeVisible()

    await page.context().storageState({ path: authFile })

})