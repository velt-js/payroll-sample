"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  ChevronUp,
  ChevronDown,
  Calendar,
  Clock,
  Filter,
  Upload,
  Bell,
  Home,
  Users,
  DollarSign,
  ClockIcon,
  Heart,
  FileText,
  BarChart2,
  BookOpen,
  Tag,
  Grid,
  Share2,
  ArrowUp,
  LifeBuoy,
  Settings,
  ChevronDownIcon,
} from "lucide-react"
import { VeltCommentTool, VeltNotificationsTool, VeltSidebarButton } from "@veltdev/react"

interface Employee {
  id: string
  name: string
  totalPay: number
  rate: string
  regularHrs: number
  overtimeHrs: number | null
  ptoHrs: number | null
  sickTimeOffHrs: number | null
  bonus: number | null
  commission: number | null
  additionalEarnings: number | null
  reimbursement: number | null
}

export default function PayrollInterface() {
  const [sortColumn, setSortColumn] = useState<keyof Employee>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectAll, setSelectAll] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState<Record<string, boolean>>({})

  // Mock data based on the screenshot
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "emp-001",
      name: "Arendt, Hannah",
      totalPay: 2500.0,
      rate: "$50,000/yr",
      regularHrs: 56.0,
      overtimeHrs: null,
      ptoHrs: null,
      sickTimeOffHrs: null,
      bonus: null,
      commission: null,
      additionalEarnings: null,
      reimbursement: null,
    },
    {
      id: "emp-002",
      name: "Berlin, Isaiah",
      totalPay: 5368.08,
      rate: "$65,000/yr",
      regularHrs: 82.67,
      overtimeHrs: null,
      ptoHrs: null,
      sickTimeOffHrs: null,
      bonus: 500.0,
      commission: null,
      additionalEarnings: null,
      reimbursement: null,
    },
    {
      id: "emp-003",
      name: "Churchland, Patricia",
      totalPay: 2500.0,
      rate: "$65,000/yr",
      regularHrs: 80.0,
      overtimeHrs: null,
      ptoHrs: 19.0,
      sickTimeOffHrs: null,
      bonus: null,
      commission: null,
      additionalEarnings: null,
      reimbursement: null,
    },
    {
      id: "emp-004",
      name: "Gordon, Albert",
      totalPay: 3076.92,
      rate: "$80,000/yr",
      regularHrs: 80.0,
      overtimeHrs: null,
      ptoHrs: 8.0,
      sickTimeOffHrs: null,
      bonus: null,
      commission: null,
      additionalEarnings: null,
      reimbursement: null,
    },
    {
      id: "emp-005",
      name: "Grey, Ashlan",
      totalPay: 2013.82,
      rate: "$55,000/yr",
      regularHrs: 80.0,
      overtimeHrs: null,
      ptoHrs: null,
      sickTimeOffHrs: null,
      bonus: null,
      commission: null,
      additionalEarnings: null,
      reimbursement: null,
    },
    {
      id: "emp-006",
      name: "Hamilton, Alexander",
      totalPay: 1973.08,
      rate: "$50,000/yr",
      regularHrs: 80.0,
      overtimeHrs: null,
      ptoHrs: null,
      sickTimeOffHrs: null,
      bonus: 300.0,
      commission: null,
      additionalEarnings: null,
      reimbursement: null,
    },
    {
      id: "emp-007",
      name: "Heathcote, Giovanni",
      totalPay: 197.6,
      rate: "$12.50/hr",
      regularHrs: 26.48,
      overtimeHrs: null,
      ptoHrs: null,
      sickTimeOffHrs: null,
      bonus: null,
      commission: null,
      additionalEarnings: null,
      reimbursement: null,
    },
    {
      id: "emp-008",
      name: "Hemnani, Romil",
      totalPay: 475.3,
      rate: "$12.50/hr",
      regularHrs: 50.35,
      overtimeHrs: null,
      ptoHrs: null,
      sickTimeOffHrs: null,
      bonus: null,
      commission: null,
      additionalEarnings: null,
      reimbursement: null,
    },
  ])

  // Sort employees based on current sort column and direction
  const sortedEmployees = [...employees].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    // Handle null values
    if (aValue === null && bValue === null) return 0
    if (aValue === null) return sortDirection === "asc" ? 1 : -1
    if (bValue === null) return sortDirection === "asc" ? -1 : 1

    // Compare values based on their type
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    // Convert to string for comparison
    const aString = String(aValue)
    const bString = String(bValue)

    return sortDirection === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString)
  })

  // Handle column sort
  const handleSort = (column: keyof Employee) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new column and default to ascending
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Handle select all checkbox
  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    const newSelectedEmployees: Record<string, boolean> = {}
    employees.forEach((emp) => {
      newSelectedEmployees[emp.id] = newSelectAll
    })

    setSelectedEmployees(newSelectedEmployees)
  }

  // Handle individual employee selection
  const handleSelectEmployee = (id: string) => {
    const newSelectedEmployees = {
      ...selectedEmployees,
      [id]: !selectedEmployees[id],
    }

    setSelectedEmployees(newSelectedEmployees)

    // Check if all are selected
    const allSelected = employees.every((emp) => newSelectedEmployees[emp.id])
    setSelectAll(allSelected)
  }

  // Format currency
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return ""
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  // Format number with 2 decimal places
  const formatNumber = (num: number | null) => {
    if (num === null) return ""
    return num.toFixed(2)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-[220px] border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <img src="/placeholder.svg?height=40&width=100" alt="Your Logo" className="h-10" />
        </div>

        {/* Sidebar */}
        <nav className="flex-1">
          <div className="py-2">
            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <Home className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Home</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <Users className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">People</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-teal-600 font-medium">
              <DollarSign className="w-5 h-5 mr-4 text-teal-600" />
              <span className="text-base">Pay</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <ClockIcon className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Time & Attendance</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <Heart className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Benefits</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <FileText className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Taxes & Compliance</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <FileText className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Documents</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <BarChart2 className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Reports</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <BookOpen className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Learning</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <Tag className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Tax Incentives</span>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-100 my-2"></div>

          <div className="py-2">
            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <Grid className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">App directory</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <Share2 className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Refer & earn</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <ArrowUp className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Upgrade</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <LifeBuoy className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Support</span>
            </div>

            <div className="px-6 py-1.5 flex items-center text-gray-500 hover:text-gray-700">
              <Settings className="w-5 h-5 mr-4 text-gray-400" />
              <span className="text-base">Settings</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-gray-200">
          <div></div>
          <div className="flex items-center">
            {/* [VELT] Sidebar button */}
            <VeltSidebarButton />
            {/* [VELT] Notifications tool */}
            <VeltNotificationsTool shadowDom={false} tabConfig={{
                "forYou": {
                    name: 'For You',
                    enable: true,
                },
                "documents": {
                    name: 'Payrolls',
                    enable: true,
                },
                "all": {
                    name: 'All',
                    enable: true,
                },
              }}
            />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Breadcrumb */}
          <div className="mb-4">
            <span className="text-teal-500 font-medium">Run payroll</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">Regular</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Regular biweekly payroll for Jan 1-15, 2022</h1>

          {/* Progress Bar */}
          <div className="relative mb-6">
            <div className="h-1.5 bg-gray-200 w-full rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-1/2 rounded-full"></div>
            </div>
            <div className="flex mt-4">
              <div className="w-1/2">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm mr-2 flex-shrink-0">
                    1
                  </span>
                  <span className="font-medium text-gray-800">Hours, earnings, and time off</span>
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-sm mr-2 flex-shrink-0">
                    2
                  </span>
                  <span className="text-gray-500">Review and submit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payroll Info */}
          <div className="grid grid-cols-3 gap-8 mb-10">
            <div className="flex items-start">
              <Calendar className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Run by</div>
                <div className="font-medium text-gray-800">Mon, Jan 12</div>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Payday on</div>
                <div className="font-medium text-gray-800">Wed, Jan 14</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">Total time off hours</div>
                <div className="font-medium text-gray-800">
                  <span className="text-lg">218.00</span> <span className="text-gray-500 text-sm">hrs</span>
                </div>
              </div>

              <div>
                <div className="text-gray-500 text-sm mb-1">Total hours worked</div>
                <div className="font-medium text-gray-800">
                  <span className="text-lg">1412.37</span> <span className="text-gray-500 text-sm">hrs</span>
                </div>
              </div>

              <div>
                <div className="text-gray-500 text-sm mb-1">Total earnings</div>
                <div className="font-medium text-gray-800 text-lg">$42,853.85</div>
              </div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search people"
                className="pl-10 max-w-md bg-gray-50 border-gray-200 text-gray-500 h-10 rounded-md"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>

          {/* Select All */}
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
            <div className="flex items-center">
              <div className="relative w-5 h-5 mr-2">
                <input
                  type="checkbox"
                  id="select-all"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="absolute opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="select-all"
                  className={`block w-4 h-4 border ${selectAll ? "bg-blue-500 border-blue-500" : "border-gray-300"} rounded cursor-pointer`}
                >
                  {selectAll && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </label>
              </div>
              <label htmlFor="select-all" className="text-sm text-gray-500 cursor-pointer">
                Select all (11)
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center text-teal-500 border-teal-500 h-8 px-3 rounded"
              >
                <Filter className="w-4 h-4 mr-2" />
                <span className="text-sm">Filter</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center text-teal-500 border-teal-500 h-8 px-3 rounded"
              >
                <Upload className="w-4 h-4 mr-2" />
                <span className="text-sm">Upload CSV</span>
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="w-10 p-3 text-left font-medium text-gray-500">
                      <div className="flex items-center justify-center">
                        <span className="sr-only">Select</span>
                      </div>
                    </th>
                    <th
                      className="p-3 text-left font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Employees
                        {sortColumn === "name" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="p-3 text-right font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("totalPay")}
                    >
                      <div className="flex items-center justify-end">
                        Total pay
                        {sortColumn === "totalPay" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="p-3 text-left font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("rate")}
                    >
                      <div className="flex items-center">
                        Rate
                        {sortColumn === "rate" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="p-3 text-right font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("regularHrs")}
                    >
                      <div className="flex items-center justify-end">
                        Regular hrs
                        {sortColumn === "regularHrs" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="p-3 text-right font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("overtimeHrs")}
                    >
                      <div className="flex items-center justify-end">
                        Overtime hrs
                        {sortColumn === "overtimeHrs" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="p-3 text-right font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("ptoHrs")}
                    >
                      <div className="flex items-center justify-end">
                        PTO hrs
                        {sortColumn === "ptoHrs" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="p-3 text-right font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("sickTimeOffHrs")}
                    >
                      <div className="flex items-center justify-end">
                        Sick time off hrs
                        {sortColumn === "sickTimeOffHrs" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="p-3 text-right font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("bonus")}
                    >
                      <div className="flex items-center justify-end">
                        Bonus
                        {sortColumn === "bonus" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="p-3 text-right font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("commission")}
                    >
                      <div className="flex items-center justify-end">
                        Commission
                        {sortColumn === "commission" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="p-3 text-right font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("additionalEarnings")}
                    >
                      <div className="flex items-center justify-end">
                        Additional earnings
                        {sortColumn === "additionalEarnings" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="p-3 text-right font-medium text-gray-500 border-l border-gray-200 cursor-pointer"
                      onClick={() => handleSort("reimbursement")}
                    >
                      <div className="flex items-center justify-end">
                        Reimbursement
                        {sortColumn === "reimbursement" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEmployees.map((employee, index) => {
                    // Check if this is the highlighted employee (Churchland, Patricia)
                    const isHighlighted = employee.name.includes("Churchland")

                    return (
                      <tr key={employee.id} className={`border-b border-gray-200 ${isHighlighted ? "relative" : ""}`}>
                        <td
                          className={`p-3 border-r border-gray-200 ${isHighlighted ? "border-l-[3px] border-l-red-500" : ""}`}
                        >
                          <div className="flex items-center justify-center">
                            <div className="relative w-5 h-5">
                              <input
                                type="checkbox"
                                id={`select-${employee.id}`}
                                checked={selectedEmployees[employee.id] || false}
                                onChange={() => handleSelectEmployee(employee.id)}
                                className="absolute opacity-0 w-0 h-0"
                              />
                              <label
                                htmlFor={`select-${employee.id}`}
                                className={`block w-4 h-4 border ${selectedEmployees[employee.id] ? "bg-blue-500 border-blue-500" : "border-gray-300"} rounded cursor-pointer`}
                              >
                                {selectedEmployees[employee.id] && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4"
                                  >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                )}
                              </label>
                            </div>
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-name-${employee.id}`} className="p-3 border-r border-gray-200 relative group">
                          <span className="font-medium text-teal-500">{employee.name}</span>
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-name-${employee.id}`} />
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-pay-${employee.id}`} className="p-3 text-right border-r border-gray-200 relative group">
                          {formatCurrency(employee.totalPay)}
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-pay-${employee.id}`} />
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-rate-${employee.id}`} className="p-3 border-r border-gray-200 relative group">
                          {employee.rate}
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-rate-${employee.id}`} />
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-reg-hrs-${employee.id}`} className="p-3 text-right border-r border-gray-200 relative group">
                          {formatNumber(employee.regularHrs)}
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-reg-hrs-${employee.id}`} />
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-ot-hrs-${employee.id}`} className="p-3 text-right border-r border-gray-200 relative group">
                          {formatNumber(employee.overtimeHrs)}
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-ot-hrs-${employee.id}`} />
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-pto-hrs-${employee.id}`} className="p-3 text-right border-r border-gray-200 relative group">
                          {formatNumber(employee.ptoHrs)}
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-pto-hrs-${employee.id}`} />
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-sick-hrs-${employee.id}`} className="p-3 text-right border-r border-gray-200 relative group">
                          {formatNumber(employee.sickTimeOffHrs)}
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-sick-hrs-${employee.id}`} />
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-bonus-${employee.id}`} className="p-3 text-right border-r border-gray-200 relative group">
                          {formatCurrency(employee.bonus)}
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-bonus-${employee.id}`} />
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-commission-${employee.id}`} className="p-3 text-right border-r border-gray-200 relative group">
                          {formatCurrency(employee.commission)}
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-commission-${employee.id}`} />
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-add-earnings-${employee.id}`} className="p-3 text-right border-r border-gray-200 relative group">
                          {formatCurrency(employee.additionalEarnings)}
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-add-earnings-${employee.id}`} />
                          </div>
                        </td>
                        {/* [VELT] Set the DOM ID as record ID to bind the comments to the record */}
                        <td id={`emp-reimburse-${employee.id}`} className="p-3 text-right border-r border-gray-200 relative group">
                          {formatCurrency(employee.reimbursement)}
                          <div className="comment-tool-container absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                             {/* [VELT] Comment tool */}
                            <VeltCommentTool targetElementId={`emp-reimburse-${employee.id}`} />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

