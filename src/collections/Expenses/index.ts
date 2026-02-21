import { CollectionConfig } from 'payload'
import LABELS from '@/LABELS'
import { authenticated } from '@/access/authenticated'
import { expenseCategoriesArray } from './_types/expenseCategories'

/*
Layer 1: Domains (Top-Level Separation)

  Use these as hard boundaries so analytics never mix unrelated types of costs.

  A. Personal – Recurring Living Expenses
    For all daily/weekly consumption.
  B. Personal – One-Time / Big Purchases
    For non-recurring but personal costs (e.g., apartment deposit, new laptop, flight tickets).
  C. Business / Freelance Expenses
    Everything deductible or business-related.
  D. Taxes & Government Obligations
    Income tax, social contributions, mandatory insurance, residency fees.
  E. Investments & Savings
    ETFs, savings transfers, pension fund, real estate payments.
  F. Transfers / Refunds / Internal Moves
    Money moved between your own accounts so they don’t distort spending.

2. Layer 2: Categories (In Each Domain)
  A. Personal – Recurring Living
    Groceries
    Eating Out
    Gym / Fitness
    Transportation (public, fuel)
    Rent
    Utilities (electricity, water, heating, internet)
    Subscriptions (Spotify, iCloud, etc.)
    Healthcare (out-of-pocket)
    Personal Shopping (clothes, cosmetics)
    Miscellaneous small
    Purpose: Track daily habits and monthly burn rate.

  B. Personal – One-Time / Big Purchases
    Electronics
    Furniture
    Travel (flights, hotels)
    Move-in costs
    Gifts
    Education (courses)
    Purpose: These should not distort "monthly living expenses". Good for amortizing big items.

  C. Business / Freelance Expenses
    Software subscriptions (Figma, Supabase, etc.)
    Equipment (laptop, tools, camera)
    Workspace (coworking, home office share)
    Client expenses (travel, meals)
    Marketing
    Cloud services (AWS, Vercel)
    Professional services (accountant)
    Purpose: Segregates tax-deductible items and helps VAT tracking.

  D. Taxes & Government Obligations
    Income tax prepayments
    Pension insurance
    Health insurance (if state-mandatory and not personal)
    Residence permit fees (Austria MA35, etc.)
    City taxes / Gemeinde costs
    Purpose: Prevents taxes from inflating your “living expenses”.

  E. Investments & Savings
    ETF / securities purchase
    Pillar pensions
    Savings transfers
    Real-estate maintenance fund contributions
    Purpose: Track net worth building separate from consumption.

  F. Transfers / Refunds / Internal
    Moving money across bank accounts
    Credit card payments
    Refunds
    Reimbursements
    Purpose: Avoid double counting and keep cash flow clean.

3. Why This Structure Works
  ✔️ Daily burn rate stays accurate (groceries, gym, small recurring items)
  ✔️ Large one-time costs don’t destroy your monthly statistics
  ✔️ Business expenses remain clean for taxes
  ✔️ Taxes don’t inflate personal spending
  ✔️ Investments don’t look like spending
  ✔️ Internal transfers create no noise
*/


const Expenses: CollectionConfig = {
  slug: 'expenses',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: LABELS.personal,
    components: {
      views: {
        list: {
          Component: '/collections/Expenses/_components/ExpensesListLoader/index',
        },
      },
    },
    pagination: {
      defaultLimit: 0,
    },
  },
  fields: [
    {
      type: 'number',
      name: 'amount',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: expenseCategoriesArray,
      // options: [
      //   {
      //     label: 'Personal Recurring',
      //     value: 'personalRecurring',
      //   },
      //   {
      //     label: "Personal One-Off",
      //     value: 'personalOneOff',
      //   },
      //   {
      //     label: "Investments & Savings",
      //     value: 'investments',
      //   },
      //   {
      //     label: 'Taxes',
      //     value: 'taxes',
      //   },
      //   {
      //     label: 'Business',
      //     value: 'business',
      //   },
      //   {
      //     label: 'Food',
      //     value: 'food',
      //   },
      //   {
      //     label: 'Shelter',
      //     value: 'shelter',
      //   },
      //   {
      //     label: 'Transport',
      //     value: 'transport',
      //   },
      //   {
      //     label: 'Health',
      //     value: 'health',
      //   },
      //   {
      //     label: 'Fitness',
      //     value: 'fitness',
      //   },
      //   {
      //     label: 'Education',
      //     value: 'education',
      //   },
      //   {
      //     label: 'Wife',
      //     value: 'wife',
      //   },
      //   {
      //     label: 'Non-Essential',
      //     value: 'non-essential',
      //   },
      // ],
    },
    {
      name: 'tag',
      type: 'relationship',
      relationTo: 'expenseTags',
      index: true,
    },
    {
      name: 'comment',
      type: 'textarea',
    },
    {
      name: 'date',
      type: 'date',
      defaultValue: new Date().toISOString(),
      admin: {
        date: {
          displayFormat: 'dd/MM/YYYY',
        }
      },
      required: true,
    },
    {
      name: 'recurring',
      type: 'checkbox',
      defaultValue: false,
    }
  ],
}

export default Expenses
