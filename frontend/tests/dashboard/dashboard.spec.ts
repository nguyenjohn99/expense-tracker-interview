import { test, expect } from '@playwright/test'
import { DashboardPage } from './dashboard-page'

test.describe("Dashboard widgets", () => {
    test("Widgets contain expense data", async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.goto();
        
        // Expect widgets to report in "$XXXX.YY" format
        expect(dashboard.monthlySpendWidget).toContainText(/\$\d+\.\d{2}/)
        expect(dashboard.totalExpensesWidget).toContainText(/\d+/)
        expect(dashboard.avgPerExpenseWidget).toContainText(/\$\d+\.\d{2}/)
    })
})