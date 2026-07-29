import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
const name = args[0];
const command = args[1];
const commandArgs = args.slice(2);

console.log('');

if (!name || !command) {
  console.error('Usage: node scripts/run-check.mjs <name> <command> [...args]');
  process.exit(2);
}

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

const prefix = `${colors.cyan}${colors.bold}[${name}]${colors.reset}`;
console.log(
  `${prefix} ${colors.dim}running:${colors.reset} ${command} ${commandArgs.join(
    ' ',
  )}`,
);
console.log('');

const child = spawn(command, commandArgs, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('exit', (code, signal) => {
  console.log('');
  if (signal) {
    console.error(
      `${prefix} ${colors.red}${colors.bold}FAILED${colors.reset} (signal: ${signal})`,
    );
    console.log('');
    process.exit(1);
  }

  if (code === 0) {
    console.log(
      `${prefix} ${colors.green}${colors.bold}SUCCESS${colors.reset}`,
    );
    console.log('');
    process.exit(0);
  }

  console.error(
    `${prefix} ${colors.red}${colors.bold}FAILED${colors.reset} (exit code: ${code})`,
  );
  console.log('');
  process.exit(code ?? 1);
});
