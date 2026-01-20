#!/usr/bin/env node

/**
 * Local Domain Skill Installer for Claude Code
 * 
 * Installs the local-domain skill to .claude/skills/ in the current project.
 * After installation, Claude Code will automatically configure local domain
 * routing when starting dev servers.
 * 
 * Usage: npx @matmaz99/human-host
 */

const fs = require('fs');
const path = require('path');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  dim: '\x1b[2m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
};

// Get paths
const cwd = process.cwd();
const skillSource = path.join(__dirname, '..', 'skill', 'local-domain');
const skillDest = path.join(cwd, '.claude', 'skills', 'local-domain');

// Copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      // Make scripts executable
      if (entry.name.endsWith('.sh')) {
        fs.chmodSync(destPath, '755');
      }
    }
  }
}

// Main
function main() {
  console.log('');
  console.log(`${colors.blue}═══════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}   🌐 Local Domain Skill for Claude Code${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════${colors.reset}`);
  console.log('');
  
  // Check if skill source exists
  if (!fs.existsSync(skillSource)) {
    log.error('Skill source not found. Please reinstall the package.');
    process.exit(1);
  }
  
  // Check if already installed
  if (fs.existsSync(skillDest)) {
    log.warn('Skill already installed. Updating...');
    fs.rmSync(skillDest, { recursive: true });
  }
  
  // Create .claude/skills directory
  log.info('Creating .claude/skills directory...');
  fs.mkdirSync(path.join(cwd, '.claude', 'skills'), { recursive: true });
  
  // Copy skill files
  log.info('Installing local-domain skill...');
  copyDir(skillSource, skillDest);
  
  // Add .claude to .gitignore if not present
  const gitignorePath = path.join(cwd, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const gitignore = fs.readFileSync(gitignorePath, 'utf8');
    if (!gitignore.includes('.claude/')) {
      fs.appendFileSync(gitignorePath, '\n# Claude Code\n.claude/\n');
      log.success('Added .claude/ to .gitignore');
    }
  }
  
  log.success('Skill installed successfully!');
  
  console.log('');
  console.log(`${colors.green}═══════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.green}   ✓ Installation Complete!${colors.reset}`);
  console.log(`${colors.green}═══════════════════════════════════════════════════${colors.reset}`);
  console.log('');
  console.log(`   ${colors.dim}Skill installed to:${colors.reset}`);
  console.log(`   ${colors.blue}.claude/skills/local-domain/${colors.reset}`);
  console.log('');
  console.log(`   ${colors.dim}What happens now:${colors.reset}`);
  console.log(`   When you ask Claude Code to start a dev server,`);
  console.log(`   it will automatically configure:`);
  console.log(`   ${colors.green}http://projectname.localhost${colors.reset}`);
  console.log('');
  console.log(`   ${colors.dim}One-time setup (if not done already):${colors.reset}`);
  console.log(`   ${colors.yellow}npm install -g hotel && hotel start${colors.reset}`);
  console.log('');
}

main();
