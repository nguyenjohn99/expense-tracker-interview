import { expect, test } from "@playwright/test"

test.describe("Expenses API", () => {
    let token: string
    test.beforeAll(async ({ request }) => {
        const r = await request.post('/api/auth/login', {
            data: { 
                email: process.env.TEST_EMAIL,
                password: process.env.TEST_PASSWORD,
            }
        })
        token = (await r.json()).token
    })

    test('Get expenses', async ({ page }) => {        
        const response = await page.request.get('/api/expenses', {
            headers:
            {
                Authorization: `Bearer ${token}`,
            },
        })
        expect(response.ok()).toBeTruthy()
        
        const expense = (await response.json())[0]
        expect(expense).toHaveProperty('id')
        expect(expense).toHaveProperty('userId')
        expect(expense).toHaveProperty('amount')
        expect(expense).toHaveProperty('description')
    })
})