<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ContactFormMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class ContactFormController extends Controller
{
    public function send(ContactFormRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            $recipientEmail = env('CONTACT_FORM_EMAIL', 'business@nucleify.io');

            if (empty($recipientEmail)) {
                throw new \Exception('Contact form email recipient not configured.');
            }

            Mail::to($recipientEmail)->send(new ContactFormMail($data));

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to send message. Please try again later.',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}
