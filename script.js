// Global variables
let currentUser = null
let currentSection = "dashboard"
let currentReportType = null

// Sample data
let users = [
  {
    id: "admin",
    name: "Admin User",
    email: "admin@company.com",
    role: "admin",
    password: "admin123",
    status: "active",
  },
  { id: "emp001", name: "John Doe", email: "john@company.com", role: "employee", password: "emp123", status: "active" },
  {
    id: "emp002",
    name: "Jane Smith",
    email: "jane@company.com",
    role: "employee",
    password: "emp123",
    status: "active",
  },
]

let events = [
  {
    id: 1,
    title: "Annual Company Picnic",
    date: "2024-07-15",
    description: "Join us for our annual company picnic with games, food, and fun activities for the whole family.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Admin User",
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    date: "2024-08-20",
    description: "Annual technology conference featuring latest trends and innovations in our industry.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Admin User",
  },
]

let discussions = [
  {
    id: 1,
    category: "innovative",
    title: "AI-Powered Customer Service",
    description: "Implementing AI chatbots to improve customer service response times and accuracy.",
    author: "John Doe",
    date: "2024-06-01",
  },
  {
    id: 2,
    category: "technical",
    title: "Cloud Migration Strategy",
    description: "Discussion on migrating our infrastructure to cloud services for better scalability.",
    author: "Jane Smith",
    date: "2024-06-02",
  },
]

let marketplaceItems = [
  {
    id: 1,
    category: "property",
    title: "3BHK Apartment for Sale",
    description: "Beautiful 3BHK apartment in prime location with all modern amenities.",
    price: "₹85,00,000",
    contact: "john@company.com",
    author: "John Doe",
    date: "2024-06-01",
  },
  {
    id: 2,
    category: "rent",
    title: "2BHK House for Rent",
    description: "Spacious 2BHK house available for rent in peaceful neighborhood.",
    price: "₹25,000/month",
    contact: "jane@company.com",
    author: "Jane Smith",
    date: "2024-06-02",
  },
]

let referrals = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Solutions Inc.",
    location: "Bangalore",
    experience: "3-5 years",
    description: "Looking for experienced software engineers with expertise in React and Node.js.",
    email: "hr@techsolutions.com",
    author: "John Doe",
    date: "2024-06-01",
  },
]

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  // Load data from localStorage
  loadData()

  // Check if user is logged in
  const savedUser = localStorage.getItem("currentUser")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    showMainApp()
  } else {
    showLoginSection()
  }

  // Setup event listeners
  setupEventListeners()
})

// Load data from localStorage
function loadData() {
  const savedUsers = localStorage.getItem("cew_users")
  const savedEvents = localStorage.getItem("cew_events")
  const savedDiscussions = localStorage.getItem("cew_discussions")
  const savedMarketplace = localStorage.getItem("cew_marketplace")
  const savedReferrals = localStorage.getItem("cew_referrals")

  if (savedUsers) users = JSON.parse(savedUsers)
  if (savedEvents) events = JSON.parse(savedEvents)
  if (savedDiscussions) discussions = JSON.parse(savedDiscussions)
  if (savedMarketplace) marketplaceItems = JSON.parse(savedMarketplace)
  if (savedReferrals) referrals = JSON.parse(savedReferrals)
}

// Save data to localStorage
function saveData() {
  localStorage.setItem("cew_users", JSON.stringify(users))
  localStorage.setItem("cew_events", JSON.stringify(events))
  localStorage.setItem("cew_discussions", JSON.stringify(discussions))
  localStorage.setItem("cew_marketplace", JSON.stringify(marketplaceItems))
  localStorage.setItem("cew_referrals", JSON.stringify(referrals))
}

// Setup event listeners
function setupEventListeners() {
  // Login form
  document.getElementById("login-form").addEventListener("submit", handleLogin)

  // Modal forms
  document.getElementById("event-form").addEventListener("submit", handleEventSubmit)
  document.getElementById("discussion-form").addEventListener("submit", handleDiscussionSubmit)
  document.getElementById("marketplace-form").addEventListener("submit", handleMarketplaceSubmit)
  document.getElementById("referral-form").addEventListener("submit", handleReferralSubmit)
  document.getElementById("user-form").addEventListener("submit", handleUserSubmit)
  document.getElementById("settings-form").addEventListener("submit", handleSettingsSubmit)
  document.getElementById("report-password-form").addEventListener("submit", handleReportPasswordSubmit)

  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none"
    }
  })
}

