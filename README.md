# Online Auction System 
## Frontend

This project is a frontend application for an **online auction system**. It allows users to **browse and bid** on products listed by sellers, handles **user registration and login** based on different roles (Admin, Customer, Seller, Delivery Person), manages **product listings** and categories, and facilitates the **ordering and delivery** process after an auction concludes. It provides distinct interfaces and functionalities based on the logged-in user's role.


## Visual Overview

```mermaid
flowchart TD
    A0["React Components
"]
    A1["Routing
"]
    A2["API Communication (Frontend-Backend)
"]
    A3["User Authentication and Roles
"]
    A4["State Management (useState/useEffect)
"]
    A5["Forms and Input Handling
"]
    A6["Product Handling
"]
    A7["Order and Delivery Handling
"]
    A0 -- "Use State" --> A4
    A0 -- "Implement Forms" --> A5
    A0 -- "Initiate API Calls" --> A2
    A1 -- "Renders Components" --> A0
    A2 -- "Updates State" --> A4
    A3 -- "Affects Rendering" --> A0
    A6 -- "Implemented by Components" --> A0
    A7 -- "Implemented by Components" --> A0
```



## How It Works Under the Hood (Simplified)

Let's visualize the process of fetching categories:

```mermaid
sequenceDiagram
    participant Frontend Component (GetAllCategories)
    participant axios/fetch
    participant Browser
    participant Internet
    participant Backend API (Server)
    participant Database

    Frontend Component (GetAllCategories)->>useEffect: Component loads
    useEffect->>Frontend Component (GetAllCategories): Call retrieveAllCategories
    Frontend Component (GetAllCategories)->>axios/fetch: Make GET request to /api/category/fetch/all
    axios/fetch->>Browser: Construct and send HTTP GET request
    Browser->>Internet: Send request
    Internet->>Backend API (Server): Receive request
    Backend API (Server)->>Database: Query categories
    Database-->>Backend API (Server): Return category data
    Backend API (Server)-->>Internet: Send HTTP Response (Status 200, JSON data)
    Internet-->>Browser: Receive response
    Browser-->>axios/fetch: Pass response
    axios/fetch-->>Frontend Component (GetAllCategories): Return parsed data (response.data)
    Frontend Component (GetAllCategories)->>Frontend Component (GetAllCategories): Update state with setCategories
    Frontend Component (GetAllCategories)->>Browser: Re-render UI with new categories
    Browser->>User: User sees the list of categories
```

For a POST request like adding a category by an Admin, the flow is similar but includes sending data and the authentication token:

```mermaid
sequenceDiagram
    participant Frontend Component (AddCategoryForm)
    participant axios/fetch
    participant Browser
    participant Internet
    participant Backend API (Server)
    participant Database
    participant SessionStorage

    User->>Frontend Component (AddCategoryForm): Fills form, clicks Save
    Frontend Component (AddCategoryForm)->>SessionStorage: Get admin JWT token
    SessionStorage-->>Frontend Component (AddCategoryForm): Return token
    Frontend Component (AddCategoryForm)->>axios/fetch: Make POST request to /api/category/add
    Frontend Component (AddCategoryForm)->>axios/fetch: Include category data (JSON) and Authorization header (with token)
    axios/fetch->>Browser: Construct and send HTTP POST request
    Browser->>Internet: Send request
    Internet->>Backend API (Server): Receive request
    Backend API (Server)->>Backend API (Server): Verify token (Authentication/Authorization)
    alt Token is valid
        Backend API (Server)->>Database: Save new category
        Database-->>Backend API (Server): Confirm save
        Backend API (Server)-->>Internet: Send HTTP Response (Status 200, success message)
    else Token is invalid or missing
        Backend API (Server)-->>Internet: Send HTTP Response (Status 401 or 403, error message)
    end
    Internet-->>Browser: Receive response
    Browser-->>axios/fetch: Pass response
    axios/fetch-->>Frontend Component (AddCategoryForm): Return parsed response (JSON)
    Frontend Component (AddCategoryForm)->>Frontend Component (AddCategoryForm): Handle response (show toast, navigate)
    Frontend Component (AddCategoryForm)->>Browser: Update UI (toast message, maybe redirect)
    Browser->>User: User sees confirmation/error message
```

## `fetch` vs. `axios`

While both achieve the same goal, `axios` is often preferred for several reasons, many of which are demonstrated in the project's code:

| Feature             | `fetch` (Built-in)                      | `axios` (Library)                            |
| :------------------ | :-------------------------------------- | :------------------------------------------- |
| Installation        | None (built-in)                         | Requires `npm install axios`                 |
| Data in Response    | Requires extra step (`response.json()`) | Automatically in `response.data`             |
| Request Body (POST) | Requires `JSON.stringify()`             | Automatically stringifies JSON data          |
| Headers             | Set manually in `headers` object        | Set manually, potentially cleaner syntax     |
| Error Handling      | `.catch()` only for network errors. HTTP errors (like 404, 500) are *not* in `.catch()`. Need to check `response.ok` or `response.status` in `.then()`. | `.catch()` handles both network errors *and* HTTP errors (400s, 500s). Often simpler error flow. |
| Request Interception| Not natively supported                  | Supports intercepting requests/responses     |

