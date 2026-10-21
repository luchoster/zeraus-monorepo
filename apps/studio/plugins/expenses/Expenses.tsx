import * as R from 'ramda'
import * as React from 'react'
import { useClient } from 'sanity'
import {
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Select,
  Text,
  Tooltip,
} from '@sanity/ui'

import { mapIndexed, notNilOrEmpty } from '../../utils/Helpers'

import './styles.css'

interface ExpenseType {
  date: string
  title: string
  description: string
  amount: number
}

export default () => {
  const [categories, setCategories] = React.useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = React.useState<string>('')
  const [expenses, setExpenses] = React.useState<ExpenseType[]>([])
  const [totalIncome, setTotalIncome] = React.useState(0)
  const client = useClient({ apiVersion: '2022-10-25' })
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear())
  let total = 0

  React.useEffect(() => {
    getClient()
  }, [currentYear])

  React.useEffect(() => {
    getTotalIncome()
  }, [expenses])

  function getCategories() {
    const query = `*[_type == "expense_category"] | order(name asc)  {
      name
    }`

    client.fetch(query).then((entry) => {
      setCategories(entry)
    })
  }

  async function getClient() {
    setExpenses([])
    const query = `*[_type == "expenses" && date >= '${currentYear}-01-01' && date <= '${currentYear}-12-31'] | order(date desc)  {
      ...,
      "category": category[]->name
    }`

    await client.fetch(query).then((entry) => {
      setExpenses(entry)
    })

    getCategories()
  }

  function getTotalIncome() {
    mapIndexed((expense: any) => {
      total += expense.amount
    })(expenses as ExpenseType[])
    setTotalIncome(total)
  }

  function _onChangeYear(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentYear(Number(e.target.value))
    _onChangeCategory({
      target: { value: 'All' },
    } as React.ChangeEvent<HTMLSelectElement>)
  }

  async function _onChangeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    setExpenses([])
    setSelectedCategory(e.target.value)

    if (e.target.value !== 'All') {
      const query = `*[_type == "expenses" && date >= '${currentYear}-01-01' && date <= '${currentYear}-12-31' && category[0]->name == "${e.target.value}"] | order(date desc)  {
        ...,
        "category": category[]->name
      }`

      await client.fetch(query).then((entry) => {
        setExpenses(entry)
      })
    }
  }

  return (
    <div className="items-center grid gap-[1em] h-full relative">
      <div className="root h-full w-full lg:w-2/3">
        <Flex align="center" justify="space-between" gap={4} padding={4}>
          <div>
            <Select
              fontSize={[2, 2, 3, 4]}
              padding={[3, 3, 4]}
              space={[3, 3, 4]}
              onChange={_onChangeYear}
              value={currentYear}
            >
              {
                // a dropdown to select the year
                R.map((year) => {
                  return <option key={year}>{year}</option>
                })(R.range(2023, new Date().getFullYear() + 1))
              }
            </Select>
          </div>
          <div>
            <Select
              fontSize={[2, 2, 3, 4]}
              padding={[3, 3, 4]}
              space={[3, 3, 4]}
              onChange={_onChangeCategory}
              value={selectedCategory}
            >
              <option>All</option>
              {mapIndexed(({ name }, index) => {
                return (
                  <option value={name} key={index}>
                    {name}
                  </option>
                )
              })(categories)}
            </Select>
          </div>
          <Heading as="h3" size={3}>
            ${totalIncome.toLocaleString()}
          </Heading>
        </Flex>
        <div className={'content'}>
          {notNilOrEmpty(expenses) && (
            <>
              <div className="bg-card text-card-foreground shadow-sm col-span-3">
                <div className="rounded-lg text-lg font-semibold leading-none tracking-tight mb-4 sticky -top-6 z-10">
                  <Card
                    padding={[3, 3, 4]}
                    radius={2}
                    shadow={1}
                    tone={'inherit'}
                  >
                    <Grid columns={5} gap={1} padding={4}>
                      <div className="hidden md:block">
                        <Text align="center" muted size={4}>
                          Date
                        </Text>
                      </div>
                      <div className="hidden md:block">
                        <Text align="center" muted size={4}>
                          Category
                        </Text>
                      </div>
                      <Text align="center" muted size={4}>
                        Title
                      </Text>
                      <div className="hidden md:block">
                        <Text align="center" muted size={4}>
                          Description
                        </Text>
                      </div>
                      <Text align="center" muted size={4}>
                        Payment Status
                      </Text>
                    </Grid>
                  </Card>
                </div>
                {notNilOrEmpty(expenses) &&
                  mapIndexed((expense: any, index: number) => {
                    return (
                      <Card
                        padding={[3, 3, 4]}
                        radius={2}
                        shadow={1}
                        tone={index % 2 === 0 ? 'transparent' : 'primary'}
                        key={index}
                      >
                        <Grid columns={5} gap={1} padding={4}>
                          <div className="items-center justify-center hidden md:flex">
                            {expense.date}
                          </div>
                          <div className="items-center justify-center hidden md:flex">
                            {notNilOrEmpty(expense.category) &&
                              mapIndexed((category, index) => {
                                return (
                                  <Badge
                                    key={index}
                                    padding={[2, 4]}
                                    tone="caution"
                                  >
                                    {category as string}
                                  </Badge>
                                )
                              })(expense.category as string[])}
                          </div>
                          <div className="items-center justify-center flex">
                            {expense.title}
                          </div>
                          <div className="items-center justify-center hidden md:flex">
                            {expense.description && (
                              <Tooltip
                                content={
                                  <Box padding={1}>
                                    <Text muted size={1}>
                                      {expense.description}
                                    </Text>
                                  </Box>
                                }
                                fallbackPlacements={['right', 'left']}
                                placement="top"
                                portal
                              >
                                <span className="truncate px-4 mx-4">
                                  {expense.description}
                                </span>
                              </Tooltip>
                            )}
                          </div>
                          <div className="items-center justify-center flex">
                            <Badge padding={[2, 4]} tone="positive">
                              <strong>
                                $ {expense.amount.toLocaleString()}
                              </strong>
                            </Badge>
                          </div>
                        </Grid>
                      </Card>
                    )
                  })(expenses)}
              </div>
            </>
          )}
        </div>
        <div className={'footer'} />
      </div>
    </div>
  )
}
