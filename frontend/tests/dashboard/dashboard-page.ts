import { expect, type Locator, type Page } from '@playwright/test'

export class DashboardPage {
    readonly page: Page
    readonly monthlySpendWidget: Locator
    readonly totalExpensesWidget: Locator
    readonly avgPerExpenseWidget: Locator


    constructor(page: Page) {
        this.page = page
        this.monthlySpendWidget = page.locator('.rounded-lg')
            .filter({ hasText: `${this.currentMonth()} Spending` })

        this.totalExpensesWidget = page.locator('.rounded-lg')
            .filter({ hasText: 'Total Expenses' })

        this.avgPerExpenseWidget = page.locator('.rounded-lg')
            .filter({ hasText: 'Avg per Expense' })


        
    }

    async goto(){
        await this.page.goto('/')
    }

    currentMonth() {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date()
        return month[d.getMonth()]
    }
}