// Authentication
function handleLogin(e) {
  e.preventDefault()

  const employeeId = document.getElementById("employee-id").value
  const password = document.getElementById("password").value

  const user = users.find((u) => u.id === employeeId && u.password === password)

  if (user) {
    currentUser = user
    localStorage.setItem("currentUser", JSON.stringify(user))
    showMainApp()
  } else {
    alert("Invalid credentials. Please try again.")
  }
}

function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  showLoginSection()
}

// UI Management
function showLoginSection() {
  document.getElementById("login-section").style.display = "flex"
  document.getElementById("navbar").style.display = "none"
  hideAllSections()
}

function showMainApp() {
  document.getElementById("login-section").style.display = "none"
  document.getElementById("navbar").style.display = "block"

  // Update user info
  document.getElementById("user-name").textContent = currentUser.name

  // Show/hide admin links
  if (currentUser.role === "admin") {
    document.getElementById("admin-link").style.display = "block"
    document.getElementById("reports-link").style.display = "block"
  }

  showSection("dashboard")
}

function showSection(sectionName) {
  hideAllSections()
  currentSection = sectionName

  document.getElementById(sectionName + "-section").style.display = "block"

  // Load section data
  switch (sectionName) {
    case "dashboard":
      loadDashboard()
      break
    case "events":
      loadEvents()
      break
    case "discussions":
      loadDiscussions()
      break
    case "marketplace":
      loadMarketplace()
      break
    case "referrals":
      loadReferrals()
      break
    case "admin":
      loadAdmin()
      break
  }
}

function hideAllSections() {
  const sections = document.querySelectorAll(".main-section")
  sections.forEach((section) => (section.style.display = "none"))
}

// Dashboard
function loadDashboard() {
  // Update stats
  document.getElementById("ideas-count").textContent = discussions.length
  document.getElementById("events-count").textContent = events.length
  document.getElementById("jobs-count").textContent = referrals.length
  document.getElementById("birthdays-count").textContent = "3" // Mock data

  // Load recent ideas
  const recentIdeas = discussions.slice(-3).reverse()
  const recentIdeasHtml = recentIdeas
    .map(
      (idea) => `
        <div class="content-item">
            <h4>${idea.title}</h4>
            <p>by ${idea.author} - ${formatDate(idea.date)}</p>
        </div>
    `,
    )
    .join("")
  document.getElementById("recent-ideas").innerHTML = recentIdeasHtml

  // Load upcoming events
  const upcomingEvents = events.slice(-3).reverse()
  const upcomingEventsHtml = upcomingEvents
    .map(
      (event) => `
        <div class="content-item">
            <h4>${event.title}</h4>
            <p>${formatDate(event.date)}</p>
        </div>
    `,
    )
    .join("")
  document.getElementById("upcoming-events").innerHTML = upcomingEventsHtml
}

// Events
function loadEvents() {
  const eventsHtml = events
    .map(
      (event) => `
        <div class="event-card">
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <div class="event-date">${formatDate(event.date)}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <small>Posted by: ${event.author}</small>
            </div>
        </div>
    `,
    )
    .join("")

  document.getElementById("events-grid").innerHTML = eventsHtml
}

function handleEventSubmit(e) {
  e.preventDefault()

  const newEvent = {
    id: Date.now(),
    title: document.getElementById("event-title").value,
    date: document.getElementById("event-date").value,
    description: document.getElementById("event-description").value,
    image: "/placeholder.svg?height=200&width=300",
    author: currentUser.name,
  }

  events.push(newEvent)
  saveData()
  loadEvents()
  closeModal("event-modal")
  document.getElementById("event-form").reset()
}

// Discussions
function loadDiscussions(filter = "all") {
  let filteredDiscussions = discussions

  if (filter !== "all") {
    filteredDiscussions = discussions.filter((d) => d.category === filter)
  }

  const discussionsHtml = filteredDiscussions
    .map(
      (discussion) => `
        <div class="discussion-item" data-category="${discussion.category}">
            <div class="discussion-header">
                <span class="discussion-category">${getCategoryName(discussion.category)}</span>
                <span class="discussion-meta">by ${discussion.author} on ${formatDate(discussion.date)}</span>
            </div>
            <h3 class="discussion-title">${discussion.title}</h3>
            <div class="discussion-content">${discussion.description}</div>
        </div>
    `,
    )
    .join("")

  document.getElementById("discussions-list").innerHTML = discussionsHtml
}

