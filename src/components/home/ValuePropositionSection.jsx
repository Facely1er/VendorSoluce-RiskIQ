import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import {
  Building2,
  Users,
  ArrowRight,
  Lock,
  CheckCircle,
  AlertTriangle,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './home.css';

const ValuePropositionSection = () => {
  const [activeStakeholder, setActiveStakeholder] = useState('security');

  const stakeholders = [
    {
      id: 'security',
      title: 'Security Teams',
      description: 'Security professionals need comprehensive visibility into vendor risks and automated compliance tracking.',
      icon: <Shield size={32} color="var(--vendorsoluce-green)" />,
      challenges: [
        'Limited visibility into vendor security postures',
        'Manual assessment processes are time-consuming',
        'Difficulty tracking compliance across frameworks',
        'Challenges maintaining ongoing vendor risk monitoring'
      ],
      solutions: [
        {
          title: 'Vendor Risk IQ Assessment',
          description: 'Comprehensive vendor risk assessment with automated scoring and NIST mapping.',
          benefits: [
            'Automated risk scoring across multiple dimensions',
            'NIST 800-161 control mapping',
            'Vendor categorization and prioritization',
            'Compliance tracking and reporting'
          ],
          cta: 'Start Assessment',
          link: '/assessments'
        },
        {
          title: 'Risk Radar Dashboard',
          description: 'Continuous vendor risk monitoring with real-time alerts and threat intelligence through interactive Risk Radar visualization.',
          benefits: [
            'Real-time threat intelligence integration',
            'Interactive risk radar visualization',
            'Automated risk change alerts',
            'Comprehensive risk reporting',
            'Continuous compliance monitoring'
          ],
          cta: 'View Risk Radar',
          link: '/dashboard'
        }
      ]
    },
    {
      id: 'procurement',
      title: 'Procurement',
      description: 'Procurement teams need to balance cost, quality, and risk when selecting vendors.',
      icon: <Building2 size={32} color="var(--vendorsoluce-navy)" />,
      challenges: [
        'Balancing cost with security requirements',
        'Managing vendor lifecycle from onboarding to offboarding',
        'Ensuring contract compliance',
        'Conducting thorough due diligence'
      ],
      solutions: [
        {
          title: 'Risk Calculator',
          description: 'Quick risk scoring tool to evaluate vendors during procurement process.',
          benefits: [
            'Quick risk evaluation criteria',
            'Automated risk scoring',
            'Vendor comparison tools',
            'Integration with procurement workflows'
          ],
          cta: 'Use Calculator',
          link: '/dashboard'
        },
        {
          title: 'Vendor Dashboard',
          description: 'Complete vendor portfolio management with risk monitoring and tracking.',
          benefits: [
            'Portfolio risk monitoring',
            'Vendor lifecycle tracking',
            'Automated risk alerts',
            'Executive reporting'
          ],
          cta: 'View Vendors',
          link: '/vendors'
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance',
      description: 'Compliance teams need to ensure vendors meet regulatory requirements and maintain documentation.',
      icon: <Lock size={32} color="var(--vendorsoluce-teal)" />,
      challenges: [
        'Evolving regulatory requirements',
        'Documenting vendor compliance',
        'Managing compliance obligations',
        'Navigating multiple compliance frameworks'
      ],
      solutions: [
        {
          title: 'NIST Assessment',
          description: 'Comprehensive NIST SP 800-161 compliance assessment with automated scoring.',
          benefits: [
            'NIST compliance templates',
            'Automated compliance scoring',
            'Complete documentation',
            'Framework gap analysis'
          ],
          cta: 'Start Assessment',
          link: '/assessments'
        },
        {
          title: 'Compliance Templates',
          description: 'Pre-built templates and matrices for federal and industry compliance.',
          benefits: [
            'Federal compliance guides',
            'Industry-specific templates',
            'Risk assessment matrices',
            'Executive summary templates'
          ],
          cta: 'View Templates',
          link: '/dashboard'
        }
      ]
    },
    {
      id: 'executives',
      title: 'Executives',
      description: 'Executives need clear visibility into vendor risk posture and compliance status.',
      icon: <Users size={32} color="var(--vendorsoluce-blue)" />,
      challenges: [
        'Understanding vendor risk exposure',
        'Justifying security investments',
        'Demonstrating compliance to stakeholders',
        'Balancing risk with business objectives'
      ],
      solutions: [
        {
          title: 'Executive Dashboards',
          description: 'High-level dashboards showing portfolio risk metrics and compliance status.',
          benefits: [
            'Portfolio risk metrics',
            'Compliance status overview',
            'Risk trend analysis',
            'Actionable recommendations'
          ],
          cta: 'View Dashboard',
          link: '/dashboard'
        },
        {
          title: 'Reporting & Analytics',
          description: 'Automated reporting and analytics for stakeholder presentations.',
          benefits: [
            'Automated report generation',
            'Customizable report templates',
            'Risk trend analysis',
            'Executive presentation materials'
          ],
          cta: 'View Reports',
          link: '/reports'
        }
      ]
    }
  ];

  const activeStakeholderData = stakeholders.find(s => s.id === activeStakeholder) || stakeholders[0];

  return (
    <section className="value-prop-section">
      <div className="value-prop-container">
        <div className="value-prop-header">
          <h2 className="value-prop-title">
            Solutions for Every Stakeholder
          </h2>
          <p className="value-prop-description">
            VendorSoluce provides tailored solutions for security teams, procurement, compliance, and executives.
          </p>
        </div>

        {/* Stakeholder Tabs */}
        <div className="stakeholder-tabs">
          {stakeholders.map((stakeholder) => (
            <button
              key={stakeholder.id}
              onClick={() => setActiveStakeholder(stakeholder.id)}
              className={`stakeholder-tab ${activeStakeholder === stakeholder.id ? 'stakeholder-tab-active' : ''}`}
            >
              {stakeholder.icon}
              <span className="stakeholder-tab-text">{stakeholder.title}</span>
            </button>
          ))}
        </div>

        {/* Active Stakeholder Content */}
        <div className="stakeholder-content">
          {/* Challenges */}
          <Card className="stakeholder-challenges-card">
            <CardHeader>
              <h3 className="stakeholder-challenges-title">
                <AlertTriangle size={20} color="#F59E0B" style={{ marginRight: '12px', display: 'inline-block' }} />
                Challenges
              </h3>
            </CardHeader>
            <CardContent>
              <p className="stakeholder-description-text">
                {activeStakeholderData.description}
              </p>
              <ul className="challenges-list">
                {activeStakeholderData.challenges.map((challenge, index) => (
                  <li key={index} className="challenge-item">
                    <div className="challenge-dot"></div>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Solutions */}
          <div className="solutions-container">
            {activeStakeholderData.solutions.map((solution, index) => (
              <Card key={index} variant="assessment" className="solution-card">
                <CardContent className="solution-card-content">
                  <div className="solution-header">
                    <h3 className="solution-title">
                      {solution.title}
                    </h3>
                    <p className="solution-description">
                      {solution.description}
                    </p>
                    <div className="solution-cta-wrapper">
                      <Link to={solution.link}>
                        <Button variant="primary" size="sm">
                          {solution.cta}
                          <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="solution-benefits">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="solution-benefit-item">
                        <CheckCircle size={16} color="var(--vendorsoluce-green)" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;

