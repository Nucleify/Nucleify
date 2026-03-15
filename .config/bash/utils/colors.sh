#!/bin/sh

RED='\033[0;31m'
GREEN='\033[38;5;36m'
YELLOW='\033[38;5;226m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log_info()    { printf "${CYAN}ℹ${NC}  %s\n\n" "$1"; }
log_success() { printf "${GREEN}✓${NC}  %s\n\n" "$1"; }
log_warn()    { printf "${YELLOW}⚠${NC}  %s\n\n" "$1"; }
log_error()   { printf "${RED}✗${NC}  %s\n\n" "$1"; }
log_header()  { printf "${BOLD}${BLUE}▶ %s${NC}\n\n" "$1"; }

