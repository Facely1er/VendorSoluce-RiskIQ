# VendorSoluce RiskIQ - Vendor Risk Management Platform

Enterprise Vendor Risk Management Platform featuring **Vendor Risk IQ** assessments and **Risk Radar** dashboard. Built with React, featuring dual-theme support and modern UI/UX.

## 🚀 Features

- **Vendor Risk IQ** - Comprehensive vendor risk assessment framework with NIST SP 800-161 compliance
- **Risk Radar** - Interactive dashboard for real-time vendor risk monitoring and visualization
- **Modern React Architecture** - Built with React 18, Vite, and React Router
- **Dual Theme Support** - Professional light theme and sleek dark theme
- **Vendor Management** - Complete CRUD operations for vendor data
- **Automated Risk Scoring** - Multi-dimensional risk evaluation across security, compliance, financial, and operational domains
- **Analytics Dashboard** - Real-time charts and insights
- **Data Management** - Import/export, backup/restore functionality
- **Responsive Design** - Works beautifully on all devices
- **State Management** - Context API for global state
- **Local Storage** - Persistent data storage
- **Professional UI** - VendorSoluce design system

## 📋 Prerequisites

- Node.js 16+ or npm/yarn
- Modern web browser

## 🛠️ Installation

### Option 1: Using npm

```bash
npm install
npm run dev
```

### Option 2: Using yarn

```bash
yarn install
yarn dev
```

The application will open automatically at `http://localhost:3000`

## 📁 Project Structure

```
workspace/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Layout/     # Layout components (Header, Nav)
│   │   ├── Toast/      # Toast notification system
│   │   ├── Modal/      # Modal dialogs
│   │   ├── Card/       # Card components
│   │   └── Chart/      # Chart components
│   ├── pages/          # Page components (routes)
│   │   ├── Dashboard.jsx
│   │   ├── Vendors.jsx
│   │   ├── Assessments.jsx
│   │   ├── Analytics.jsx
│   │   ├── Reports.jsx
│   │   └── DataManagement.jsx
│   ├── context/        # React Context for state management
│   │   └── AppContext.jsx
│   ├── utils/          # Utility functions
│   │   └── helpers.js
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

The application uses the VendorSoluce design system with:

- **Primary Colors**: Growth Green (#33691E) and Trust Mint (#C5E1A5)
- **Typography**: Inter font family
- **Components**: Consistent spacing, shadows, and transitions
- **Themes**: Light and dark mode support

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: GitHub Pages

```bash
npm run build
# Copy dist/ contents to gh-pages branch
```

### Option 4: Traditional Hosting

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your web server
3. Configure server to serve `index.html` for all routes

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=VendorSoluce RiskIQ
VITE_API_URL=https://your-api.com
```

## 📊 Data Storage

- Uses browser's LocalStorage for data persistence
- Automatic backup and restore functionality
- Export data as CSV or JSON

## 🎯 Key Features

### Vendor Management
- Add, edit, and delete vendors
- Automated risk scoring
- Search and filter capabilities
- Category-based organization

### Vendor Risk IQ
- Comprehensive vendor risk assessment framework
- NIST SP 800-161 compliant assessment templates
- Multi-dimensional risk evaluation (Security, Compliance, Financial, Operational)
- Assessment history tracking
- Automated risk level calculation
- Framework gap analysis

### Risk Radar
- Real-time vendor risk monitoring dashboard
- Interactive risk distribution visualization
- Risk trend analysis over time
- Vendor category breakdowns
- Critical risk alert system
- Portfolio-level risk metrics

### Analytics
- Real-time dashboard metrics
- Interactive charts (Chart.js)
- Risk distribution visualization
- Trend analysis

### Data Management
- Import/export functionality
- Backup and restore
- Sample data generation
- Clear data with confirmation

## 🔑 Core Concepts

### Risk Scoring Algorithm

Risk scores are calculated based on:
- Vendor category (Strategic, Operational, Tactical)
- Contract value
- Data types handled (PII, PHI, Financial)
- Assessment recency

### Risk Levels
- **Critical**: 80-100 (Red)
- **High**: 60-79 (Orange)
- **Medium**: 40-59 (Blue)
- **Low**: 0-39 (Green)

## 🎨 Theme Customization

Edit `src/index.css` to customize theme colors:

```css
:root {
  --growth-green: #33691E;
  --trust-mint: #C5E1A5;
  /* ... more variables */
}
```

## 🐛 Troubleshooting

### Charts not displaying
- Ensure Chart.js is properly installed
- Check browser console for errors
- Verify data format matches chart requirements

### LocalStorage issues
- Check browser privacy settings
- Ensure LocalStorage is not disabled
- Try clearing browser cache

### Build errors
- Delete `node_modules` and run `npm install` again
- Ensure Node.js version is 16+
- Check for conflicting dependencies

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

For issues or questions:
- Create an issue on GitHub
- Contact support team
- Check documentation

## 🎉 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Load sample data**:
   - Navigate to Data Management
   - Click "Load 5 Sample Vendors"
   - Generate sample assessments

4. **Explore features**:
   - View Risk Radar dashboard
   - Add/edit vendors
   - Create Vendor Risk IQ assessments
   - Export reports

## 🔄 Updates & Maintenance

- Regular dependency updates recommended
- Check for security vulnerabilities: `npm audit`
- Keep Node.js and npm up to date

## 💡 Tips

- Use dark theme for better focus in low-light
- Export data regularly as backup
- Review risk scores quarterly
- Keep vendor information up to date
- Use categories to organize vendors

---

**Built with ❤️ using React + Vite + VendorSoluce Design System**
