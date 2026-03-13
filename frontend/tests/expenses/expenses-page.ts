import { type Page, type Locator } from "playwright/test";

export class ExpensesPage {
    readonly page: Page
    readonly addExpensesButton: Locator

    readonly searchButton: Locator

    readonly expCategoryField: Locator
    readonly expAmountField: Locator
    readonly expDescriptionField: Locator
    readonly expDateField: Locator
    readonly expCreateButton: Locator

    readonly expensesList: Locator


    constructor(page: Page) {
        this.page = page
        this.addExpensesButton = page.getByRole('button', { name: "Add Expense" })
        this.expCategoryField = page.getByLabel('Category')
        this.expAmountField = page.getByLabel('Amount')
        this.expDescriptionField = page.getByLabel('Description')
        this.expDateField = page.getByLabel('Date')
        this.expCreateButton = page.getByRole('button', { name: 'Create' })
        
        this.expensesList = page.getByRole('list')

        this.searchButton = this.page.getByRole('button', { name: 'Search' })
    }

    async goto() {
        await this.page.goto('/expenses')
    }

    getExpenseByDescription(description: string) {
        return this.expensesList.getByRole('listitem').filter({ hasText: description })
    }
}