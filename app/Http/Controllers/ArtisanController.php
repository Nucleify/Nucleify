<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ArtisanController extends Controller
{
    public function run(Request $request): JsonResponse
    {
        $command = $request->input('command');

        try {
            $exitCode = Artisan::call($command);
            $output = Artisan::output();

            return response()->json([
                'exit_code' => $exitCode,
                'output' => $output
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