Our project uses both, likely due to different developers or historical reasons. Understanding the basics of both is helpful, but `axios` is very common in React development.


### Adding a Product - Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant AddProductForm
    participant useState Hook
    participant SessionStorage
    participant API Call (axios)
    participant Backend API
    participant Database

    User->>Browser: Navigates to "Add Product" page (Seller must be logged in)
    Browser->>AddProductForm: React renders AddProductForm
    AddProductForm->>useState Hook: Initialize state for form inputs and categories
    AddProductForm->>SessionStorage: Get seller token and info
    SessionStorage-->>AddProductForm: Return token and info
    AddProductForm->>useEffect Hook: Effect runs (fetches categories)
    useEffect Hook->>API Call (axios): GET /api/category/fetch/all
    API Call (axios)->>Backend API: Request categories
    Backend API-->>API Call (axios): Return category list
    API Call (axios)-->>useEffect Hook: Receive category list
    useEffect Hook->>AddProductForm: setCategories(fetchedCategories)
    AddProductForm->>Browser: Renders initial form with category dropdown
    User->>AddProductForm: Fills form inputs, selects category/date, selects images
    AddProductForm->>useState Hook: onChange handlers update state for each input (Chapter 6)
    User->>AddProductForm: Clicks "Add Product" button
    AddProductForm->>AddProductForm: onSubmit handler called
    AddProductForm->>AddProductForm: e.preventDefault()
    AddProductForm->>AddProductForm: Creates FormData object from state (including files, seller ID)
    AddProductForm->>API Call (axios): Makes POST request to /api/product/add
    AddProductForm->>API Call (axios): Includes FormData body and Authorization header (seller token)
    API Call (axios)->>Backend API: Receives request
    Backend API->>Backend API: Verifies token and seller role (Authentication/Authorization - Chapter 3)
    alt Token/Role Valid
        Backend API->>Database: Saves new product details and images
        Database-->>Backend API: Confirms save
        Backend API-->>API Call (axios): Returns success response
        API Call (axios)-->>AddProductForm: Receives success response
        AddProductForm->>AddProductForm: Shows success toast, calls navigate()
        AddProductForm->>Browser: Redirects user (Chapter 2)
    else Token/Role Invalid
        Backend API-->>API Call (axios): Returns error response (e.g., 401, 403)
        API Call (axios)-->>AddProductForm: Receives error response
        AddProductForm->>AddProductForm: Shows error toast
    end
    AddProductForm->>Browser: Updates UI (toast, redirection)
```

This diagram illustrates the complex flow involving form input handling, state updates, authentication checks, constructing a `FormData` request, and sending it to the backend API.


### Assigning Delivery - Sequence Diagram

```mermaid
sequenceDiagram
    participant Seller (ViewSellerOrders)
    participant useState Hook
    participant useEffect Hook
    participant API Call (axios)
    participant Backend API
    participant Modal Component
    participant Delivery Person List

    Seller (ViewSellerOrders)->>useEffect Hook: Component loads/orderId changes
    useEffect Hook->>API Call (axios): Fetch orders (seller-wise)
    API Call (axios)->>Backend API: Request seller orders (with token)
    Backend API-->>API Call (axios): Return list of seller orders
    API Call (axios)-->>useEffect Hook: Receive orders
    useEffect Hook->>Seller (ViewSellerOrders): setOrders(fetchedOrders)
    Seller (ViewSellerOrders)->>useEffect Hook: Also fetch delivery persons
    useEffect Hook->>API Call (axios): Fetch delivery persons (seller-wise)
    API Call (axios)->>Backend API: Request delivery persons (with token)
    Backend API-->>API Call (axios): Return list of delivery persons
    API Call (axios)-->>useEffect Hook: Receive list
    useEffect Hook->>Seller (ViewSellerOrders): setAllDelivery(fetchedPersons)
    Seller (ViewSellerOrders)->>Browser: Render table with orders and "Assign Delivery" buttons
    Seller (ViewSellerOrders)->>Browser: Render Modal (initially hidden) with delivery person dropdown
    User->>Seller (ViewSellerOrders): Clicks "Assign Delivery" button for an order
    Seller (ViewSellerOrders)->>useState Hook: setAssignOrderId(thisOrderId), setShowModal(true)
    useState Hook-->>Seller (ViewSellerOrders): State updated
    React->>Modal Component: Modal state showModal is true
    Modal Component->>Delivery Person List: Map over allDelivery state for dropdown options
    Modal Component->>Browser: Modal becomes visible with dropdown
    User->>Modal Component: Selects a Delivery Person from dropdown
    Modal Component->>useState Hook: setDeliveryPersonId(selectedId)
    useState Hook-->>Modal Component: State updated
    User->>Modal Component: Clicks "Assign" button (inside Modal form)
    Modal Component->>Seller (ViewSellerOrders): Calls assignToDelivery()
    Seller (ViewSellerOrders)->>API Call (fetch): Make PUT request to /api/order/assign/delivery-person
    API Call (fetch)->>API Call (fetch): Prepare request body (orderId, deliveryId) and Authorization header (seller token)
    API Call (fetch)->>Backend API: Send request
    Backend API->>Backend API: Verify token/role, update order in DB
    Backend API-->>API Call (fetch): Return response (success/failure)
    API Call (fetch)-->>Seller (ViewSellerOrders): Receive response
    Seller (ViewSellerOrders)->>Seller (ViewSellerOrders): Handle response (show toast, maybe reload/re-fetch orders)
    Seller (ViewSellerOrders)->>useState Hook: setShowModal(false)
    useState Hook-->>Seller (ViewSellerOrders): State updated
    React->>Modal Component: Modal state showModal is false
    Modal Component->>Browser: Modal becomes hidden
    Seller (ViewSellerOrders)->>Browser: Table updates to show "Delivery Assigned"

