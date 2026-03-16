# Employee Insights Dashboard

## Overview
This is a React-based Employee Insights Dashboard built for Jotish company assignment.  
The app includes **Login**, **Employee List**, **Employee Details** (with camera + signature), and **Analytics** pages.  
It focuses on **performance, security, clean UI, and proper state management**.

---

## Features

### 1. Secure Authentication
- Implemented using **React Context API** for global authentication state management.
- Persistent login session using **localStorage**.
- Protected routes: users cannot access `/list` or `/details/:id` without logging in.
- Test Credentials:  


### 2. Employee List Page (High-Performance Grid)
- **Custom Virtualization**: renders only visible rows + small buffer for optimal performance.
- Scroll calculation logic:  
```javascript
startIndex = Math.floor(scrollTop / rowHeight)
endIndex = startIndex + visibleRows + buffer

### 3. Employee Details Page
- Accessed via `/details/:id`.
- **Camera Capture**: Uses the browser camera API to take a profile photo.
- **Signature Overlay**: HTML5 Canvas allows the user to sign directly on the captured photo.
- **Image Merge Logic**:
  - Draws the photo and signature on a single canvas.
  - Exports the merged image as Base64 or Blob.
  - The resulting "Audit Image" is displayed on the Analytics page.
- Ensures each employee has a verified profile with both photo and signature.

### 4. Analytics Page
- Displays **Salary Distribution per City** using **raw SVG charts** (no Chart.js or D3).
- Bar charts and circle charts represent salary data for employees in different cities.
- **Geospatial Mapping**:
  - Shows city locations on a **Leaflet map**.
  - City coordinates are mapped manually (City → Latitude/Longitude).
- Provides a clear visual summary of employee salaries and their distribution across cities.

## Intentional Bug
**Type:** Memory leak due to missing event listener cleanup

**Where:** `EmployeeList.jsx` — scroll/virtualization effect

**Description:**  
In the `useEffect` that handles scrolling for the virtualized list, I intentionally **added a `scroll` event listener but did not remove it on component unmount**.  
This causes the event listener to remain active even after the component is unmounted, which can lead to a **memory leak** and unexpected behavior.

**Reason:**  
The bug is intentional to meet the assignment requirement. In a real-world scenario, this would gradually consume memory and may affect performance if the component mounts/unmounts multiple times.

employee-dashboard/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── node_modules/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VirtualTable.jsx
│   │   │   ├── SignatureCanvas.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── List.jsx
│   │   │   ├── Details.jsx
│   │   │   ├── Analytics.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   ├── virtualization.js
│   │   │   └── imageMerge.js
│   │   └── App.jsx
│   └── package.json
│
└── README.md



## Running the Project
1. Backend: `cd backend && npm install && npm run dev`
2. Frontend: `cd frontend && npm install && npm run dev`
3. Open `http://localhost:5173`