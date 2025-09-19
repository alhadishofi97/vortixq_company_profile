#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up SMTP Configuration for Vortiqx Contact Form\n');

// SMTP Configuration templates
const smtpConfigs = {
  larksuite: {
    name: 'LarkSuite SMTP',
    config: `# LarkSuite SMTP Configuration
SMTP_HOST=smtp.larksuite.com
SMTP_PORT=465
SMTP_USER=your_larksuite_email@larksuite.com
SMTP_PASS=2ld1pkSCpIWAVwj5
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com

# Alternative port (STARTTLS)
# SMTP_PORT=587`
  },
  gmail: {
    name: 'Gmail SMTP',
    config: `# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com

# Note: Use App Password, not regular password
# Generate App Password: https://myaccount.google.com/apppasswords`
  },
  outlook: {
    name: 'Outlook/Hotmail SMTP',
    config: `# Outlook/Hotmail SMTP Configuration
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com`
  }
};

// Get provider from command line argument
const provider = process.argv[2] || 'larksuite';

if (!smtpConfigs[provider]) {
  console.log('❌ Invalid provider. Available options:');
  Object.keys(smtpConfigs).forEach(key => {
    console.log(`   - ${key}: ${smtpConfigs[key].name}`);
  });
  process.exit(1);
}

const envPath = path.join(__dirname, '.env.local');
const config = smtpConfigs[provider];

console.log(`📧 Setting up ${config.name}...`);

// Check if .env.local already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists. Creating backup...');
  const backupPath = path.join(__dirname, `.env.local.backup.${Date.now()}`);
  fs.copyFileSync(envPath, backupPath);
  console.log(`✅ Backup created: ${backupPath}`);
}

// Write new configuration
try {
  fs.writeFileSync(envPath, config.config);
  console.log('✅ .env.local created successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Update SMTP_USER with your actual email');
  console.log('2. Update SMTP_PASS with your actual password');
  console.log('3. Restart development server: npm run dev');
  console.log('4. Test contact form');
  
  if (provider === 'gmail') {
    console.log('\n🔐 Gmail Setup:');
    console.log('- Enable 2-Factor Authentication');
    console.log('- Generate App Password: https://myaccount.google.com/apppasswords');
    console.log('- Use App Password as SMTP_PASS');
  }
  
  if (provider === 'larksuite') {
    console.log('\n📊 LarkSuite Limits:');
    console.log('- Daily limit: 450 emails');
    console.log('- Rate limit: 200 emails per 100 seconds');
  }
  
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
  process.exit(1);
}

console.log('\n🎉 SMTP configuration setup complete!');
