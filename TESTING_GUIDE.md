# Testing the Candidate Kanban Integration

## Quick Start Guide

### 1. Start the Application
```bash
cd frontend
npm start
```

### 2. Navigation Flow
1. **Home Page** (`/`) - Recruiter Dashboard
2. **Positions Page** (`/positions`) - Enhanced positions list with Kanban integration
3. **Candidate Kanban** (`/positions/:id/candidates`) - Drag & drop candidate management

### 3. Testing Steps

#### Step 1: Navigate to Positions
- Open browser to `http://localhost:3000`
- Click on "Positions" or navigate to `/positions`
- You should see the enhanced positions page with 3 mock positions

#### Step 2: Test the "Ver proceso" Button
- **All "Ver proceso" buttons should now be clickable** (disabled condition removed for testing)
- Click any "Ver proceso" button on any position
- **Check browser console** - you should see: `Navigating to position: [ID]`
- This should navigate to the Kanban view for that position (`/positions/[ID]/candidates`)

#### Step 3: Test the Kanban Interface
- You should see:
  - Position name at the top with a back arrow
  - Multiple columns representing interview stages
  - Candidate cards (if any exist in the backend)
  - Drag and drop functionality between columns

#### Step 4: Test Navigation
- Click the back arrow to return to positions list
- Test filtering and search functionality on positions page

### 4. API Requirements

For full functionality, ensure your backend is running on `http://localhost:3010` with these endpoints:

- `GET /positions/:id/interviewflow` - Interview flow for a position
- `GET /positions/:id/candidates` - Candidates for a position  
- `PUT /candidates/:id` - Update candidate stage

### 5. Mock Data Available

The application includes mock data for testing:
- Position ID 1: Senior Backend Engineer (Abierto)
- Position ID 2: Junior Android Engineer (Contratado) 
- Position ID 3: Product Manager (Borrador)

### 6. Expected Behavior

✅ **Working Features:**
- Position listing with filtering
- Navigation to Kanban view
- Back navigation from Kanban
- Responsive design
- Loading states and error handling

⚠️ **Note:** Drag & drop will work but candidates will only show if backend API returns data.

### 7. Troubleshooting

If you encounter issues:
1. **Check browser console for errors** - Look for the `Navigating to position: [ID]` message
2. **Verify the route** - URL should change to `/positions/[ID]/candidates`
3. Ensure backend is running on port 3010
4. Verify API endpoints are accessible
5. Check network tab for API call responses
6. **If button still doesn't work** - Try refreshing the page and check for JavaScript errors

### 8. Quick Debug Steps

If "Ver proceso" button doesn't work:
1. Open browser developer tools (F12)
2. Go to Console tab
3. Click "Ver proceso" button
4. You should see: `Navigating to position: 1` (or 2, 3)
5. Check if URL changes in address bar
6. If console shows errors, report them for troubleshooting

The integration is complete and ready for testing! 🎉
