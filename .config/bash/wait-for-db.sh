#!/usr/bin/env bash
set -e

readonly MAX_ATTEMPTS=10
readonly INTERVAL=3
readonly SAIL='./vendor/bin/sail'

for ((i = 1; i <= MAX_ATTEMPTS; i++)); do
	if $SAIL artisan db:show &>/dev/null; then
		exit 0
	fi
	echo "Database not ready, retrying in ${INTERVAL}s... (${i}/${MAX_ATTEMPTS})"
	sleep $INTERVAL
done

echo "Failed to connect to database after ${MAX_ATTEMPTS} attempts."
exit 1
