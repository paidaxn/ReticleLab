#!/bin/bash

# ReticleLab GitHub Upload Script
# GitHub Username: paidaxn

echo "📦 ReticleLab - GitHub Upload Script"
echo "====================================="
echo ""
echo "This script will help you upload ReticleLab to GitHub."
echo ""
echo "First, create a new repository on GitHub:"
echo "👉 https://github.com/new"
echo ""
echo "Repository settings:"
echo "- Name: ReticleLab"
echo "- Description: Professional Valorant crosshair platform"
echo "- Public or Private (your choice)"
echo "- DO NOT initialize with README/gitignore/license"
echo ""
read -p "Press Enter after you've created the repository..."

echo ""
echo "Adding GitHub remote..."
git remote add origin https://github.com/paidaxn/ReticleLab.git

echo "Pushing to GitHub..."
git push -u origin master

echo ""
echo "✅ Upload complete!"
echo ""
echo "Your repository is now available at:"
echo "👉 https://github.com/paidaxn/ReticleLab"
echo ""
echo "Next steps:"
echo "1. Deploy to Vercel: https://vercel.com/new"
echo "2. Import your GitHub repository"
echo "3. Your app will be live in minutes!"