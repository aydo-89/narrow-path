import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Input,
  EmailInput,
  PasswordInput,
  CreditCardInput,
  ExpiryInput,
  CVVInput,
  Select,
  Checkbox,
  Button,
  CardType,
  SelectOption
} from './index';

const DemoContainer = styled(motion.div)`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${props => props.theme.colors.glass.background};
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  backdrop-filter: blur(20px);
  box-shadow: ${props => props.theme.shadows.glass};
`;

const Title = styled.h2`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.sizes.xl2};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

// Country options for demo
const countryOptions: SelectOption[] = [
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'ca', label: '🇨🇦 Canada' },
  { value: 'uk', label: '🇬🇧 United Kingdom' },
  { value: 'de', label: '🇩🇪 Germany' },
  { value: 'fr', label: '🇫🇷 France' },
  { value: 'jp', label: '🇯🇵 Japan' },
  { value: 'au', label: '🇦🇺 Australia' },
];

// Plan options for demo
const planOptions: SelectOption[] = [
  { value: 'basic', label: 'Basic Plan - $9.99/month' },
  { value: 'premium', label: 'Premium Plan - $19.99/month' },
  { value: 'pro', label: 'Pro Plan - $39.99/month' },
  { value: 'enterprise', label: 'Enterprise Plan - $99.99/month' },
];

// User icon for demo
const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

interface FormData {
  // Account
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  
  // Plan
  plan: string;
  country: string;
  
  // Payment
  cardNumber: string;
  expiry: string;
  cvv: string;
  
  // Preferences
  newsletter: boolean;
  terms: boolean;
}

export const FormDemo: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    plan: '',
    country: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    newsletter: false,
    terms: false
  });

  const [detectedCardType, setDetectedCardType] = useState<CardType | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSelectChange = (field: keyof FormData) => (value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.checked
    }));
  };

  const handleCardTypeChange = (cardType: CardType | null) => {
    setDetectedCardType(cardType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.plan) newErrors.plan = 'Please select a plan';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiry) newErrors.expiry = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (!formData.terms) newErrors.terms = 'You must accept the terms';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simulate form submission
    alert('Form submitted successfully! (This is just a demo)');
    console.log('Form data:', formData);
    console.log('Detected card type:', detectedCardType);
  };

  return (
    <DemoContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Payment Form Demo</Title>
      
      <form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>Account Information</SectionTitle>
          <FormRow>
            <Input
              label="First Name"
              placeholder="Enter your first name"
              leftIcon={<UserIcon />}
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              error={errors.firstName}
              fullWidth
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              error={errors.lastName}
              fullWidth
            />
          </FormRow>
          
          <FormGroup>
            <EmailInput
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={errors.email}
              fullWidth
              showValidation
            />
            
            <PasswordInput
              label="Password"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={errors.password}
              fullWidth
              showStrengthIndicator
              minLength={8}
              requireSymbols
              requireNumbers
              requireUppercase
            />
          </FormGroup>
        </Section>

        <Section>
          <SectionTitle>Plan Selection</SectionTitle>
          <FormRow>
            <Select
              label="Choose Plan"
              placeholder="Select your plan"
              options={planOptions}
              value={formData.plan}
              onChange={handleSelectChange('plan')}
              error={errors.plan}
              fullWidth
            />
            
            <Select
              label="Country"
              placeholder="Select your country"
              options={countryOptions}
              value={formData.country}
              onChange={handleSelectChange('country')}
              fullWidth
            />
          </FormRow>
        </Section>

        <Section>
          <SectionTitle>Payment Information</SectionTitle>
          <FormGroup>
            <CreditCardInput
              label="Card Number"
              placeholder="Enter your card number"
              value={formData.cardNumber}
              onChange={handleInputChange('cardNumber')}
              onCardTypeChange={handleCardTypeChange}
              error={errors.cardNumber}
              fullWidth
            />
            
            <FormRow>
              <ExpiryInput
                label="Expiry Date"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleInputChange('expiry')}
                error={errors.expiry}
                fullWidth
              />
              
              <CVVInput
                label="Security Code"
                cardType={detectedCardType}
                value={formData.cvv}
                onChange={handleInputChange('cvv')}
                error={errors.cvv}
                fullWidth
              />
            </FormRow>
          </FormGroup>
        </Section>

        <Section>
          <SectionTitle>Preferences</SectionTitle>
          <FormGroup>
            <Checkbox
              label="Subscribe to newsletter for updates and offers"
              checked={formData.newsletter}
              onChange={handleCheckboxChange('newsletter')}
            />
            
            <Checkbox
              label="I agree to the Terms of Service and Privacy Policy"
              checked={formData.terms}
              onChange={handleCheckboxChange('terms')}
              error={errors.terms}
              variant={errors.terms ? 'error' : 'default'}
            />
          </FormGroup>
        </Section>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
        >
          Complete Purchase
        </Button>
      </form>
    </DemoContainer>
  );
};

export default FormDemo; 