function filterDiscussions(category) {
  // Update active button
  document.querySelectorAll(".discussion-categories .category-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  loadDiscussions(category)
}

function handleDiscussionSubmit(e) {
  e.preventDefault()

  const newDiscussion = {
    id: Date.now(),
    category: document.getElementById("discussion-category").value,
    title: document.getElementById("discussion-title").value,
    description: document.getElementById("discussion-description").value,
    author: currentUser.name,
    date: new Date().toISOString().split("T")[0],
  }

  discussions.push(newDiscussion)
  saveData()
  loadDiscussions()
  closeModal("discussion-modal")
  document.getElementById("discussion-form").reset()
}

// Marketplace
function loadMarketplace(filter = "all") {
  let filteredItems = marketplaceItems

  if (filter !== "all") {
    filteredItems = marketplaceItems.filter((item) => item.category === filter)
  }

  const marketplaceHtml = filteredItems
    .map(
      (item) => `
        <div class="marketplace-item" data-category="${item.category}">
            <span class="marketplace-category">${getCategoryName(item.category)}</span>
            <h3 class="marketplace-title">${item.title}</h3>
            <p class="marketplace-description">${item.description}</p>
            ${item.price ? `<div class="marketplace-price">${item.price}</div>` : ""}
            <div class="marketplace-contact">Contact: ${item.contact}</div>
            <small>Posted by: ${item.author} on ${formatDate(item.date)}</small>
        </div>
    `,
    )
    .join("")

  document.getElementById("marketplace-grid").innerHTML = marketplaceHtml
}

function filterMarketplace(category) {
  // Update active button
  document.querySelectorAll(".marketplace-categories .category-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  loadMarketplace(category)
}

function handleMarketplaceSubmit(e) {
  e.preventDefault()

  const newItem = {
    id: Date.now(),
    category: document.getElementById("marketplace-category").value,
    title: document.getElementById("marketplace-title").value,
    description: document.getElementById("marketplace-description").value,
    contact: document.getElementById("marketplace-contact").value,
    price: document.getElementById("marketplace-price").value,
    author: currentUser.name,
    date: new Date().toISOString().split("T")[0],
  }

  marketplaceItems.push(newItem)
  saveData()
  loadMarketplace()
  closeModal("marketplace-modal")
  document.getElementById("marketplace-form").reset()
}

// Referrals
function loadReferrals() {
  const referralsHtml = referrals
    .map(
      (referral) => `
        <div class="referral-item">
            <h3 class="referral-title">${referral.title}</h3>
            <div class="referral-company">${referral.company}</div>
            <div class="referral-details">
                <span class="referral-detail"><i class="fas fa-map-marker-alt"></i> ${referral.location}</span>
                <span class="referral-detail"><i class="fas fa-briefcase"></i> ${referral.experience}</span>
            </div>
            <p class="referral-description">${referral.description}</p>
            <div class="referral-contact">Contact: ${referral.email}</div>
            <small>Posted by: ${referral.author} on ${formatDate(referral.date)}</small>
        </div>
    `,
    )
    .join("")

  document.getElementById("referrals-grid").innerHTML = referralsHtml
}

function handleReferralSubmit(e) {
  e.preventDefault()

  const newReferral = {
    id: Date.now(),
    title: document.getElementById("referral-title").value,
    company: document.getElementById("referral-company").value,
    location: document.getElementById("referral-location").value,
    experience: document.getElementById("referral-experience").value,
    description: document.getElementById("referral-description").value,
    email: document.getElementById("referral-email").value,
    author: currentUser.name,
    date: new Date().toISOString().split("T")[0],
  }

  referrals.push(newReferral)
  saveData()
  loadReferrals()
  closeModal("referral-modal")
  document.getElementById("referral-form").reset()
}

// Admin
function loadAdmin() {
  showAdminTab("users")
  loadUsers()
  updateAnalytics()
}

function showAdminTab(tabName) {
  // Update active tab
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  // Show tab content
  document.querySelectorAll(".admin-tab-content").forEach((content) => {
    content.style.display = "none"
  })
  document.getElementById("admin-" + tabName).style.display = "block"
}

function loadUsers() {
  const usersHtml = users
    .map(
      (user) => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="user-status ${user.status}">${user.status}</span></td>
            <td>
                <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        </tr>
    `,
    )
    .join("")

  document.getElementById("users-table-body").innerHTML = usersHtml
}

function handleUserSubmit(e) {
  e.preventDefault()

  const newUser = {
    id: document.getElementById("new-employee-id").value,
    name: document.getElementById("new-user-name").value,
    email: document.getElementById("new-user-email").value,
    role: document.getElementById("new-user-role").value,
    password: document.getElementById("new-user-password").value,
    status: "active",
  }

  // Check if user ID already exists
  if (users.find((u) => u.id === newUser.id)) {
    alert("Employee ID already exists!")
    return
  }

  users.push(newUser)
  saveData()
  loadUsers()
  closeModal("user-modal")
  document.getElementById("user-form").reset()
}

function deleteUser(userId) {
  if (userId === currentUser.id) {
    alert("Cannot delete your own account!")
    return
  }

  if (confirm("Are you sure you want to delete this user?")) {
    users = users.filter((u) => u.id !== userId)
    saveData()
    loadUsers()
  }
}

function handleSettingsSubmit(e) {
  e.preventDefault()
  alert("Settings saved successfully!")
}

function updateAnalytics() {
  document.getElementById("total-users").textContent = users.length
  document.getElementById("total-posts").textContent = discussions.length + marketplaceItems.length + referrals.length
  document.getElementById("monthly-engagement").textContent = "85%"
}

// Reports
function generateReport(reportType) {
  currentReportType = reportType
  showModal("report-password-modal")
}

function handleReportPasswordSubmit(e) {
  e.preventDefault()

  const password = document.getElementById("report-password").value

  if (password === "report123") {
    downloadReport(currentReportType)
    closeModal("report-password-modal")
    document.getElementById("report-password-form").reset()
  } else {
    alert("Invalid password!")
  }
}

function downloadReport(reportType) {
  let reportData = ""
  let filename = ""

  switch (reportType) {
    case "admin":
      reportData = generateAdminReport()
      filename = "admin_report.csv"
      break
    case "bank":
      reportData = generateBankReport()
      filename = "bank_report.csv"
      break
    case "activity":
      reportData = generateActivityReport()
      filename = "activity_report.csv"
      break
  }

  // Create and download file
  const blob = new Blob([reportData], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

function generateAdminReport() {
  let csv = "Report Type,Admin Report\n"
  csv += "Generated Date," + new Date().toLocaleDateString() + "\n\n"
  csv += "User Statistics\n"
  csv += "Employee ID,Name,Email,Role,Status\n"

  users.forEach((user) => {
    csv += `${user.id},${user.name},${user.email},${user.role},${user.status}\n`
  })

  csv += "\nContent Statistics\n"
  csv += "Type,Count\n"
  csv += `Events,${events.length}\n`
  csv += `Discussions,${discussions.length}\n`
  csv += `Marketplace Items,${marketplaceItems.length}\n`
  csv += `Job Referrals,${referrals.length}\n`

  return csv
}

function generateBankReport() {
  let csv = "Report Type,Bank Report\n"
  csv += "Generated Date," + new Date().toLocaleDateString() + "\n\n"
  csv += "Financial Summary\n"
  csv += "Category,Amount\n"
  csv += "Employee Welfare Fund,₹5,00,000\n"
  csv += "Event Expenses,₹1,50,000\n"
  csv += "Training Budget,₹2,00,000\n"
  csv += "Miscellaneous,₹50,000\n"

  return csv
}

function generateActivityReport() {
  let csv = "Report Type,Activity Report\n"
  csv += "Generated Date," + new Date().toLocaleDateString() + "\n\n"
  csv += "User Activity\n"
  csv += "Employee ID,Name,Posts Created,Last Active\n"

  users.forEach((user) => {
    const userPosts =
      discussions.filter((d) => d.author === user.name).length +
      marketplaceItems.filter((m) => m.author === user.name).length +
      referrals.filter((r) => r.author === user.name).length
    csv += `${user.id},${user.name},${userPosts},${new Date().toLocaleDateString()}\n`
  })

  return csv
}

// Modal Management
function showModal(modalId) {
  document.getElementById(modalId).style.display = "block"
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none"
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function getCategoryName(category) {
  const categoryNames = {
    innovative: "Innovative Ideas",
    technical: "Technical Discussion",
    experience: "Work Experience",
    growth: "Company Growth",
    property: "Property Sale",
    rent: "Home Rent",
    matrimonial: "Matrimonial",
    travel: "Travel Plans",
  }

  return categoryNames[category] || category
}

// Initialize sample data if not exists
function initializeSampleData() {
  if (!localStorage.getItem("cew_initialized")) {
    // Add some sample birthdays
    const today = new Date()
    const birthdayUsers = [
      { name: "Alice Johnson", date: today.toISOString().split("T")[0] },
      { name: "Bob Wilson", date: today.toISOString().split("T")[0] },
      { name: "Carol Brown", date: today.toISOString().split("T")[0] },
    ]

    localStorage.setItem("cew_birthdays", JSON.stringify(birthdayUsers))
    localStorage.setItem("cew_initialized", "true")
  }
}

// Call initialization
initializeSampleData()