```

### Updating Delivery Status - Sequence Diagram

```mermaid
sequenceDiagram
    participant Delivery Person (ViewDeliveryOrders)
    participant useState Hook
    participant useEffect Hook
    participant API Call (axios)
    participant Backend API
    participant Modal Component
    participant Status/Time Lists

    Delivery Person (ViewDeliveryOrders)->>useEffect Hook: Component loads/orderId changes
    useEffect Hook->>API Call (axios): Fetch delivery person's orders
    API Call (axios)->>Backend API: Request orders (delivery-wise, with token)
    Backend API-->>API Call (axios): Return list of assigned orders
    API Call (axios)-->>useEffect Hook: Receive orders
    useEffect Hook->>Delivery Person (ViewDeliveryOrders): setOrders(fetchedOrders)
    Delivery Person (ViewDeliveryOrders)->>useEffect Hook: Also fetch statuses and times
    useEffect Hook->>API Call (axios): Fetch delivery statuses/times
    API Call (axios)->>Backend API: Request statuses/times
    Backend API-->>API Call (axios): Return lists
    API Call (axios)-->>useEffect Hook: Receive lists
    useEffect Hook->>Delivery Person (ViewDeliveryOrders): setDeliveryStatus(fetchedStatuses), setDeliveryTime(fetchedTimes)
    Delivery Person (ViewDeliveryOrders)->>Browser: Render table with orders and "Update Status" buttons
    Delivery Person (ViewDeliveryOrders)->>Browser: Render Modal (initially hidden) with status/time/date inputs
    User->>Delivery Person (ViewDeliveryOrders): Clicks "Update Status" button for an order
    Delivery Person (ViewDeliveryOrders)->>useState Hook: setAssignOrderId(thisOrderId), setDeliveryUpdateRequest({...}), setShowModal(true)
    useState Hook-->>Delivery Person (ViewDeliveryOrders): State updated
    React->>Modal Component: Modal state showModal is true
    Modal Component->>Status/Time Lists: Map over deliveryStatus/Time states for dropdown options
    Modal Component->>Browser: Modal becomes visible with form
    User->>Modal Component: Selects date, time, and status from inputs/dropdowns
    Modal Component->>useState Hook: handleInput updates deliveryUpdateRequest state
    useState Hook-->>Modal Component: State updated for each input change
    User->>Modal Component: Clicks "Update Status" button (inside Modal form)
    Modal Component->>Delivery Person (ViewDeliveryOrders): Calls updateOrderStatus()
    Delivery Person (ViewDeliveryOrders)->>API Call (fetch): Make PUT request to /api/order/update/delivery-status
    API Call (fetch)->>API Call (fetch): Prepare request body (from deliveryUpdateRequest state) and Authorization header (delivery token)
    API Call (fetch)->>Backend API: Send request
    Backend API->>Backend API: Verify token/role, update order status/details in DB
    Backend API-->>API Call (fetch): Return response (success/failure)
    API Call (fetch)-->>Delivery Person (ViewDeliveryOrders): Receive response
    Delivery Person (ViewDeliveryOrders)->>Delivery Person (ViewDeliveryOrders): Handle response (show toast, reload/re-fetch orders)
    Delivery Person (ViewDeliveryOrders)->>useState Hook: setShowModal(false)
    useState Hook-->>Delivery Person (ViewDeliveryOrders): State updated
    React->>Modal Component: Modal state showModal is false
    Modal Component->>Browser: Modal becomes hidden
    Delivery Person (ViewDeliveryOrders)->>Browser: Table updates to show new status

```
