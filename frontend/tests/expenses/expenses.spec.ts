import { test, expect } from '@playwright/test'
import { ExpensesPage } from './expenses-page'

test.describe("Add expenses", () => {
    test("Adds new expense - bugged, off-by-one date error EXP-12345", async ({ page }) => {
        const expensesPage = new ExpensesPage(page)
        await expensesPage.goto()

        await expensesPage.addExpensesButton.click()
        await expensesPage.expCategoryField.selectOption('Bills')
        await expensesPage.expAmountField.fill('158.32')

        const id = Date.now()
        const description = `Testing Service Fee Convenience Charges ${id}`
        await expensesPage.expDescriptionField.fill(description)
        await expensesPage.expDateField.fill('2023-01-01')
        await expensesPage.expCreateButton.click()

        const item = expensesPage.getExpenseByDescription(description)
        
        expect(item).toContainText(description)
        expect(item).toContainText('Jan 1, 2023')
        expect(item).toContainText('$158.32')
        expect(item).toContainText('Bills')
    })


})