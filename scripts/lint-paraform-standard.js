#!/usr/bin/env node

/**
 * Paraform Standard Linter for Lee Monarc
 * 
 * Enforces Kev's locked baseline ("absolutely perfect" per docs/REVIEW.md)
 * Maintains AGENTS.md constraints  
 * Meets Paraform anti-slop standards
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ============================================================================
// RULES
// ============================================================================

const RULES = {
  // Hard blocks - cannot commit
  failures: [
    {
      name: 'Rejected Architectural Homepage',
      description: 'AGENTS.md forbids restoring rejected architectural homepage',
      pattern: /pinned perspective|monogram study/i,
      files: ['src/app'],
      message: 'Detected rejected architectural homepage element'
    }
  ],
  
  // Design violations - block PR
  errors: [
    {
      name: 'Typography Override',
      description: 'Base typography in refresh.css overrides globals.css',
      pattern: /^body\s*{|^h1,?\s*h2\s*{|^h2\s*{|^button\s*{|^html\s*{/m,
      files: ['src/app/refresh.css'],
      message: 'Base typography in refresh.css overrides globals.css - remove these lines'
    }
  ],
  
  // Style issues - warn before PR
  warnings: [
    {
      name: 'Global Scroll Listener',
      description: 'Paraform prefers IntersectionObserver',
      pattern: /window\.addEventListener.*scroll/i,
      files: ['src/app'],
      message: 'Global scroll listener - use IntersectionObserver'
    },
    {
      name: 'Unlabeled Placeholder',
      description: 'Missing assets must use review-placeholder',
      pattern: /CLIENT-TO-SUPPLY|client.*supply/i,
      files: ['src/app'],
      message: 'Placeholder detected - ensure it uses review-placeholder class'
    }
  ],
  
  // Anti-slop standards
  antiSlop: [
    {
      name: 'Excessive Hardcoded Colors',
      description: 'Use design tokens from tokens.css',
      pattern: /#([a-f0-9]{3}){1,2}(?!.*--)/gi,
      files: ['src/app'],
      maxCount: 50,
      message: (count) => `Found ${count} hardcoded colors in src/app - use tokens`
    }
  ]
};

// ============================================================================
// MAIN
// ============================================================================

async function lint() {
  console.log('\n🎯 Paraform Standard Linter for Lee Monarc\n');
  console.log('Enforcing Kev\'s locked baseline + Paraform anti-slop standards\n');
  
  let failures = 0;
  let errors = 0;
  let warningsCount = 0;
  let antiSlop = 0;

  // Collect source files (exclude build dirs)
  const EXCLUDED_DIRS = new Set([
    'node_modules', '.git', '.kilo', '.next', '.hermes', 
    'out', 'dist', '.github', '.vscode', 'scripts'
  ]);
  
  const allFiles = [];
  
  function walkDir(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (EXCLUDED_DIRS.has(entry.name)) continue;
          walkDir(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          if (['.tsx', '.ts', '.js', '.jsx', '.css'].includes(ext)) {
            allFiles.push(fullPath);
          }
        }
      }
    } catch (e) {
      // Skip
    }
  }
  
  walkDir(ROOT);

  // Normalize paths for matching
  function normalize(p) {
    return p.replace(/\\/g, '/').toLowerCase();
  }

  function relative(p) {
    return path.relative(ROOT, p).replace(/\\/g, '/');
  }

  function matchFiles(patterns, targetFiles) {
    const normalizedPatterns = patterns.map(p => normalize(p));
    return targetFiles.filter(f => 
      normalizedPatterns.some(pattern => normalize(f).includes(pattern))
    );
  }

  function checkFiles(ruleType, rules) {
    for (const rule of rules) {
      const targetFiles = rule.files 
        ? matchFiles(rule.files, allFiles)
        : allFiles;
      
      for (const filePath of targetFiles) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const relPath = relative(filePath);
          
          if (rule.pattern) {
            const matches = content.match(rule.pattern) || [];
            
            if (ruleType === 'antiSlop') continue;
            
            if (matches.length > 0) {
              const symbol = ruleType === 'failures' ? '✗' : ruleType === 'errors' ? '✗' : '⚠';
              console.log(`  ${symbol} ${rule.name}: ${rule.message}`);
              console.log(`    File: ${relPath}`);
              if (ruleType === 'failures') failures++;
              else if (ruleType === 'errors') errors++;
              else warningsCount++;
            }
          }
        } catch (e) {
          // Skip
        }
      }
    }
  }

  function checkAntiSlop() {
    for (const rule of RULES.antiSlop) {
      const targetFiles = rule.files ? matchFiles(rule.files, allFiles) : allFiles;
      let totalCount = 0;
      
      for (const filePath of targetFiles) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const matches = content.match(rule.pattern) || [];
          totalCount += matches.length;
        } catch (e) {
          // Skip
        }
      }
      
      if (totalCount > rule.maxCount) {
        console.log(`  🎨 ${rule.name}: ${rule.message(totalCount)}`);
        antiSlop++;
      }
    }
  }

  // Run checks
  console.log('❌ FAILURES (must fix before commit)\n');
  checkFiles('failures', RULES.failures);
  if (failures === 0) console.log('  ✓ No failures detected\n');
  else console.log();

  console.log('❌ ERRORS (must fix before merge)\n');
  checkFiles('errors', RULES.errors);
  if (errors === 0) console.log('  ✓ No errors detected\n');
  else console.log();

  console.log('⚠️  WARNINGS (review before PR)\n');
  checkFiles('warnings', RULES.warnings);
  if (warningsCount === 0) console.log('  ✓ No warnings detected\n');
  else console.log();

  console.log('🎨 ANTI-SLOP (Paraform standards)\n');
  checkAntiSlop();
  if (antiSlop === 0) console.log('  ✓ Paraform anti-slop standards met\n');
  else console.log();

  // Summary
  console.log('='.repeat(60));
  if (failures > 0) {
    console.log('❌ FAILURES DETECTED - Cannot commit');
    process.exit(1);
  } else if (errors > 0) {
    console.log('❌ ERRORS DETECTED - Fix before PR');
    process.exit(1);
  } else if (warningsCount > 0) {
    console.log('⚠️  WARNINGS DETECTED - Review before PR');
    process.exit(0);
  } else if (antiSlop > 0) {
    console.log('🎨 ANTI-SLOP ISSUES - Consider improvements');
    process.exit(0);
  } else {
    console.log('✅ ALL CHECKS PASSED');
    console.log('Kev\'s baseline preserved | Paraform standards met');
    process.exit(0);
  }
}

lint().catch(e => {
  console.error('Linter error:', e);
  process.exit(1);
});
