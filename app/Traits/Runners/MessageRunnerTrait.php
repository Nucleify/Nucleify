<?php

namespace App\Traits\Runners;

use Illuminate\Console\Command;

trait MessageRunnerTrait
{
    /**
     * Show a message in the console
     */
    public function showMessage(string $message, Command $command, bool $break = true, bool $divider = true, string $dividerChar = '~'): void
    {
        $dividerLine = str_repeat($dividerChar, strlen($message));

        if ($divider) {
            $command->warn($dividerLine);
        }
        $command->info($message);
        if ($divider) {
            $command->warn($dividerLine);
        }
        if ($break) {
            $command->info('');
        }
    }
}
