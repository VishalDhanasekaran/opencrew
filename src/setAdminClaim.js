// scripts/setAdminClaim.js
// Run this script to set admin claim for specific users

const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

async function setAdminClaim(email) {
  try {
    // Get the user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Set custom claims
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    console.log(`Successfully set admin claim for user: ${email}`);
  } catch (error) {
    console.error('Error setting admin claim:', error);
  }
}

// Example usage:
// Replace with your admin user's email
const adminEmail = 'admin@example.com';
setAdminClaim(adminEmail).then(() => process.exit());