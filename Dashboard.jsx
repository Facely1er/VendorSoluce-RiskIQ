import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { TrendingUp, AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { useApp } from './AppContext';
import { getChartColors } from './helpers';
import './Dashboard.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { vendors, theme } = useApp();
  const colors = getChartColors(theme);
  
  const critical = vendors.filter(v => v.riskScore >= 80).length;
  const high = vendors.filter(v => v.riskScore >= 60 && v.riskScore < 80).length;
  const medium = vendors.filter(v => v.riskScore >= 40 && v.riskScore < 60).length;
  const low = vendors.filter(v => v.riskScore < 40).length;
  
  const strategic = vendors.filter(v => v.category === 'strategic').length;
  const operational = vendors.filter(v => v.category === 'operational').length;
  const tactical = vendors.filter(v => v.category === 'tactical').length;
  
  const riskChartData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [{
      data: [critical, high, medium, low],
      backgroundColor: [colors.critical, colors.high, colors.medium, colors.low],
      borderWidth: 0
    }]
  };
  
  const categoryChartData = {
    labels: ['Strategic', 'Operational', 'Tactical'],
    datasets: [{
      label: 'Vendors',
      data: [strategic, operational, tactical],
      backgroundColor: [colors.primary, colors.medium, colors.low],
      borderWidth: 0,
      borderRadius: 8
    }]
  };
  
  const trendChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Average Risk Score',
      data: [45, 48, 42, 50, 47, 45],
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}20`,
      tension: 0.4,
      fill: true,
      borderWidth: 3,
      pointRadius: 5,
      pointBackgroundColor: colors.primary,
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          color: colors.text,
          font: { size: 12, weight: '600' }
        }
      }
    }
  };
  
  const barChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: colors.text },
        grid: { color: colors.grid }
      },
      x: {
        ticks: { color: colors.text },
        grid: { display: false }
      }
    }
  };
  
  const lineChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: colors.text },
        grid: { color: colors.grid }
      },
      x: {
        ticks: { color: colors.text },
        grid: { display: false }
      }
    }
  };
  
  return (
    <div className="page-content dashboard-page">
      <div className="page-header">
        <h2>Dashboard Overview</h2>
        <p>Real-time vendor risk monitoring and analytics</p>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon"><TrendingUp size={32} /></div>
          <div className="metric-value">{vendors.length}</div>
          <div className="metric-label">Active Vendors</div>
        </div>
        
        <div className="metric-card metric-critical">
          <div className="metric-icon"><AlertTriangle size={32} /></div>
          <div className="metric-value">{critical}</div>
          <div className="metric-label">Critical Risk</div>
        </div>
        
        <div className="metric-card metric-high">
          <div className="metric-icon"><Shield size={32} /></div>
          <div className="metric-value">{high}</div>
          <div className="metric-label">High Risk</div>
        </div>
        
        <div className="metric-card metric-low">
          <div className="metric-icon"><CheckCircle size={32} /></div>
          <div className="metric-value">{low}</div>
          <div className="metric-label">Compliant</div>
        </div>
      </div>
      
      <div className="chart-grid">
        <div className="chart-card">
          <h3>Risk Distribution</h3>
          <div className="chart-container">
            <Doughnut data={riskChartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Vendor Categories</h3>
          <div className="chart-container">
            <Bar data={categoryChartData} options={barChartOptions} />
          </div>
        </div>
      </div>
      
      <div className="chart-card">
        <h3>Risk Trend Analysis</h3>
        <div className="chart-container" style={{ height: '300px' }}>
          <Line data={trendChartData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
