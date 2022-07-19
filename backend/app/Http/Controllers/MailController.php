<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Verification;
use Illuminate\Http\Response;

class MailController extends Controller {
  public function verifyEmail(Verification $verification) {
    if (now() > $verification->expires) {
      try {
        $verification->delete();
      } catch (\Exception $exception) {
        return response()->json([
          "message" => $exception->getMessage()
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      return response()->json([
        "message" => "Token expired."
      ], Response::HTTP_OK);
    }

    $verification->expires = null;

    $user = User::findOrFail($verification->user_id);
    $user->email_verified_at = now();

    try {
      $user->update();
      $verification->delete();
    } catch (\Exception $exception) {
      return response()->json([
        "message" => $exception->getMessage()
      ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    return response()->json([
        "message" => "Email verified."
      ], Response::HTTP_OK);
  }

  public function resendEmail(User $user) {
    $user->generateEmailVerificationToken();
    
    return response()->json([
      "message" => "New verification token was successfully resent to your email."
    ],200);
  }
}
