# 🚀 VendorIQ Pro - Quick Start Guide

Get your VendorIQ Pro React application up and running in 5 minutes!

## ⚡ Prerequisites

Before you begin, ensure you have:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for version control)
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code recommended)

## 📦 Quick Installation

### Method 1: Standard Setup (Recommended)

```bash
# Navigate to the project folder
cd react-vendoriq

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will automatically open at `http://localhost:3000` 🎉

### Method 2: Using Yarn

```bash
cd react-vendoriq
yarn install
yarn dev
```

### Method 3: Using pnpm

```bash
cd react-vendoriq
pnpm install
pnpm dev
```

## 🎯 First Time Setup

### Step 1: Verify Installation

After running `npm run dev`, you should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 2: Load Sample Data

1. Open `http://localhost:3000` in your browser
2. You'll see an empty dashboard
3. Navigate to **Data Management** (last tab)
4. Click **"Load 5 Sample Vendors"**
5. Click **"Generate Sample Assessments"**
6. Go back to **Dashboard** to see your data

### Step 3: Explore Features

**Dashboard Tab:**
- View risk metrics
- See distribution charts
- Monitor trends

**Vendors Tab:**
- Add new vendors
- Edit existing vendors
- Search and filter
- View risk scores

**Assessments Tab:**
- Create risk assessments
- Track assessment history
- View detailed scores

**Analytics Tab:**
- Review KPIs
- Analyze risk distribution
- Track vendor categories

**Reports Tab:**
- Export data as CSV
- Generate reports
- Export high-risk vendors

**Data Tab:**
- Create backups
- Restore data
- Load sample data
- Clear all data

## 🎨 Customization

### Change Theme

Click the **theme toggle button** (🌙/☀️) in the top-right corner to switch between light and dark themes.

### Modify Colors

Edit `src/index.css`:
```css
:root {
  --growth-green: #33691E;  /* Your primary color */
  --trust-mint: #C5E1A5;     /* Your accent color */
  /* ... more variables */
}
```

### Change Port

Edit `vite.config.js`:
```js
export default defineConfig({
  server: {
    port: 3001, // Change to your preferred port
    open: true
  }
})
```

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Install new package
npm install package-name

# Update dependencies
npm update
```

## 📱 Testing on Mobile

### Same Network

1. Find your IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Start server with host flag:
   ```bash
   npm run dev -- --host
   ```

3. Access from mobile browser:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```

### Using ngrok (External Access)

```bash
# Install ngrok
npm install -g ngrok

# Start your app
npm run dev

# In another terminal
ngrok http 3000
```

## 🐛 Troubleshooting

### Issue: Port Already in Use

**Solution:**
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Module Not Found

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Build Fails

**Solution:**
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Charts Not Displaying

**Solution:**
- Ensure Chart.js is installed: `npm install chart.js react-chartjs-2`
- Clear browser cache
- Check browser console for errors

### Issue: LocalStorage Full

**Solution:**
- Go to Data Management
- Create a backup first
- Click "Clear All Data"

## 🔐 Data Management

### Backup Your Data

1. Navigate to **Data Management**
2. Click **"Create Backup"**
3. File downloads as `vendoriq-backup-YYYY-MM-DD.json`
4. Store safely

### Restore from Backup

1. Navigate to **Data Management**
2. Click **"Restore from Backup"**
3. Select your backup file
4. Confirm restoration

### Export to CSV

1. Navigate to **Reports**
2. Choose export option:
   - All Vendors
   - High Risk Vendors
   - Assessments

## 🚢 Deployment

### Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd react-vendoriq
vercel
```

### Quick Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd react-vendoriq
netlify deploy --prod
```

See `DEPLOYMENT.md` for detailed deployment instructions.

## 📚 Learn More

### Key Technologies

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **Chart.js** - Charts
- **Lucide React** - Icons
- **Framer Motion** - Animations

### Documentation

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Chart.js Documentation](https://www.chartjs.org/)

### Project Structure

```
react-vendoriq/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout/     # Header, Navigation
│   │   └── Toast/      # Notifications
│   ├── pages/          # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Vendors.jsx
│   │   ├── Assessments.jsx
│   │   ├── Analytics.jsx
│   │   ├── Reports.jsx
│   │   └── DataManagement.jsx
│   ├── context/        # State management
│   │   └── AppContext.jsx
│   ├── utils/          # Helper functions
│   │   └── helpers.js
│   ├── App.jsx         # Main app
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 💡 Tips for Success

1. **Regular Backups** - Create backups before major changes
2. **Use Version Control** - Initialize git: `git init`
3. **Keep Dependencies Updated** - Run `npm update` monthly
4. **Monitor Console** - Check browser console for errors
5. **Test Before Deploy** - Always run `npm run build` and `npm run preview`

## 🎓 Next Steps

After setup, try:

1. **Customize Branding**
   - Update colors in `src/index.css`
   - Replace logo in Header component
   - Modify theme to match your brand

2. **Add Real Data**
   - Replace sample data with real vendors
   - Create actual risk assessments
   - Configure risk scoring for your needs

3. **Deploy to Production**
   - Follow `DEPLOYMENT.md` guide
   - Set up custom domain
   - Configure SSL certificate

4. **Enhance Features**
   - Add more chart types
   - Implement advanced filtering
   - Create custom reports
   - Add email notifications

## 📞 Getting Help

**Documentation:**
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guide
- `QUICK_START.md` - This guide

**Common Issues:**
- Check troubleshooting section above
- Search GitHub issues
- Review browser console logs

**Community:**
- Open GitHub issue
- Check Stack Overflow
- Contact support team

## ✅ Success Checklist

- [ ] Node.js 16+ installed
- [ ] Dependencies installed successfully
- [ ] Development server running
- [ ] Can access http://localhost:3000
- [ ] Sample data loaded
- [ ] All tabs accessible
- [ ] Can add/edit vendors
- [ ] Can create assessments
- [ ] Charts displaying correctly
- [ ] Theme toggle works
- [ ] Data persists after refresh
- [ ] Can export data
- [ ] Can create backup
- [ ] Ready to customize!

## 🎉 You're All Set!

Congratulations! Your VendorIQ Pro application is now running. Start managing your vendor risks like a pro!

Need help? Check out:
- Full documentation in `README.md`
- Deployment guide in `DEPLOYMENT.md`
- Code comments in source files

---

**Happy Risk Management! 🛡️**

**Last Updated:** November 2025
**Version:** 2.0.0
