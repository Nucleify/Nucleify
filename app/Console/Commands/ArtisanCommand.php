<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Throwable;

class ArtisanCommand extends Command
{
    protected $signature = 'run:{code}';
    protected $description = 'Execute artisan code';

    public function handle(): void
    {
        $code = $this->argument('code');
        $this->info("Executing code: $code");

        try {
            ob_start();
            eval('return ' . $code . ';');
            $result = ob_get_clean();
            $this->info($result);
        } catch (Throwable $e) {
            ob_end_clean();
            $this->error('Error: ' . $e->getMessage());
        }
    }

}
